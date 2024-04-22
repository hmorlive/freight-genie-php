"use client"
import { createContext, useContext, useState } from 'react';

const ScrollContext = createContext();

export function useScrollBlock() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollBlock must be used within a ScrollProvider');
  }
  return context;
};

export function ScrollProvider ({ children }) {
  const [blockScroll, setBlockScroll] = useState(false);

  return (
    <ScrollContext.Provider value={{ blockScroll, setBlockScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};
