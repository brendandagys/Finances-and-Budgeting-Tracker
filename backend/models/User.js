import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
})

mongoose.model('User', userSchema)
