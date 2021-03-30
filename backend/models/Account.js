import mongoose from 'mongoose'

const accountSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: { type: String, required: true },
        active: { type: Boolean, required: true, default: true}
    }
)

const Account = mongoose.model('Account', accountSchema)

export default Account