import asyncHandler from 'express-async-handler'

import mongoose from 'mongoose'
const Purchase = mongoose.model('Purchase')
const PurchaseCategory = mongoose.model('Purchase Category')
const Account = mongoose.model('Account')
const AccountUpdate = mongoose.model('Account Update')

// @desc    Fetch all purchases
// @route   GET /api/purchases
// @access  Private
const getPurchases = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({ user: req.user.id }).sort({
    timestamp: -1,
  })
  res.json(purchases)
})

// @desc    Fetch single purchase
// @route   GET /api/purchase/:id
// @access  Private
const getPurchaseById = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id)

  if (purchase) {
    res.json(purchase)
  } else {
    res.status(404)
    throw new Error('Purchase does not exist')
  }
})

// @desc    Create a purchase
// @route   POST /api/purchases
// @access  Private
const createPurchase = asyncHandler(async (req, res) => {
  const {
    date,
    time,
    item,
    category: category_id,
    amount,
    description,
    account: account_id,
    receiptUrl, // undefined if not provided
  } = req.body

  const { name: category } = await PurchaseCategory.findById(category_id)

  if (account_id) {
    var { name: account, credit } = await Account.findById(account_id)

    // Save writing duplicate code below
    const fixedPurchaseAmount = credit ? amount * -1 : amount

    const lastAccountUpdate = await AccountUpdate.findOne({
      account_id,
    }).sort({ timestamp: -1 })

    if (
      lastAccountUpdate &&
      lastAccountUpdate.timestamp.toISOString().slice(0, 10) === date
    ) {
      lastAccountUpdate.value = (
        lastAccountUpdate.value - fixedPurchaseAmount
      ).toFixed(2)
      await lastAccountUpdate.save()
    } else {
      var createdAccountUpdate = new AccountUpdate({
        user: req.user._id,
        userName: req.user.name,
        account_id,
        account: account,
        value: lastAccountUpdate
          ? (lastAccountUpdate.value - fixedPurchaseAmount).toFixed(2)
          : (0 - fixedPurchaseAmount).toFixed(2),
        timestamp: date,
      })
      await createdAccountUpdate.save()
    }
  } else {
    var account = undefined
  }

  const hoursToAdd = process.env.NODE_ENV === 'production' ? 4 : 0

  const purchase = new Purchase({
    user: req.user._id,
    userName: req.user.name,
    timestamp: Date.parse(`${date}T${time}`) + hoursToAdd * 60 * 60 * 1000,
    category_id,
    category,
    item: item.trim(),
    amount,
    description: description.trim() === '' ? undefined : description.trim(),
    account_id: account_id === '' ? undefined : account_id,
    account,
    receiptUrl,
  })

  const createdPurchase = await purchase.save()
  res.status(201).json(createdPurchase)
})

// @desc    Update a purchase
// @route   PATCH /api/purchases
// @access  Private
const updatePurchase = asyncHandler(async (req, res) => {
  const {
    date,
    time,
    item,
    category: category_id,
    amount,
    description,
    account: account_id,
  } = req.body

  const purchase = await Purchase.findById(req.params.id)

  const hoursToAdd = process.env.NODE_ENV === 'production' ? 4 : 0

  if (purchase) {
    const { name: category } = await PurchaseCategory.findById(category_id)

    purchase.timestamp =
      Date.parse(`${date}T${time}`) + hoursToAdd * 60 * 60 * 1000
    purchase.category_id = category_id
    purchase.category = category
    purchase.item = item.trim()
    purchase.amount = amount
    purchase.description =
      description.trim() === '' ? undefined : description.trim()
    purchase.account_id = account_id === '' ? undefined : account_id

    if (account_id) {
      var { name: account } = await Account.findById(account_id)
    } else {
      var account = undefined
    }

    purchase.account = account

    const updatedPurchase = await purchase.save()
    res.json(updatedPurchase)
  } else {
    res.status(404)
    throw new Error('Purchase not found')
  }
})

// @desc    Delete a purchase
// @route   DELETE /api/purchases/:id
// @access  Private
const deletePurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id)

  if (purchase) {
    await purchase.remove()
    res.json({ id: req.params.id })
  } else {
    res.status(404)
    throw new Error('Purchase not found')
  }
})

export {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase,
}
