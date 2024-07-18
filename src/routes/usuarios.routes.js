import express from 'express';
import { getAllUsers, createUser } from '../controllers/usuarios.controller.js';

const router = express.Router();

// GET /api/users -> Mostrar todos los usuarios
router.get('/users', getAllUsers);

// POST /api/users -> Guardar un usuario
router.post('/users', createUser);

export default router;