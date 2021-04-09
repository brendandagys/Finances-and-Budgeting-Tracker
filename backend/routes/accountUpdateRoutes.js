import express from 'express'
const router = express.Router()

import {
  getAccountUpdates,
  createAccountUpdate,
  updateAccountUpdate,
  deleteAccountUpdate,
} from '../controllers/accountUpdateController.js'
import { protect } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, getAccountUpdates)
  .post(protect, createAccountUpdate)

router
  .route('/:id')
  .patch(protect, updateAccountUpdate)
  .delete(protect, deleteAccountUpdate)

export default router
