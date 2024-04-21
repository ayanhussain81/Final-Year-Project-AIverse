import React, { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState('');
  const [modalListeners, setModalListeners] = useState({ handleShow: undefined });

  const handleModalShow = () => {
    return modalListeners.handleShow();
  };

  return (
    <HeaderContext.Provider value={{ headerTitle, setHeaderTitle, handleModalShow, setModalListeners }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
