import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import mongoose from 'mongoose'

const Purchase = mongoose.model('Purchase')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const purchases = await Purchase.find({})
    res.json(purchases)
  })
)

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id)

    if (purchase) {
      res.json(purchase)
    } else {
      res.status(404)
      throw new Error('Purchase does not exist')
    }
  })
)

export default router
