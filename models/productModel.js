const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: { type: String, required: true, maxLength: 50 },
    picture: { type: String },
    description: { type: String },
    gender: { type: String, enum: ['male', 'female'], required: true },
    category: { type: String, enum: ['makeup', 'skincare', 'haircare'], required: true },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
},{
    versionKey: false
})

const ProductModel = mongoose.model("product",productSchema)

module.exports={
    ProductModel
}