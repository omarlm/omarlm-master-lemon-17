import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos de API disponibles
export type ApiType = 'rest' | 'graphql' | 'mock';

// Interfaz para el contexto
interface ApiContextType {
  apiType: ApiType;
  setApiType: (type: ApiType) => void;
}

// Crear el contexto
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useApiContext = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext debe ser usado dentro de un ApiProvider');
  }
  return context;
};

// Props para el proveedor
interface ApiProviderProps {
  children: ReactNode;
  initialApiType?: ApiType;
}

// Componente proveedor
export const ApiProvider: React.FC<ApiProviderProps> = ({ 
  children, 
  initialApiType = 'mock' 
}) => {
  const [apiType, setApiType] = useState<ApiType>(initialApiType);

  return (
    <ApiContext.Provider value={{ apiType, setApiType }}>
      {children}
    </ApiContext.Provider>
  );
};
