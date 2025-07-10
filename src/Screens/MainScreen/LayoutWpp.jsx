import React, { useState, useEffect, useContext } from 'react';
import ContactsList from "../../Components/ContactList/ContactsList";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './LayoutWpp.css';
import { FcCallback, FcVideoCall } from "react-icons/fc";
import { CiMenuBurger } from "react-icons/ci";
import { ContactContext } from "../../Context/ContactContext";
import { ChatContext } from "../../Context/ChatContext";


export default function LayoutWpp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { contacts } = useContext(ContactContext);
  const { contactoActivo } = useContext(ChatContext);

  const contacto = contacts.find(c => c.name === contactoActivo);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = () => {
    if (location.pathname.startsWith('/contact-info')) {
      navigate(`/chat/${contacto?.id}`);
    } else {
      navigate('/');
    }
  };

  const handleContactInfo = () => {
    if (contacto) {
      navigate(`/contact-info/${contacto.id}`, { state: { fromChat: true } });
    }
  };

  // Nueva lógica para mostrar/ocultar contactos
  const shouldShowContacts = () => {
    if (!isMobile) return true;
    return !location.pathname.startsWith('/chat') && !location.pathname.startsWith('/contact-info');
  };

  return (
    <div className="layout-wpp">
      {(shouldShowContacts() || !isMobile) && (
        <aside className={`sidebar ${isMobile ? (shouldShowContacts() ? "mobile-full" : "hidden") : ""}`}>
          <ContactsList />
        </aside>
      )}

      {(!shouldShowContacts() || !isMobile) && (
        <main className={`main-chat ${isMobile ? (shouldShowContacts() ? "hidden" : "mobile-full") : ""}`}>
          {contacto && (
            <div className="mobile-header">
              {isMobile && (
                <button className="back-button" onClick={handleBack}>←</button>
              )}
              <div 
                className="contact-info" 
                onClick={handleContactInfo}
                style={{ cursor: 'pointer', flex: 1 }}
              >
                <img src={contacto.img} alt={contacto.name} className="avatar" />
                <span className="contact-name">{contacto.name}</span>
              </div>
              <div className="header-icons">
                <span><FcCallback /></span>
                <span><FcVideoCall /></span>
                <span><CiMenuBurger /></span>
              </div>
            </div>
          )}
          <Outlet />
        </main>
      )}
    </div>
  );
}