import express from 'express'
const router = express.Router()
import {
  getPurchases,
  getPurchaseById,
} from '../controllers/purchaseController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getPurchases)
router.route('/:id').get(protect, getPurchaseById)

export default router
