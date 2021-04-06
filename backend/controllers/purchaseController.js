import asyncHandler from 'express-async-handler'

import mongoose from 'mongoose'
const Purchase = mongoose.model('Purchase')
const PurchaseCategory = mongoose.model('Purchase Category')
const Account = mongoose.model('Account')

// @desc    Fetch all purchases
// @route   GET /api/purchases
// @access  Private
const getPurchases = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({ user: req.user.id })
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
  } = req.body

  const { name: category } = await PurchaseCategory.findById(category_id)

  if (account_id) {
    const { name: account } = await Account.findById(account_id)

    var purchase = new Purchase({
      user: req.user._id,
      timestamp: Date.parse(`${date}T${time}`),
      category_id,
      category,
      item: item.trim(),
      amount,
      description: description.trim(),
      account_id,
      account,
    })
  } else {
    var purchase = new Purchase({
      user: req.user._id,
      timestamp: Date.parse(`${date}T${time}`),
      category_id,
      category,
      item: item.trim(),
      amount,
      description: description.trim(),
    })
  }

  const createdPurchase = await purchase.save()
  res.status(201).json(createdPurchase)
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

export { getPurchases, getPurchaseById, createPurchase, deletePurchase }
