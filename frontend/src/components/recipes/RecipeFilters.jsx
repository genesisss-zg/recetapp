import { Filter, Clock, ChefHat } from 'lucide-react';
import { useState } from 'react';

export default function RecipeFilters({ onFiltersChange }) {
  const [filters, setFilters] = useState({
    category: 'todas',
    maxTime: 120,
    difficulty: 'todas'
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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