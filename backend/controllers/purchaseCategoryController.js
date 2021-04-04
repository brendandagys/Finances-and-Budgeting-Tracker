import asyncHandler from 'express-async-handler'

import mongoose from 'mongoose'
const PurchaseCategory = mongoose.model('Purchase Category')

// @desc    Fetch all purchase categories
// @route   GET /api/purchase-categories
// @access  Private
const getPurchaseCategories = asyncHandler(async (req, res) => {
  const purchaseCategories = await PurchaseCategory.find({ user: req.user.id })
  res.json(
    purchaseCategories.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    )
  )
})

// @desc    Create a purchase category
// @route   POST /api/purchase-categories
// @access  Private
const createPurchaseCategory = asyncHandler(async (req, res) => {
  const { name, active } = req.body

  const purchaseCategoryExists = await PurchaseCategory.findOne({
    user: req.user.id,
    name,
  })

  if (purchaseCategoryExists) {
    res.status(400)
    throw new Error('Purchase Category already exists')
  }

  const purchaseCategory = new PurchaseCategory({
    user: req.user._id,
    name,
    active,
  })

  const createdPurchaseCategory = await purchaseCategory.save()
  res.status(201).json(createdPurchaseCategory)
})

// @desc    Delete a purchase category
// @route   DELETE /api/purchase_categories/:id
// @access  Private
const deletePurchaseCategory = asyncHandler(async (req, res) => {
  const purchaseCategory = await PurchaseCategory.findById(req.params.id)

  if (purchaseCategory) {
    await purchaseCategory.remove()
    res.json({ message: 'Purchase Category removed' })
  } else {
    res.status(400)
    throw new Error('Purchase Category does not exist')
  }
})

export { getPurchaseCategories, createPurchaseCategory, deletePurchaseCategory }
