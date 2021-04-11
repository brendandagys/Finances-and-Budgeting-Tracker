import mongoose from 'mongoose'

const moodSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userName: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, required: true },
})

const Mood = mongoose.model('Mood', moodSchema)

export default Mood
