import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address_line: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ''
    },
    pincode: {
        type: String,
    },
    country: {
        type: String
    },
    mobile: {
        type: Number,
        default: null
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const AddressModel = mongoose.model('address', addressSchema);

export default AddressModel;