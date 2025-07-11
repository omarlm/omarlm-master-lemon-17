import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useApiContext, ApiType } from '../../../core/api-context/api-context';

export const ApiSelectorComponent: React.FC = () => {
  const { apiType, setApiType } = useApiContext();

  const handleChange = (event: SelectChangeEvent) => {
    setApiType(event.target.value as ApiType);
  };

  return (
    <FormControl variant="outlined" size="small" style={{ minWidth: 200, margin: '16px' }}>
      <InputLabel id="api-selector-label">API Source</InputLabel>
      <Select
        labelId="api-selector-label"
        id="api-selector"
        value={apiType}
        onChange={handleChange}
        label="API Source"
      >
        <MenuItem value="mock">Mock Data</MenuItem>
        <MenuItem value="rest">REST API</MenuItem>
        <MenuItem value="graphql">GraphQL API</MenuItem>
      </Select>
    </FormControl>
  );
};
