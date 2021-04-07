import mongoose from 'mongoose'

const purchaseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userName: { type: String, required: true },
  timestamp: { type: Date, required: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Purchase Category',
  },
  category: { type: String, required: true },
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  account: String,
})

const Purchase = mongoose.model('Purchase', purchaseSchema)

export default Purchase
