import asyncHandler from 'express-async-handler'

import mongoose from 'mongoose'
const Mood = mongoose.model('Mood')

// @desc    Fetch all moods
// @route   GET /api/moods
// @access  Private
export const getMoods = asyncHandler(async (req, res) => {
  var moods = await Mood.find(
    { user: req.user.id },
    { timestamp: 1, value: 1 }
  ).sort({ timestamp: 1 }) // Array of objects

  res.status(200).json(moods)
})

// @desc    Create or update a mood
// @route   POST /api/moods
// @access  Private
export const createMood = asyncHandler(async (req, res) => {
  const { date, value } = req.body

  const lastUpdateToday = await Mood.findOne({
    user: req.user._id,
    timestamp: date,
  })

  if (lastUpdateToday) {
    lastUpdateToday.value = value

    await lastUpdateToday.save()
    res.status(201).json(lastUpdateToday)
  } else {
    const firstUpdateToday = new Mood({
      user: req.user._id,
      userName: req.user.name,
      value,
      timestamp: date,
    })

    await firstUpdateToday.save()
    res.status(201).json(firstUpdateToday)
  }
})
