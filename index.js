const express = require("express")
const { connection } = require("./db")
const cors = require("cors")
const { userRouter } = require("./routes/userRoutes")
const { productRouter } = require("./routes/productRoutes")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/", userRouter)
app.use("/", productRouter)

app.listen(8080, async()=>{
    try {
        await connection
        console.log("server is runnig at port 8080 and mongo is connected")
    } catch (err) {
        console.log(err)
    }
})