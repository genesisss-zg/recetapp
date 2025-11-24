import { useState, useEffect } from 'react';
import localRecipes from '../data/recipes.json';
import ingredientsData from '../data/ingredients.json';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);
  const [filters, setFilters] = useState({
    category: 'todas',
    maxTime: 120,
    difficulty: 'todas',
    minMatchPercentage: 45
  });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ CARGAR UNA SOLA VEZ - SIN EFECTOS SECUNDARIOS
  useEffect(() => {
    console.log('📥 INIT: Cargando recetas');
    setRecipes(localRecipes.recipes);
  }, []);

  // ✅ FUNCIÓN SIMPLE - SIN COMPLEJIDAD
  const findMatchingRecipes = (selectedIngredientIds) => {
    // ✅ SALIR INMEDIATAMENTE si no hay ingredientes
    if (!selectedIngredientIds || selectedIngredientIds.length === 0) {
      setMatchedRecipes([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // ✅ TIMEOUT para evitar bloqueos
    setTimeout(() => {
      try {
        const matches = recipes.map(recipe => {
          const matchingCount = recipe.ingredients.filter(id => 
            selectedIngredientIds.includes(id)
          ).length;
          
          const matchPercentage = Math.round(
            (matchingCount / recipe.ingredients.length) * 100
          );

          const matchingIngredientsInfo = matchingCount > 0 ? 
            recipe.ingredients
              .filter(id => selectedIngredientIds.includes(id))
              .map(ingId => ingredientsData.ingredients.find(ing => ing.id === ingId))
              .filter(ing => ing !== undefined) : [];

          const missingIngredientsInfo = recipe.ingredients
            .filter(id => !selectedIngredientIds.includes(id))
            .map(ingId => ingredientsData.ingredients.find(ing => ing.id === ingId))
            .filter(ing => ing !== undefined);

          return {
            ...recipe,
            matchPercentage,
            matchingIngredients: matchingIngredientsInfo,
            missingIngredients: missingIngredientsInfo,
            canMake: matchingCount === recipe.ingredients.length
          };
        });

        const validMatches = matches
          .filter(recipe => recipe.matchPercentage > 0)
          .sort((a, b) => b.matchPercentage - a.matchPercentage);

        // Aplicar filtros
        const filtered = validMatches.filter(recipe => 
          recipe.matchPercentage >= filters.minMatchPercentage &&
          recipe.prepTime <= filters.maxTime &&
          (filters.category === 'todas' || recipe.category === filters.category) &&
          (filters.difficulty === 'todas' || recipe.difficulty === filters.difficulty)
        );

        setMatchedRecipes(filtered);
      } catch (error) {
        console.error('❌ Error en búsqueda:', error);
        setMatchedRecipes([]);
      } finally {
        setIsLoading(false);
      }
    }, 100);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return {
    recipes,
    matchedRecipes,
    filters,
    isLoading,
    findMatchingRecipes,
    updateFilters,
    getRecipeById
  };
}