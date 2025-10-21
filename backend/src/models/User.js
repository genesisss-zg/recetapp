import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
  // Crear usuario
  static async create(userData) {
    const { name, email, password } = userData;
    
    // Hash de la contraseña
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const query = `
      INSERT INTO users (name, email, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING id, name, email, created_at
    `;
    
    const values = [name, email, passwordHash];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Buscar usuario por ID
  static async findById(id) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Actualizar usuario
  static async update(id, userData) {
    const { name, email } = userData;
    const query = `
      UPDATE users 
      SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $3 
      RETURNING id, name, email, updated_at
    `;
    const result = await pool.query(query, [name, email, id]);
    return result.rows[0];
  }
}