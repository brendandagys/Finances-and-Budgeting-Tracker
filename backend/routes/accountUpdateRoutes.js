import express from 'express'
const router = express.Router()

import {
  getAccountUpdates,
  createAccountUpdate,
} from '../controllers/accountUpdateController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/:date').get(protect, getAccountUpdates)

router.post('/', protect, createAccountUpdate)

export default router
