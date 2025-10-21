import { ChefHat, User, LogIn, LogOut, Bookmark, History, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Login from '../auth/Login';
import Register from '../auth/Register';

export default function Header() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
  };

  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      <header className="bg-secondary text-white p-4 shadow-lg w-full top-0 z-40"> {/* sticky para mantener el header al bajar */} 
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <img 
            src="/images/logo/logo.png" 
            alt="RecetApp Logo" 
            className="h-10 w-10"/>
            <h1 className="text-2xl font-bold font-poppins">RecetApp</h1>
          </div>
          
          {/* Navegación */}
          <nav className="flex items-center space-x-4">
            {user ? (
              /* Usuario logeado */
              <div className="relative" ref={menuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl group"
                >
                  <div className="text-left hidden md:block">
                    <div className="flex gap-2 font-medium text-lg">
                      <span>Hola</span>
                      <span className="font-semibold text-green-950 text-lg">
                        {user.name.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  
                  <ChevronDown 
                    size={18} 
                    className={`text-white transition-transform ${
                      showUserMenu ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Menú desplegable del usuario */}
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                    {/* Header del menú */}             
                    {/* Opciones del menú */}
                    <div className="py-2">
                      <button 
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors group"
                      >
                        <Bookmark size={18} className="text-secondary group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium">Mis Favoritos</p>
                          <p className="text-xs text-gray-500">Recetas guardadas</p>
                        </div>
                      </button>
                    
                      <button 
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors group"
                      >
                        <User size={18} className="text-secondary group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium">Mi Perfil</p>
                          <p className="text-xs text-gray-500">Configuración</p>
                        </div>
                      </button>
                    </div>

                    {/* Separador */}
                    <div className="border-t border-gray-100 my-2"></div>

                    {/* Cerrar sesión */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors group"
                    >
                      <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Usuario no logeado */
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleLoginClick}
                  className="flex items-center space-x-2 hover:bg-white/20 transition-colors font-medium px-4 py-2 rounded-xl"
                >
                  <LogIn size={18} />
                  <span>Iniciar Sesión</span>
                </button>
                <button 
                  onClick={handleRegisterClick}
                  className="flex items-center space-x-2 hover:bg-warning hover:text-gray-800 transition-colors font-medium bg-white text-secondary px-4 py-2 rounded-xl"
                >
                  <User size={18} />
                  <span>Registrarse</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Modales de autenticación */}
      {showAuthModal && authMode === 'login' && (
        <Login 
          onClose={handleAuthClose}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}

      {showAuthModal && authMode === 'register' && (
        <Register 
          onClose={handleAuthClose}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </>
  );
}