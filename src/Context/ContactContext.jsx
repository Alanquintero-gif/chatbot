import { createContext, useState } from "react";



export const ContactContext = createContext({
    contacts: []
})

const ContactContextProvider = ({children}) => {
    const [contacts, setContacts] = useState(
        [
            {
                id: 1,
                name: 'Pop ✅',
                last_time_connected: '14:19',
                img: "https://localo.com/es/assets/img/definitions/what-is-bot.webp",
                last_message: {
                  id: 1,
                  text: "Hola, Rubito 😊..."
                },
                unread_messages: 1
              }
              
        ]
    )


    return (
        <ContactContext.Provider
            value={
                {
                    contacts: contacts
                }
            }
        >
            {children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider