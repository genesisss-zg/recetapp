const MAZAPAN_API_BASE = 'https://api-de-recetas.mazapan.vlabs.dev';

export class RecipeService {
  
  // Obtener todas las recetas
  static async getAllRecipes() {
    try {
      console.log('🔗 Conectando a:', `${MAZAPAN_API_BASE}/recipes`);
      const response = await fetch(`${MAZAPAN_API_BASE}/recipes`);
      
      console.log('📡 Status de respuesta:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📦 Datos recibidos:', data);
      
      return data.recipes || data || [];
    } catch (error) {
      console.error('❌ Error fetching recipes from API:', error);
      return [];
    }
  }

  // Obtener receta por ID
  static async getRecipeById(id) {
    try {
      const response = await fetch(`${MAZAPAN_API_BASE}/recipes/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      return null;
    }
  }

  // Buscar recetas por ingredientes
  static async searchRecipesByIngredients(ingredients) {
    try {
      const query = ingredients.join(',');
      const response = await fetch(`${MAZAPAN_API_BASE}/recipes?ingredients=${query}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.recipes || [];
    } catch (error) {
      console.error('Error searching recipes by ingredients:', error);
      return [];
    }
  }

  // Obtener recetas por categoría
  static async getRecipesByCategory(category) {
    try {
      const response = await fetch(`${MAZAPAN_API_BASE}/recipes?category=${category}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.recipes || [];
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      return [];
    }
  }
}