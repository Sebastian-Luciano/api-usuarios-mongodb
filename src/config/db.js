import mongoose from 'mongoose'
import { DB_URL } from '../config/config.js'

export async function connectDB () {
  try {
    await mongoose.connect(DB_URL)
    console.log('Conectado a la bd')
  } catch (error) {
    console.log('Error en la conexión a la bd:', error)
  }
}