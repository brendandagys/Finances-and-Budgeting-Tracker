import express from 'express'
const router = express.Router()
import {
  getPurchases,
  getPurchaseById,
  createPurchase,
  deletePurchase,
} from '../controllers/purchaseController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getPurchases).post(protect, createPurchase)
router
  .route('/:id')
  .get(protect, getPurchaseById)
  .delete(protect, deletePurchase)

export default router
