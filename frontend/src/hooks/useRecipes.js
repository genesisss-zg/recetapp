import { useState, useEffect } from 'react';
import recipesData from '../data/recipes.json';
import ingredientsData from '../data/ingredients.json';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);

  // Cargar recetas al inicio
  useEffect(() => {
    setRecipes(recipesData.recipes);
  }, []);

  // Encontrar recetas que coincidan con los ingredientes seleccionados
  const findMatchingRecipes = (selectedIngredientIds) => {
    if (selectedIngredientIds.length === 0) {
      setMatchedRecipes([]);
      return;
    }

    const matches = recipes.map(recipe => {
      const recipeIngredientIds = recipe.ingredients;
      
      // Ingredientes que coinciden
      const matchingIngredients = recipeIngredientIds.filter(ingId =>
        selectedIngredientIds.includes(ingId)
      );

      // Ingredientes faltantes
      const missingIngredients = recipeIngredientIds.filter(ingId =>
        !selectedIngredientIds.includes(ingId)
      );

      // Calcular porcentaje de coincidencia
      const matchPercentage = Math.round(
        (matchingIngredients.length / recipeIngredientIds.length) * 100
      );

      // Obtener información completa de ingredientes
      const matchingIngredientsInfo = matchingIngredients.map(ingId =>
        ingredientsData.ingredients.find(ing => ing.id === ingId)
      );

      const missingIngredientsInfo = missingIngredients.map(ingId =>
        ingredientsData.ingredients.find(ing => ing.id === ingId)
      );

      return {
        ...recipe,
        matchPercentage,
        matchingIngredients: matchingIngredientsInfo,
        missingIngredients: missingIngredientsInfo,
        canMake: missingIngredients.length === 0 // Si no faltan ingredientes
      };
    });

    // Ordenar por porcentaje de coincidencia (mayor a menor)
    const sortedMatches = matches
      .filter(recipe => recipe.matchPercentage > 0) // Solo recetas con al menos 1 coincidencia
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setMatchedRecipes(sortedMatches);
  };

  // Obtener receta por ID
  const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return {
    recipes,
    matchedRecipes,
    findMatchingRecipes,
    getRecipeById
  };
}