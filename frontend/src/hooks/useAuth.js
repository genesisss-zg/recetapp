import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario al iniciar desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      // Verificar si el token sigue siendo válido
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Verificar token con el backend
  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token inválido, limpiar localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      console.error('Error verificando token:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login real con el backend
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el login');
      }

      // Guardar usuario y token
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      throw new Error(error.message || 'Error de conexión');
    }
  };

  // Register real con el backend
  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      // Guardar usuario y token
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      throw new Error(error.message || 'Error de conexión');
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('favoriteRecipes');
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout
  };
}