// frontend/src/components/ai/AIChefChat.jsx
import { useState, useRef, useEffect } from 'react';
import { Send, ChefHat, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AIChefService } from '../../services/aiChefService';

// ✅ COMPONENTE PARA MENSAJES FORMATEADOS
const MessageBubble = ({ message }) => {
  if (message.role === 'user') {
    return (
      <div className="mb-4 text-right">
        <div className="inline-block max-w-xs lg:max-w-md px-4 py-3 bg-secondary text-white rounded-lg">
          {message.content}
        </div>
      </div>
    );
  }

  // ✅ MENSAJE DEL CHEF CON MARKDOWN
  return (
    <div className="mb-4 text-left">
      <div className="inline-block max-w-xs lg:max-w-md px-4 py-3 bg-white border border-gray-200 text-gray-800 rounded-lg shadow-sm">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
              h1: ({ children }) => <h1 className="text-lg font-bold mt-2 mb-1 text-gray-900">{children}</h1>,
              h2: ({ children }) => <h2 className="text-md font-semibold mt-2 mb-1 text-gray-900">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-medium mt-1 mb-1 text-gray-800">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-1">{children}</ol>,
              li: ({ children }) => <li className="text-sm">{children}</li>,
              p: ({ children }) => <p className="my-1">{children}</p>,
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default function AIChefChat({ availableIngredients = [] }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mensaje de bienvenida automático cuando se abren ingredientes
  useEffect(() => {
    if (isOpen && availableIngredients.length > 0 && messages.length === 0) {
      const welcomeMessage = `¡Hola! Soy Chef Carlos 👨‍🍳 Veo que tienes: **${availableIngredients.join(', ')}**. \n\n¿En qué puedo ayudarte? ¿Quieres que te sugiera alguna receta creativa con estos ingredientes?`;
      setMessages([{ role: 'assistant', content: welcomeMessage }]);
    }
  }, [isOpen, availableIngredients.length, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // ✅ Timeout de 25 segundos
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('El chef está tardando mucho en responder')), 25000)
      );
      
      const aiResponse = await Promise.race([
        AIChefService.chatWithChef(userMessage, availableIngredients),
        timeoutPromise
      ]);
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        } catch (error) {
        console.error('Error en chat con Gemini:', error);
        
        // ✅ MOSTRAR ERROR REAL para debugging
        let errorMessage = '';
        
        if (error.message.includes('API key') || error.message.includes('403')) {
            errorMessage = "🔑 **Problema de autenticación**\n\nParece que hay un problema con la configuración de la API. Por favor verifica que tu API key de Gemini sea correcta y esté activa.";
        } else if (error.message.includes('404')) {
            errorMessage = "🌐 **Endpoint no disponible**\n\nEl servicio de Gemini no está respondiendo. Esto puede ser temporal. Intenta nuevamente en unos minutos.";
        } else if (error.message.includes('Límite') || error.message.includes('429')) {
            errorMessage = "⏰ **Límite alcanzado**\n\nHe hecho demasiadas consultas muy rápido. Por favor espera 1 minuto antes de intentar nuevamente.";
        } else {
            errorMessage = `🔧 **Error de conexión**\n\nNo pude contactar al chef IA: ${error.message}`;
        }
        
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: errorMessage 
        }]);
        } finally {
        setIsLoading(false);
        }
    }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "¿Qué puedo hacer con estos ingredientes?",
    "Dame una receta rápida y fácil",
    "¿Tienes ideas creativas?",
    "¿Cómo puedo mejorar mis platillos?"
  ];

  // Resetear conversación cuando se cierra y abre
  const handleToggleChat = () => {
    if (isOpen) {
      // Cerrar chat
      setIsOpen(false);
      // Opcional: mantener mensajes o resetear
      // setMessages([]);
    } else {
      // Abrir chat - resetear conversación
      setMessages([]);
      setIsOpen(true);
    }
  };

  if (!isOpen) {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-secondary p-6 rounded-lg mt-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-secondary text-white p-3 rounded-full">
            <ChefHat size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">¿No encontraste recetas?</h3>
            <p className="text-gray-600">¡Nuestro Chef IA puede crear una receta personalizada!</p>
          </div>
        </div>
        
        <button 
          onClick={handleToggleChat}
          className="bg-secondary hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <MessageCircle size={20} />
          Consultar al Chef IA
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
      {/* Header */}
      <div className="bg-secondary text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChefHat size={24} />
          <div>
            <h3 className="font-bold">Chef Carlos</h3>
            <p className="text-sm opacity-90">Tu asistente culinario personal</p>
          </div>
        </div>
        <button 
          onClick={handleToggleChat}
          className="text-white hover:text-gray-200 text-sm font-medium"
        >
          Cerrar
        </button>
      </div>

      {/* Mensajes */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-600">Chef Carlos está pensando...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preguntas rápidas */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">Preguntas sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta al chef..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-secondary hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Chef Carlos - Tu asistente de cocina inteligente
        </p>
      </div>
    </div>
  );
}