import asyncHandler from 'express-async-handler'
import moment from 'moment'
import { exchangeRates } from 'exchange-rates-api'

const USD_TO_CAD = await exchangeRates()
  .latest()
  .base('USD')
  .symbols('CAD')
  .fetch()
const EUR_TO_CAD = await exchangeRates()
  .latest()
  .base('EUR')
  .symbols('CAD')
  .fetch()

import mongoose from 'mongoose'
const AccountUpdate = mongoose.model('Account Update')
const Account = mongoose.model('Account')

// function convertDateStringToUTCString(dateString, millisecondsForward = 0) {
//   let date = new Date(dateString)
//   let unixTimestamp = date.setTime(date.getTime() + millisecondsForward)
//   return new Date(unixTimestamp).toISOString()
// }

// @desc    Fetch all account updates
// @route   GET /api/account-updates/:date
// @access  Private
export const getAccountUpdates = asyncHandler(async (req, res) => {
  var accounts = await Account.find({ user: req.user.id }) // Array of objects

  accounts = accounts.map(({ id, credit, name, currency }) => ({
    id,
    credit,
    name,
    currency,
  })) // Get just the id and name

  const accountUpdates = await Promise.all(
    accounts.map(async (account) => {
      let accountUpdate = await AccountUpdate.findOne(
        {
          account_id: account.id,
          timestamp: { $lte: req.params.date },
        },
        { value: 1 },
        { sort: { timestamp: -1 } }
      )

      return { ...account, value: accountUpdate && accountUpdate.value }
    })
  )

  res.status(200).json(accountUpdates)
})

// @desc    Fetch all account updates
// @route   GET /api/account-updates
// @access  Private
export const getAllAccountUpdates = asyncHandler(async (req, res) => {
  var accounts = await Account.find({ user: req.user.id }) // Array of objects

  accounts = accounts.map(({ id, credit, currency }) => ({
    id,
    credit,
    currency,
  })) // Get just the id, credit, and currency

  const allAccountUpdates = await AccountUpdate.find({
    user: req.user.id,
  }).sort({
    timestamp: 1,
  })

  if (allAccountUpdates.length === 0) {
    res.json()
    return
  }

  var startDate = allAccountUpdates[0].timestamp.toISOString().slice(0, 10)
  const endDate = allAccountUpdates
    .slice(-1)[0]
    .timestamp.toISOString()
    .slice(0, 10)

  var chartData = []

  while (startDate <= endDate) {
    var dateArray = []

    accounts.forEach(({ id, credit, currency }) => {
      var lastAccountValues = allAccountUpdates
        .filter((accountUpdate) => {
          return (
            accountUpdate.timestamp.toISOString().slice(0, 10) <= startDate &&
            accountUpdate.account_id.toString() === id
          )
        })
        .sort((a, b) =>
          a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
        )

      if (lastAccountValues.length > 0) {
        let conversionFactor =
          currency === 'USD' ? USD_TO_CAD : currency === 'EUR' ? EUR_TO_CAD : 1

        dateArray = [
          ...dateArray,
          credit
            ? -1 * lastAccountValues[0].value * conversionFactor
            : lastAccountValues[0].value * conversionFactor,
        ]
      }
    })

    let amount = dateArray.reduce((a, b) => a + b, 0)

    chartData = [
      ...chartData,
      { date: startDate, Amount: parseFloat(amount.toFixed(2)) },
    ]

    startDate = moment(startDate).add(1, 'day').format('YYYY-MM-DD')
  }

  res.json(chartData)
})

// @desc    Create or update an Account Update
// @route   POST /api/account-updates
// @access  Private
export const createAccountUpdate = asyncHandler(async (req, res) => {
  const { date, account_id, name, value } = req.body

  // console.log(req.body)
  const lastUpdateToday = await AccountUpdate.findOne({
    account_id,
    timestamp: date,
  })

  if (lastUpdateToday) {
    lastUpdateToday.value = value

    await lastUpdateToday.save()
    res.status(201).json(lastUpdateToday)
  } else {
    const firstUpdateToday = new AccountUpdate({
      user: req.user._id,
      userName: req.user.name,
      account_id,
      account: name,
      value,
      timestamp: date,
    })

    await firstUpdateToday.save()
    res.status(201).json(firstUpdateToday)
  }
})
