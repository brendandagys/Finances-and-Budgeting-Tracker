import express from 'express'
const router = express.Router()

import { getMoods, createMood } from '../controllers/moodController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/:date').get(protect, getMoods)

router.post('/', protect, createMood)

export default router
