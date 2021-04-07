import mongoose from 'mongoose'

const purchaseCategorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userName: { type: String, required: true },
  name: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
})

const PurchaseCategory = mongoose.model(
  'Purchase Category',
  purchaseCategorySchema
)

export default PurchaseCategory
