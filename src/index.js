import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import morgan from 'morgan'
import routers from './routers/index.js'

const app = express()
const port = 3001

app.set('trust proxy', true)
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieSession({
    // maxAge: 3 * 24 * 60 * 60 * 1000,
    // keys: [process.env.COOKIE_KEY || 'test'],
    signed: false,
    secure: false,
    httpOnly: false
}))

app.use('/api', routers)

app.listen(port, () => {
    console.log(`listen on localhost:${port}`)
})