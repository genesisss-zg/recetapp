import { useState, useEffect } from 'react';
import ingredientsData from '../data/ingredients.json';

export function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar ingredientes al inicio
  useEffect(() => {
    setIngredients(ingredientsData.ingredients);
  }, []);

  // Buscar ingredientes
  const searchIngredients = (term) => {
    if (!term) return [];
    return ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  // Agregar ingrediente seleccionado
  const addIngredient = (ingredient) => {
    if (!selectedIngredients.find(item => item.id === ingredient.id)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  // Eliminar ingrediente seleccionado
  const removeIngredient = (ingredientId) => {
    setSelectedIngredients(prev => prev.filter(item => item.id !== ingredientId));
  };

  // Limpiar todos los ingredientes seleccionados
  const clearIngredients = () => {
    setSelectedIngredients([]);
  };

  // Obtener IDs de ingredientes seleccionados
  const getSelectedIngredientIds = () => {
    return selectedIngredients.map(ing => ing.id);
  };

  return {
    ingredients,
    selectedIngredients,
    searchTerm,
    setSearchTerm,
    searchIngredients,
    addIngredient,
    removeIngredient,
    clearIngredients,
    getSelectedIngredientIds
  };
}