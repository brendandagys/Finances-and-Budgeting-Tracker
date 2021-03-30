import mongoose from 'mongoose'

const purchaseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        timestamp: { type: Date, required: true },
        item: { type: String, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Purchase Category' },
        amount: { type: Number, required: true },
        description: { type: String, required: true }
    }
)

const Purchase = mongoose.model('Purchase', purchaseSchema)

export default Purchase