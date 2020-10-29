import express from "express"
import morgan from "morgan"
import path from "path"


import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import statusRoutes from "./routes/statusRoutes"
import boardRoutes from "./routes/boardRoutes"
import cardRoutes from "./routes/cardRoutes"
import ProfileRoutes from "./routes/profileRoutes"



const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', statusRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/cards', cardRoutes);
app.use("/api/profile",ProfileRoutes );



if(process.env.NODE_ENV == "production"){
  app.use(express.static('client/build'))
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", 'index.html'))
  })
}

module.exports=app