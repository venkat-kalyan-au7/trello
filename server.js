import app from "./app"
import mongoose from "mongoose"

import keys from "./config/keys"

const PORT =process.env.PORT||5000

mongoose.connect(keys.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(()=> console.log('MongoDB Connected Successfully...'))
    .catch(err => console.log(err))


app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})