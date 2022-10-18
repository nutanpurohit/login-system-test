require('dotenv').config()

const userRouter = require('./src/routers/userRouter')
const PORT = process.env.PORT || 3200

const app = require('./src/app')

app.get('/', (req, res) => {
    res.send('test task is running')
})

app.listen(PORT, () => {
    console.log('Server is up on the port ' + PORT)
})

app.use(userRouter)
