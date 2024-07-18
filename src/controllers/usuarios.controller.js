import Usuario from '../models/Usuarios.js';

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
    const usuario = new Usuario(req.body);
    try {
        const nuevoUsuario = await usuario.save();
        const usuarioFormateado = {
            nombres: nuevoUsuario.nombres,
            apellidos: nuevoUsuario.apellidos,
            username: nuevoUsuario.username,
            imagen: nuevoUsuario.imagen,
            rol: nuevoUsuario.rol
        };
        res.status(201).json(usuarioFormateado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

