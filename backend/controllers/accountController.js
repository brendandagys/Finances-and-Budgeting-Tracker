import asyncHandler from 'express-async-handler'

import mongoose from 'mongoose'
const Account = mongoose.model('Account')

// @desc    Fetch all accounts
// @route   GET /api/accounts
// @access  Private
const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({ user: req.user.id })
  res.json(
    accounts.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
  )
})

// @desc    Create an account
// @route   POST /api/accounts
// @access  Private
const createAccount = asyncHandler(async (req, res) => {
  const { name, credit, allowPurchases } = req.body

  const accountExists = await Account.findOne({
    user: req.user.id,
    name,
  })

  if (accountExists) {
    res.status(400)
    throw new Error('Account already exists')
  }

  const account = new Account({
    user: req.user._id,
    name,
    credit,
    allowPurchases,
  })

  const createdAccount = await account.save()
  res.status(201).json(account)
})

// @desc    Delete an account
// @route   DELETE /api/accounts/:id
// @access  Private
const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id)

  if (account) {
    await account.remove()
    res.json({ message: 'Account removed' })
  } else {
    res.status(400)
    throw new Error('Account does not exist')
  }
})

export { getAccounts, createAccount, deleteAccount }