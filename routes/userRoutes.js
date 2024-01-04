const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/userModel")

const userRouter = express.Router()


userRouter.post("/register", async (req,res)=>{
    const {name,avatar,email,password,created_at,updated_at} = req.body;
    try {
        const userExist = await UserModel.findOne({email});
        if(userExist){
            return res.status(201).send({"msg" : "Please Login, user already exist"})
        } else {
            bcrypt.hash(password,5, async (err,hash) => {
                if(err){
                    return res.status(201).send({"msg":"Something went wrong while hashing password"})
                }
                else{
                    const newUser = new UserModel({name,avatar,email,password:hash,created_at,updated_at})
                    await newUser.save();
                    return res.status(201).send( {"msg" : "A new user has been registered"} );
                }
            })
        }
    } catch (err) {
        return res.status(400).send({ "msg": "Something went wront in the register catch" });
    }
})

userRouter.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if (!user) {
            return res.status(201).send({ "msg": "Please register First." });
        } else {
            bcrypt.compare(password, user.password, (err,result) => {
                if(result){
                    const token = jwt.sign({course:"nem111"},"masai")
                    return res.status(201).send({ "msg": "Login Successfull.", "token":token });
                } else {
                    return res.status(201).send({ "msg": "Wrong Crediantials." });
                }
            })
        } 
    } catch (err) {
        return res.status(201).send({ "msg": "something err while Login." });
    }
})

module.exports = {
    userRouter
}