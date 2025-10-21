import { Clock, ChefHat, CheckCircle, XCircle } from 'lucide-react';

export default function RecipeResults({ recipes, selectedIngredients }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <ChefHat size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          {selectedIngredients.length === 0 
            ? "Agrega algunos ingredientes para encontrar recetas" 
            : "No se encontraron recetas con esos ingredientes"
          }
        </h3>
        <p className="text-gray-500">
          {selectedIngredients.length === 0 
            ? "Comienza escribiendo los ingredientes que tienes disponibles"
            : "Intenta con diferentes combinaciones de ingredientes"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Header de la receta */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-800 font-poppins">
                {recipe.name}
              </h3>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                recipe.canMake 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {recipe.matchPercentage}%
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{recipe.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{recipe.prepTime} min</span>
              </div>
              <div className={`px-2 py-1 rounded-full ${
                recipe.difficulty === 'fácil' 
                  ? 'bg-green-100 text-green-800'
                  : recipe.difficulty === 'medio'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {recipe.difficulty}
              </div>
            </div>
          </div>

          {/* Ingredientes */}
          <div className="p-6">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                Ingredientes que tienes ({recipe.matchingIngredients.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {recipe.matchingIngredients.map((ingredient) => (
                  <span
                    key={ingredient.id}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{ingredient.emoji}</span>
                    {ingredient.name}
                  </span>
                ))}
              </div>
            </div>

            {recipe.missingIngredients.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <XCircle size={18} className="text-orange-500" />
                  Ingredientes faltantes ({recipe.missingIngredients.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recipe.missingIngredients.map((ingredient) => (
                    <span
                      key={ingredient.id}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <span>{ingredient.emoji}</span>
                      {ingredient.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botón de acción */}
          <div className="px-6 pb-6">
            <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
              recipe.canMake
                ? 'bg-secondary hover:bg-green-700 text-white'
                : 'bg-gray-200 text-gray-600 cursor-not-allowed'
            }`}>
              {recipe.canMake ? 'Ver Receta Completa' : 'Ingredientes Insuficientes'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}