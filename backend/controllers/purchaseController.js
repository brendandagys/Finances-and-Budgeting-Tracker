import asyncHandler from 'express-async-handler'

import mongoose from 'mongoose'
const Purchase = mongoose.model('Purchase')

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
  const { date, time, item, category, amount, description } = req.body

  const purchase = new Purchase({
    user: req.user._id,
    timestamp: Date.parse(`${date}T${time}`),
    item,
    category,
    amount,
    description,
  })

  const createdPurchase = await purchase.save()
  res.status(201).json(createdPurchase)
})

export { getPurchases, getPurchaseById, createPurchase }
