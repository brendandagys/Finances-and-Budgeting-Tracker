import asyncHandler from 'express-async-handler'

import mongoose from 'mongoose'
const AccountUpdate = mongoose.model('Account Update')
const Account = mongoose.model('Account')

// @desc    Fetch all account update
// @route   GET /api/account-updates
// @access  Private
export const getAccountUpdates = asyncHandler(async (req, res) => {
  const accounts = await Account.find({ user: req.user.id })
  const account_names = accounts.map(({ id }) => id)

  // for (i=0; i < accounts.length; i++) {
  //   account
  // }

  // const accountUpdates = await AccountUpdate.find({ user: req.user.id })
  res.json(
    account_names //.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
  )
})

export const createAccountUpdate = asyncHandler(async (req, res) => {})
export const updateAccountUpdate = asyncHandler(async (req, res) => {})
export const deleteAccountUpdate = asyncHandler(async (req, res) => {})
