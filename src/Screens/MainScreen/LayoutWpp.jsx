import React, { useState, useEffect, useContext } from 'react';
import ContactsList from "../../Components/ContactList/ContactsList";
import { Outlet, useLocation } from 'react-router-dom';
import './LayoutWpp.css';
import { FcCallback, FcVideoCall } from "react-icons/fc";
import { CiMenuBurger } from "react-icons/ci";
import { ContactContext } from "../../Context/ContactContext";
import { ChatContext } from "../../Context/ChatContext";

export default function LayoutWpp() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showContacts, setShowContacts] = useState(true);
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

  useEffect(() => {
    if (isMobile) {
      if (location.pathname.startsWith("/chat")) {
        setShowContacts(false);
      } else {
        setShowContacts(true);
      }
    }
  }, [location, isMobile]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="layout-wpp">
      {(showContacts || !isMobile) && (
        <aside
          className={`sidebar ${
            isMobile ? (showContacts ? "mobile-full" : "hidden") : ""
          }`}
        >
          <ContactsList />
        </aside>
      )}

      {(!showContacts || !isMobile) && (
        <main
          className={`main-chat ${
            isMobile ? (showContacts ? "hidden" : "mobile-full") : ""
          }`}
        >
          
          {contacto && (
            <div className="mobile-header">
              {isMobile && (
                <button className="back-button" onClick={handleBack}>←</button>
              )}
              <div className="contact-info">
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