import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    deleted_at: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
}

);

const productModel = mongoose.model('products', productSchema);

export default productModel;