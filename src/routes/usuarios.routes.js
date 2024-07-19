import express from 'express';
import { getAllUsers, createUser, getUserById, updateUserById, deleteUser } from '../controllers/usuarios.controller.js';

const router = express.Router();

// GET /api/users -> Mostrar todos los usuarios
router.get('/users', getAllUsers);

// POST /api/users -> Guardar un usuario
router.post('/users', createUser);

router.get('/users/:id', getUserById); 

router.put('/users/:id', updateUserById)

router.delete('/users/:id', deleteUser)

export default router;