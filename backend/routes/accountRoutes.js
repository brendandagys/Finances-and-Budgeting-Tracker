import express from 'express'
const router = express.Router()

import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../controllers/accountController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAccounts).post(protect, createAccount)

router
  .route('/:id')
  .get(protect, getAccountById)
  .patch(protect, updateAccount)
  .delete(protect, deleteAccount)

export default router
