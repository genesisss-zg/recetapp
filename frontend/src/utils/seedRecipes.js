// seedRecipes.js - Versión simplificada
export async function getExpandedRecipes() {
  // Retornar directamente las recetas locales
  const localRecipes = await import('../data/recipes.json');
  return localRecipes;
}