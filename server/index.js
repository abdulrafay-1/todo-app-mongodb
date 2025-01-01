import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./src/db/index.js"
import todoRoutes from "./src/routes/todo.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

const config = dotenv.config();

app.use("/api/v1", todoRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️  Server is running at port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err)
    })