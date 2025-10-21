import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

export const authController = {
  // Registro de usuario
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validaciones básicas
      if (!name || !email || !password) {
        return res.status(400).json({ 
          error: 'Nombre, email y contraseña son requeridos' 
        });
      }

      if (password.length < 6) {
        return res.status(400).json({ 
          error: 'La contraseña debe tener al menos 6 caracteres' 
        });
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ 
          error: 'El email ya está registrado' 
        });
      }

      // Crear usuario
      const user = await User.create({ name, email, password });
      
      // Generar token
      const token = generateToken(user);

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.created_at
        },
        token
      });

    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor' 
      });
    }
  },

  // Login de usuario
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validaciones básicas
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email y contraseña son requeridos' 
        });
      }

      // Buscar usuario
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Verificar contraseña
      const isValidPassword = await User.verifyPassword(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Generar token
      const token = generateToken(user);

      res.json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.created_at
        },
        token
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor' 
      });
    }
  },

  // Obtener perfil de usuario
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ 
          error: 'Usuario no encontrado' 
        });
      }

      res.json({ user });

    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor' 
      });
    }
  }
};