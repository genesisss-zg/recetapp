import { useState, useRef, useEffect } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { useIngredients } from '../../hooks/useIngredients';
import { useRecipes } from '../../hooks/useRecipes';
import RecipeResults from '../recipes/RecipeResults';
import RecipeModal from '../recipes/RecipeModal';
import RecipeFilters from '../recipes/RecipeFilters';

export default function IngredientSearch() {
  const {
    selectedIngredients,
    searchTerm,
    setSearchTerm,
    searchIngredients,
    addIngredient,
    removeIngredient,
    getSelectedIngredientIds
  } = useIngredients();

  // ✅ AGREGA updateFilters AQUÍ
  const { matchedRecipes, findMatchingRecipes, updateFilters } = useRecipes();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchRef = useRef(null);

  // Buscar recetas cuando cambien los ingredientes seleccionados
  useEffect(() => {
    const selectedIds = getSelectedIngredientIds();
    findMatchingRecipes(selectedIds);
  }, [selectedIngredients, findMatchingRecipes, getSelectedIngredientIds]);

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredIngredients = searchIngredients(searchTerm);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectIngredient = (ingredient) => {
    addIngredient(ingredient);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (searchTerm) {
      setShowSuggestions(true);
    }
  };

  const handleSearchRecipes = () => {
    const selectedIds = getSelectedIngredientIds();
    findMatchingRecipes(selectedIds);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="w-full">
      {/* Input de búsqueda */}
      <div className="relative" ref={searchRef}>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Ej: tomate, cebolla, pollo, arroz..."
            className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary text-lg bg-white"
          />
          <button 
            onClick={handleSearchRecipes}
            className="bg-secondary hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center text-lg"
          >
            <Search className="inline mr-3" size={24} />
            Buscar Recetas
          </button>
        </div>

        {/* Sugerencias de autocompletado */}
        {showSuggestions && filteredIngredients.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto z-50">
            {filteredIngredients.map((ingredient) => (
              <button
                key={ingredient.id}
                onClick={() => handleSelectIngredient(ingredient)}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 transition-colors"
              >
                <span className="text-xl">{ingredient.emoji}</span>
                <span className="flex-1 font-medium text-gray-800">
                  {ingredient.name}
                </span>
                <Plus size={18} className="text-secondary" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ingredientes seleccionados */}
      {selectedIngredients.length > 0 && (
        <div className="mt-6 py-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Tus ingredientes ({selectedIngredients.length}):
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="bg-white border border-secondary/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm"
              >
                <span className="text-lg">{ingredient.emoji}</span>
                <span className="font-medium text-gray-800">
                  {ingredient.name}
                </span>
                <button
                  onClick={() => removeIngredient(ingredient.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ FILTROS - AHORA SÍ FUNCIONA */}
      {matchedRecipes.length > 0 && (
        <RecipeFilters onFiltersChange={updateFilters} />
      )}

      {/* Resultados de recetas */}
      <div className="mt-8">
        <RecipeResults 
          recipes={matchedRecipes} 
          selectedIngredients={selectedIngredients}
          onRecipeClick={handleRecipeClick}
        />
      </div>

      {/* Modal de receta */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}