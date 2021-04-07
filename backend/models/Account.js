import mongoose from 'mongoose'

const accountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userName: { type: String, required: true },
  name: { type: String, required: true },
  credit: { type: Boolean, required: true, default: false },
  allowPurchases: { type: Boolean, required: true, default: true },
})

const Account = mongoose.model('Account', accountSchema)

export default Account
