import mongoose from 'mongoose'

const accountUpdateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userName: { type: String, required: true },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  },
  account: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
})

const AccountUpdate = mongoose.model('Account Update', accountUpdateSchema)

export default AccountUpdate
