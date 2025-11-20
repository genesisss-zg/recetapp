import { Filter, Clock, ChefHat, Target } from 'lucide-react';
import { useState } from 'react';

export default function RecipeFilters({ onFiltersChange }) {
  const [filters, setFilters] = useState({
    category: 'todas',
    maxTime: 120,
    difficulty: 'todas',
    minMatchPercentage: 50 // ✅ NUEVO FILTRO - porcentaje mínimo
  });

  const categories = [
    'todas',
    'mexicana',
    'italiana',
    'oriental',
    'vegetariana',
    'pescados',
    'sopas',
    'ensaladas',
    'desayuno',
    'aperitivos',
    'botanas',
    'postres',
    'guarniciones',
    'sandwiches'
  ];

  const difficulties = [
    'todas',
    'fácil',
    'medio',
    'difícil'
  ];

  // ✅ OPCIONES DE PORCENTAJE DE COINCIDENCIA
  const matchPercentages = [
    { value: 0, label: 'Cualquier coincidencia' },
    { value: 30, label: '30% o más' },
    { value: 50, label: '50% o más' },
    { value: 70, label: '70% o más' },
    { value: 90, label: '90% o más' },
    { value: 100, label: '100% (Puedo hacerla)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="text-secondary" size={24} />
        <h3 className="text-xl font-bold text-gray-800 font-poppins">
          Filtrar Recetas
        </h3>
      </div>

      {/* ✅ CAMBIAMOS A grid-cols-4 PARA LOS 4 FILTROS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* ✅ NUEVO FILTRO: Porcentaje mínimo de coincidencia */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Target size={16} />
            Coincidencia mínima
          </label>
          <select
            value={filters.minMatchPercentage}
            onChange={(e) => handleFilterChange('minMatchPercentage', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {matchPercentages.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'todas' ? 'Todas las categorías' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por tiempo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Clock size={16} />
            Tiempo máximo: {filters.maxTime} min
          </label>
          <input
            type="range"
            min="10"
            max="120"
            step="10"
            value={filters.maxTime}
            onChange={(e) => handleFilterChange('maxTime', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10min</span>
            <span>120min</span>
          </div>
        </div>

        {/* Filtro por dificultad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <ChefHat size={16} />
            Dificultad
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'todas' ? 'Todas' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}