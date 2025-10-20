import { User, LogIn } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-secondary text-white p-4 shadow-lg w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
        <img 
            src="/images/logo/logo.png" 
            alt="RecetApp Logo" 
            className="h-10 w-10"  // Ajusta el tamaño según tu logo
        />
        <h1 className="text-2xl font-bold font-poppins">RecetApp</h1>
        </div>
        <nav className="flex space-x-4">
          <button className="flex items-center space-x-2 hover:text-warning transition-colors font-medium bg-white/20 px-4 py-2 rounded-lg">
            <LogIn size={18} />
            <span>Iniciar Sesión</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-warning hover:text-gray-800 transition-colors font-medium bg-white text-secondary px-4 py-2 rounded-lg">
            <User size={18} />
            <span>Registrarse</span>
          </button>
        </nav>
      </div>
    </header>
  );
}