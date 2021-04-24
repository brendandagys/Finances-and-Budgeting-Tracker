import express from 'express'
const router = express.Router()

import {
  getAccountUpdates,
  getAllAccountUpdates,
  createAccountUpdate,
} from '../controllers/accountUpdateController.js'
import { protect } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, getAllAccountUpdates)
  .post(protect, createAccountUpdate)

router.route('/:date').get(protect, getAccountUpdates)

export default router
