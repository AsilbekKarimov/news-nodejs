const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./database/config');
const postRoutes = require('./routes/posts')

dotenv.config();
connectDB();
const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use('/posts', postRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))