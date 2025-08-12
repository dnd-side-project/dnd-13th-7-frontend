import { createMiddleware } from '@mswjs/http-middleware'
import cors from 'cors'
import express from 'express'
import handlers from './handlers'

const app = express()
app.use(cors())
const PORT = 8080

app.use(express.json())
app.use(createMiddleware(...handlers))

app.listen(PORT, () => console.log(`Mock server is running on port: ${PORT}`))
