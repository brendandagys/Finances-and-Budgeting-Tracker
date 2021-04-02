import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
const Purchase = mongoose.model('Purchase')

// @desc    Fetch all purchases
// @route   GET /api/purchases
// @access  Public
const getPurchases = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({})
  res.json(purchases)
})

// @desc    Fetch single purchase
// @route   GET /api/purchase/:id
// @access  Public
const getPurchaseById = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id)

  if (purchase) {
    res.json(purchase)
  } else {
    res.status(404)
    throw new Error('Purchase does not exist')
  }
})

export { getPurchases, getPurchaseById }
