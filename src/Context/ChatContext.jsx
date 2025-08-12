import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState({
    "Pop ✅": [
      { emisor: 'YO', hora: '14:18', id: 1, texto: 'Quiero saber qué es Instagram ', status: 'visto' }
      ,{ emisor: 'USUARIO', hora: '14:19', id: 2, texto: "Hola, Rubito 😊.\n Instagram es una red social, como un álbum de fotos digital donde la gente guarda y comparte imágenes y videos.\nPodés ver lo que otros publican, dejar comentarios y enviar mensajes privados.\nImaginate una caja de zapatos llena de fotos de la familia y amigos, pero que todos pueden ver desde su teléfono o computadora.\n ¿Te gustaría que te explique cómo crear una cuenta o subir tu primera foto? 📷💬", status: 'visto' }
    
    ]
  });

  const [contactoActivo, setContactoActivo] = useState(null);

  const eliminarMensaje = (id) => {
    if (!contactoActivo) return;
    
    setMessages(prev => {
      const nuevosMensajes = {
        ...prev,
        [contactoActivo]: prev[contactoActivo].filter(m => m.id !== id)
      };
      return nuevosMensajes;
    });
  };

  const agregarMensaje = (event) => {
    event.preventDefault();
    const texto = event.target.texto.value.trim();

    if (!texto || !contactoActivo) return;

    const nuevoMensaje = {
      emisor: 'YO',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: Date.now(), 
      texto,
      status: 'no-recibido'
    };

    setMessages(prev => ({
      ...prev,
      [contactoActivo]: [...(prev[contactoActivo] || []), nuevoMensaje]
    }));

    event.target.reset();
  };



  return (
    <ChatContext.Provider
      value={{
        messages,
        contactoActivo,
        setContactoActivo,
        eliminarMensaje,
        agregarMensaje,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}