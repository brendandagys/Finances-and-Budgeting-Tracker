import express from 'express'
const router = express.Router()

import {
  getAccounts,
  createAccount,
  deleteAccount,
} from '../controllers/accountController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAccounts).post(protect, createAccount)

router.delete('/:id', protect, deleteAccount)

export default router
