import Usuario from '../models/Usuarios.js';
import bcrypt from 'bcrypt'


export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {

        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuarioFormateado = {
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            username: usuario.username,
            imagen: usuario.imagen,
            rol: usuario.rol
        };

        res.json(usuarioFormateado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params
        const { nombres, apellidos, username, rol, password } = req.body

        if (!nombres || !apellidos || !username || !rol) {
            return res.status(400).json({ message: 'Datos incompletos' })
        }

        const usuario = await Usuario.findById(id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        usuario.nombres = nombres
        usuario.apellidos = apellidos
        usuario.username = username
        usuario.rol = rol

        // Solo actualiza la contraseña si se proporciona una nueva
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            usuario.password = hashedPassword
        }

        await usuario.save()

        res.json({ message: 'Usuario actualizado', data: usuario })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await usuario.deleteOne();
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '-_id -__v');
        const usuariosFormateados = usuarios
            .map(usuario => ({
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                username: usuario.username,
                imagen: usuario.imagen,
                rol: usuario.rol
            }))
            .filter(usuario => Object.keys(usuario).length > 0); // Elimina objetos vacíos

        res.json(usuariosFormateados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { nombres, apellidos, username, rol, password } = req.body

        if (!nombres || !apellidos || !username || !rol || !password) {
            return res.status(400).json({ message: 'Datos incompletos' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new Usuario({
            nombres,
            apellidos,
            username,
            rol,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({ message: 'Usuario creado', data: newUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}