import { X, Clock, ChefHat, Star, Share2, Bookmark, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function RecipeModal({ recipe, isOpen, onClose, onToggleFavorite }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Verificar si la receta es favorita al cargar
  useEffect(() => {
    if (recipe) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      setIsFavorite(favorites.includes(recipe.id));
    }
  }, [recipe]);

  if (!isOpen || !recipe) return null;

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== recipe.id);
    } else {
      newFavorites = [...favorites, recipe.id];
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(recipe.id, !isFavorite);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.name,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error al compartir:', err);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(`${recipe.name} - ${recipe.description}`);
      alert('¡Receta copiada al portapapeles!');
    }
  };

  const handleNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header del modal */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 rounded-t-2xl flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 font-poppins mb-2">
              {recipe.name}
            </h2>
            <p className="text-gray-600 text-lg">{recipe.description}</p>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={handleToggleFavorite}
              className={`p-3 rounded-xl transition-colors ${
                isFavorite 
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Información general */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <Clock className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Tiempo de preparación</p>
                <p className="font-semibold text-gray-800">{recipe.prepTime} minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <ChefHat className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Dificultad</p>
                <p className="font-semibold text-gray-800 capitalize">{recipe.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
              <Star className="text-purple-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Coincidencia</p>
                <p className="font-semibold text-gray-800">{recipe.matchPercentage}%</p>
              </div>
            </div>
          </div>

          {/* Ingredientes */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-poppins">
              Ingredientes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.matchingIngredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-lg">{ingredient.emoji}</span>
                  <span className="font-medium text-gray-800">{ingredient.name}</span>
                  <span className="text-sm text-green-600 ml-auto">✓ Disponible</span>
                </div>
              ))}
              {recipe.missingIngredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <span className="text-lg">{ingredient.emoji}</span>
                  <span className="font-medium text-gray-800">{ingredient.name}</span>
                  <span className="text-sm text-orange-600 ml-auto">✗ Faltante</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pasos de preparación */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-poppins">
              Preparación
            </h3>
            
            {/* Navegación de pasos */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {recipe.steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    currentStep === index
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Paso {index + 1}
                </button>
              ))}
            </div>

            {/* Paso actual */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {currentStep + 1}
                </div>
                <h4 className="text-xl font-semibold text-gray-800">
                  Paso {currentStep + 1} de {recipe.steps.length}
                </h4>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {recipe.steps[currentStep]}
              </p>
            </div>

            {/* Controles de navegación */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Anterior
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStep === recipe.steps.length - 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                  currentStep === recipe.steps.length - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-secondary text-white hover:bg-green-700'
                }`}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}