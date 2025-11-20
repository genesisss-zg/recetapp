import { useState, useEffect, useCallback } from 'react';
import localRecipes from '../data/recipes.json';
import ingredientsData from '../data/ingredients.json';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filters, setFilters] = useState({
    category: 'todas',
    maxTime: 120,
    difficulty: 'todas',
    minMatchPercentage: 45
  });
  const [isLoading, setIsLoading] = useState(false);

  // Cargar recetas al inicio - SIMPLIFICADO
  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      try {
        console.log('🚀 Cargando recetas locales...');
        // Usamos directamente las recetas del archivo JSON
        setRecipes(localRecipes.recipes);
        console.log('✅ Recetas cargadas exitosamente:', localRecipes.recipes.length);
      } catch (error) {
        console.error('❌ Error cargando recetas:', error);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [matchedRecipes, filters]);

  const applyFilters = useCallback(() => {
    let filtered = matchedRecipes;

    // ✅ FILTRAR POR PORCENTAJE MÍNIMO
    if (filters.minMatchPercentage > 0) {
      filtered = filtered.filter(recipe => 
        recipe.matchPercentage >= filters.minMatchPercentage
      );
    }

    // Filtrar por categoría
    if (filters.category !== 'todas') {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }

    // Filtrar por tiempo
    filtered = filtered.filter(recipe => recipe.prepTime <= filters.maxTime);

    // Filtrar por dificultad
    if (filters.difficulty !== 'todas') {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    setFilteredRecipes(filtered);
  }, [matchedRecipes, filters]);

  // Función para matches locales
  const calculateLocalMatches = useCallback((selectedIngredientIds) => {
    if (selectedIngredientIds.length === 0) return [];

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
      ).filter(ing => ing !== undefined);

      const missingIngredientsInfo = missingIngredients.map(ingId =>
        ingredientsData.ingredients.find(ing => ing.id === ingId)
      ).filter(ing => ing !== undefined);

      return {
        ...recipe,
        matchPercentage,
        matchingIngredients: matchingIngredientsInfo,
        missingIngredients: missingIngredientsInfo,
        canMake: missingIngredients.length === 0
      };
    });

    // Ordenar por porcentaje de coincidencia (mayor a menor)
    return matches
      .filter(recipe => recipe.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [recipes]);

  // Encontrar recetas que coincidan con los ingredientes seleccionados
  const findMatchingRecipes = useCallback((selectedIngredientIds) => {
    if (selectedIngredientIds.length === 0) {
      setMatchedRecipes([]);
      setFilteredRecipes([]);
      return;
    }

    setIsLoading(true);
    
    // Usamos setTimeout mínimo para no bloquear la UI
    setTimeout(() => {
      const matches = calculateLocalMatches(selectedIngredientIds);
      setMatchedRecipes(matches);
      setIsLoading(false);
      console.log(`🎯 Encontradas ${matches.length} recetas locales`);
    }, 10);

  }, [calculateLocalMatches]);

  // Actualizar filtros
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Obtener receta por ID
  const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return {
    recipes,
    matchedRecipes: filteredRecipes,
    filters,
    isLoading,
    findMatchingRecipes,
    updateFilters,
    getRecipeById
  };
}