 import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imagen: String,
    rol: { type: String, enum: ['maestro', 'alumno'], required: true }
});

export default mongoose.model('Usuario', usuarioSchema);

