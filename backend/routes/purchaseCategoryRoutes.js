import express from 'express'
const router = express.Router()

import {
  getPurchaseCategories,
  createPurchaseCategory,
  deletePurchaseCategory,
} from '../controllers/purchaseCategoryController.js'
import { protect } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, getPurchaseCategories)
  .post(protect, createPurchaseCategory)

router.delete('/:id', protect, deletePurchaseCategory)

export default router
