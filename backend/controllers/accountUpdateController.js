import asyncHandler from 'express-async-handler'

import mongoose from 'mongoose'
const AccountUpdate = mongoose.model('Account Update')
const Account = mongoose.model('Account')

function convertDateStringToUTCString(dateString, millisecondsForward) {
  let date = new Date(dateString)
  let unixTimestamp = date.setTime(date.getTime() + millisecondsForward)
  return new Date(unixTimestamp).toISOString()
}

// @desc    Fetch all account updates
// @route   GET /api/account-updates
// @access  Private
export const getAccountUpdates = asyncHandler(async (req, res) => {
  const startDate = convertDateStringToUTCString(
    req.params.date,
    4 * 60 * 60 * 1000
  )
  const endDate = convertDateStringToUTCString(
    req.params.date,
    28 * 60 * 60 * 1000
  )

  var accounts = await Account.find({ user: req.user.id }) // Array of objects

  accounts = accounts.map(({ id, name, credit }) => ({ id, name, credit })) // Get just the id and name

  const accountUpdates = await Promise.all(
    accounts.map(async (account) => {
      let accountUpdate = await AccountUpdate.findOne(
        {
          account_id: account.id,
          timestamp: { $gte: startDate, $lt: endDate },
        },
        { value: 1 }
      )

      return { ...account, value: accountUpdate && accountUpdate.value }
    })
  )

  res.status(200).json(accountUpdates)
})

// @desc    Create or update an Account Update
// @route   POST /api/account-updates
// @access  Private
export const createAccountUpdate = asyncHandler(async (req, res) => {
  const { date, account_id, name, value } = req.body

  const startDate = convertDateStringToUTCString(date, 4 * 60 * 60 * 1000)
  const endDate = convertDateStringToUTCString(date, 28 * 60 * 60 * 1000)

  // console.log(req.body)
  const lastUpdateToday = await AccountUpdate.findOne({
    account_id,
    timestamp: { $gte: startDate, $lt: endDate },
  })

  if (lastUpdateToday) {
    lastUpdateToday.value = value
    lastUpdateToday.timestamp = Date.now()

    await lastUpdateToday.save()
    res.status(201).json(lastUpdateToday)
  } else {
    const firstUpdateToday = new AccountUpdate({
      user: req.user._id,
      userName: req.user.name,
      account_id,
      account: name,
      value,
    })

    await firstUpdateToday.save()
    res.status(201).json(firstUpdateToday)
  }
})
