import mongoose from 'mongoose'

const accountUpdateSchema = mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Account',
        },
        amount: { type: Number, required: true },
        timestamp: { type: Date, required: true, default: Date.now}
    }
)

const AccountUpdate = mongoose.model('Account Update', accountUpdateSchema)

export default AccountUpdate