import React, { ReactNode, useEffect } from 'react';
import { useDataStore } from '../store/dataStore';
import { useAppStore } from '../store/appStore';

interface AppContextType {
  // Will add specific methods as needed
}

export const AppContext = React.createContext<AppContextType>({});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const restoreData = useDataStore(state => state.restoreData);
  const restoreState = useAppStore(state => state.restoreState);

  useEffect(() => {
    restoreData();
    restoreState();
  }, []);

  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
