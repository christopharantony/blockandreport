const express = require("express")
const app = express()

const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.use(express.json());

// app.use("/",require("./Routes/userRouter"))
app.use('/', require('./Routes/userRouter'))

app.listen(7000, () => {
    console.log("http://localhost:7000")
});