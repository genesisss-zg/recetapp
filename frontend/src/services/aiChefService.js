// frontend/src/services/aiChefService.js
const GEMINI_API_KEY = 'AIzaSyASGIPXxZuRrFbq6vu57Mn4GfR1U8rCEds';

export class AIChefService {
  static async chatWithChef(userMessage, availableIngredients = []) {
    try {
      console.log('🧑‍🍳 Enviando consulta a Gemini API...');
      
      const prompt = this.buildPrompt(userMessage, availableIngredients);
      console.log('📤 Prompt:', prompt.substring(0, 100) + '...');
      
      // ✅ USAR MODELOS DISPONIBLES - empezar con Gemini 2.0 Flash
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.8,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 512,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH", 
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        }
      );

      console.log('📡 Status de respuesta:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error de API:', errorData);
        
        if (response.status === 429) {
          throw new Error('Límite de solicitudes alcanzado. Espera un momento.');
        }
        if (response.status === 400) {
          throw new Error('Solicitud incorrecta. Verifica el modelo.');
        }
        if (response.status === 403) {
          throw new Error('API key no válida o sin permisos.');
        }
        if (response.status === 404) {
          // ✅ PROBAR MODELOS ALTERNATIVOS DISPONIBLES
          console.log('🔄 Probando modelos alternativos...');
          return await this.tryAlternativeModel(userMessage, availableIngredients);
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Respuesta de Gemini recibida');
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('❌ Estructura inesperada:', data);
        throw new Error('Estructura de respuesta inesperada');
      }
      
      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log('🎯 Respuesta procesada exitosamente');
      return aiResponse;
      
    } catch (error) {
      console.error('❌ Error con Gemini API:', error);
      throw new Error(`No pude conectar con Gemini: ${error.message}`);
    }
  }

  // ✅ MÉTODO ACTUALIZADO CON MODELOS DISPONIBLES
  static async tryAlternativeModel(userMessage, availableIngredients) {
    // Modelos que tienes disponibles según tu lista
    const models = [
      'gemini-2.0-flash-001',
      'gemini-2.0-flash-lite-001',
      'gemini-2.0-flash-lite',
      'gemini-2.0-flash'
    ];
    
    const prompt = this.buildPrompt(userMessage, availableIngredients);
    
    for (const model of models) {
      try {
        console.log(`🔄 Probando modelo: ${model}`);
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }],
              generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 512,
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Modelo ${model} funcionó`);
          return data.candidates[0].content.parts[0].text;
        } else {
          console.log(`❌ Modelo ${model} falló con status:`, response.status);
        }
      } catch (error) {
        console.log(`❌ Modelo ${model} falló:`, error.message);
        continue;
      }
    }
    
    throw new Error('Todos los modelos de Gemini fallaron. Verifica tu API key y modelos disponibles.');
  }

  static buildPrompt(userMessage, ingredients) {
    const ingredientText = ingredients.length > 0 
      ? `El usuario tiene estos ingredientes disponibles: ${ingredients.join(', ')}. `
      : 'El usuario no especificó ingredientes. ';

    return `Eres "Chef Carlos", un chef mexicano experto con más de 20 años de experiencia.

    CONTEXTO:
    ${ingredientText}
    PREGUNTA: "${userMessage}"

    INSTRUCCIONES:
    - Responde en español
    - Sé práctico y creativo
    - Sugiere recetas realistas
    - Incluye tiempo de preparación
    - Da consejos útiles
    - Firma como "👨‍🍳 Chef Carlos"
    - Máximo 250 palabras

    FORMATO:
    [Saludo respetuoso]

    **🍽️ [Nombre de receta]**

    **Ingredientes principales:**
    • [Lista]

    **Preparación:**
    1. [Paso 1]
    2. [Paso 2]

    **⏱️ Tiempo:** [Tiempo]

    **💡 Consejo:** [Consejo]

    -👨‍🍳 Chef Carlos`;
  }
}