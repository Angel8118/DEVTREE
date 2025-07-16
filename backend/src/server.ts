import express from 'express'  // ESM
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

// Conectar a la base de datos
connectDB()

const app = express()

// Configuración de CORS
app.use(cors(corsConfig))

// Leer datos del formulario
app.use(express.json())


app.use('/', router)

export default app