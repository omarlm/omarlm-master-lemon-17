import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useApiContext, ApiType } from '../../../core/api-context/api-context';

// Estilos y colores para cada tipo de API
const getApiStyleAndInfo = (apiType: ApiType) => {
  switch (apiType) {
    case 'mock':
      return {
        color: '#ff9800', // Naranja
        backgroundColor: '#fff3e0',
        label: 'Mock Data',
        description: 'Usando datos estáticos locales'
      };
    case 'rest':
      return {
        color: '#2196f3', // Azul
        backgroundColor: '#e3f2fd',
        label: 'REST API',
        description: 'Conectado al servidor mock local'
      };
    case 'graphql':
      return {
        color: '#e91e63', // Rosa
        backgroundColor: '#fce4ec',
        label: 'GraphQL API',
        description: 'Conectado a la API oficial de Rick and Morty'
      };
    default:
      return {
        color: '#9e9e9e',
        backgroundColor: '#f5f5f5',
        label: 'Desconocido',
        description: 'Fuente de datos desconocida'
      };
  }
};

export const ApiIndicatorComponent: React.FC = () => {
  const { apiType } = useApiContext();
  const { color, backgroundColor, label, description } = getApiStyleAndInfo(apiType);

  return (
    <Paper 
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 15px',
        borderRadius: '8px',
        backgroundColor,
        borderLeft: `4px solid ${color}`,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color }}>
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};
