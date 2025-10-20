import Header from './components/common/Header';
import { Search, Utensils, Leaf, Clock, Heart, Star } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-secondary bg-[url('/images/backgrounds/pattern.svg')] bg-cover bg-center bg-no-repeat">
      <Header />
      
      {/* ✅ MAIN COMPLETAMENTE TRANSPARENTE ✅ */}
      <main className="min-h-screen bg-transparent">
        
        {/* Hero Section CON FONDO VERDE EXPLÍCITO */}
        <section className="bg-gradient-to-r from-secondary to-green-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">
              Cocina Inteligente,
              <span className="text-warning block">Cero Desperdicio</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transforma lo que tienes en tu refrigerador en deliciosas recetas
            </p>
            
            {/* Buscador principal */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Search className="text-secondary" size={28} />
                <h2 className="text-3xl font-semibold text-gray-800">
                  ¿Qué ingredientes tienes hoy?
                </h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <input 
                  type="text" 
                  placeholder="Ej: tomate, cebolla, pollo, arroz..."
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary text-lg bg-gray-50"
                />
                <button className="bg-secondary hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center text-lg">
                  <Utensils className="inline mr-3" size={24} />
                  Encontrar Recetas
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Stats Section TRANSPARENTE - AHORA SÍ SE VERÁ ✅ */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Leaf className="mx-auto text-secondary mb-4" size={48} />
              <div className="text-3xl font-bold text-secondary mb-3">95%</div>
              <p className="text-gray-700 text-lg">Coincidencia perfecta con tus ingredientes</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="mx-auto text-secondary mb-4" size={48} />
              <div className="text-3xl font-bold text-secondary mb-3">0%</div>
              <p className="text-gray-700 text-lg">Desperdicio de alimentos</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Star className="mx-auto text-secondary mb-4" size={48} />
              <div className="text-3xl font-bold text-secondary mb-3">∞</div>
              <p className="text-gray-700 text-lg">Recetas personalizadas para ti</p>
            </div>
          </div>
        </section>

        {/* Beneficios CON FONDO BLANCO EXPLÍCITO */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 font-poppins">
              ¿Por qué miles confían en RecetApp?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="flex items-start space-x-6 p-6 bg-bg-light rounded-2xl shadow-md border border-secondary/20">
                <div className="bg-secondary text-white p-3 rounded-xl">
                  <Leaf size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-xl">Eco-Friendly</h3>
                  <p className="text-gray-600">Reduce tu huella ambiental evitando el desperdicio de alimentos</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 p-6 bg-bg-light rounded-2xl shadow-md border border-secondary/20">
                <div className="bg-secondary text-white p-3 rounded-xl">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-xl">Ahorra Dinero</h3>
                  <p className="text-gray-600">Utiliza lo que ya tienes y reduce tus gastos en comida</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action CON FONDO VERDE EXPLÍCITO */}
        <section className="bg-secondary text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-xl mb-8">Únete a la comunidad que está transformando su forma de cocinar</p>
            <button className="bg-warning text-gray-800 hover:bg-yellow-400 font-bold py-4 px-12 rounded-xl transition-colors text-lg">
              Comenzar Ahora - Es Gratis
            </button>
          </div>
        </section>
        
      </main>
    </div>
  );
}

export default App;