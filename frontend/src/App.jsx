import Header from './components/common/Header';
import IngredientSearch from './components/ingredients/IngredientSearch';
import { Leaf, Clock, Heart, Star } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-secondary bg-transparent bg-cover bg-center bg-no-repeat">
      <Header />
      
      <main className="min-h-screen bg-transparent mt-5">      
        {/* Hero Section SOLO con texto e imagen */}
        <section className="bg-gradient-to-r from-secondary to-green-700 text-white py-4 rounded-xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* Columna izquierda - Solo texto */}
              <div className="flex-2 text-center lg:text-left leading-relaxed">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins py-1 leading-loose">
                  Cocina Inteligente,
                  <span className="text-warning block">Cero Desperdicio</span>
                </h1>
                <p className="text-xl md:text-2xl mb-4 max-w-2xl">
                  Transforma lo que tienes en tu refrigerador en deliciosas recetas
                </p>
                <p className="text-lg text-white/80">
                  Encuentra recetas perfectas con lo que ya tienes en casa
                </p>
              </div>

              {/* Columna derecha - Solo imagen */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <img 
                  src="/images/hero/lupa.svg" 
                  alt="Ilustración de lupa buscando ingredientes"
                  className="w-full max-w-sm lg:max-w-lg xl:max-w-xl"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ✅ SECCIÓN SEPARADA PARA EL BUSCADOR Y RESULTADOS ✅ */}
        <section className="max-w-7xl mx-auto px-4 py-12 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins mb-4">
                ¿Qué ingredientes tienes hoy?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comienza escribiendo los ingredientes que tienes disponibles y descubre recetas increíbles
              </p>
            </div>
            
            {/* Componente de búsqueda funcional - AHORA OCUPA TODO EL ANCHO */}
            <IngredientSearch />
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
        <section className="bg-white py-16 rounded-xl">{/* seccion de fondo blanco  */}
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 font-poppins">
              ¿Por qué confiar en RecetApp?
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
        <section className="bg-transparent py-2 rounded-xl"></section>        
      </main>
    </div>
  );
}

export default App;