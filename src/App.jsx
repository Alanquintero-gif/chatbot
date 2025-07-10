import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import LayoutWpp from './Screens/MainScreen/LayoutWpp';
import ContactDetailScreen from './Screens/ContactDetailScreen/ContactDetailScreen';
import Loader from './Components/Loader/Loader';
import ContactInfoScreen from './Components/ContactInfoScreen/ContactInfoScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<LayoutWpp />}>
        <Route path="chat/:id" element={<ContactDetailScreen />} />
        <Route path="contact-info/:id" element={<ContactInfoScreen />} />
      </Route>
    </Routes>
  );
}

export default App;