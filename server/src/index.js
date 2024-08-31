const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./database/config');
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users');
const BotService = require('./bot');

dotenv.config();
connectDB();
const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use('/posts', postRoutes)
app.use('/user', userRoutes )
BotService()
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))