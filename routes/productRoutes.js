const express = require("express")
const jwt = require("jsonwebtoken")
const {ProductModel} = require("../models/productModel")
const {auth} = require("../middleware/authMiddleware")

const productRouter = express.Router()


// Restricted routes
productRouter.post("/products", auth, async (req,res)=>{
    try {
        const product = new ProductModel(req.body);
        await product.save()
        res.status(201).send({"msg" : "A new Product has been added"})
    } catch (err) {
        res.status(400).send({"msg":err});
    }
})

productRouter.get("/products", auth,async (req,res)=>{
    try {
        const products = await ProductModel.find();
        res.status(200).send(products)
    } catch (err) {
        res.status(400).send({"msg":err});
    }
})

productRouter.get("/products/:id", auth, async (req,res)=>{
    const {id} = req.params
    try {
        const product = await ProductModel.findOne({_id:id});
        if (!product) {
            // Product not found
            return res.status(404).send({ msg: "Product not found" });
        }
        res.status(200).send(product)
    } catch (err) {
        console.error(err);
        res.status(400).send({"msg":err});
    }
})

productRouter.patch("/products/:id", auth, async (req,res)=>{
    const {id} = req.params
    try {
        await ProductModel.findByIdAndUpdate({_id:id},req.body);
        res.status(204).send({"msg":`Product with ID ${id} has benn updated`})
    } catch (err) {
        res.status(400).send({"msg":err});
    }
})

productRouter.delete("/products/:id", auth, async (req,res)=>{
    const {id} = req.params
    try {
        await ProductModel.findByIdAndDelete({_id:id});
        res.status(202).send({"msg":`Product with ID ${id} has benn deleted`})
    } catch (err) {
        res.status(400).send({"msg":err});
    }
})

module.exports = {
    productRouter
}