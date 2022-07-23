const express = require("express")
const app = express()

const mongoose = require("mongoose")
require("dotenv").config();

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGOURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.use(express.json());

// app.use("/",require("./Routes/userRouter"))
app.use('/', require('./Routes/userRouter'))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});