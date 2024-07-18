import express from 'express';
import { connectDB } from './config/db.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import { PORT } from './config/config.js';

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', usuariosRoutes);

// Conexión a la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});