import React from 'react';
import { ThemeProviderComponent } from '#core/theme';
import { RouterComponent } from '#core/router';
import { ApiProvider } from './core/api-context/api-context';
import { ApiSelectorComponent, ApiIndicatorComponent } from './common/components';

const App: React.FunctionComponent = () => {
  return (
    <>
      <ApiSelectorComponent />
      <RouterComponent />
      <ApiIndicatorComponent />
    </>
  );
};

const AppProviders: React.FunctionComponent = () => {
  return (
    <ThemeProviderComponent>
      <ApiProvider initialApiType="mock">
        <App />
      </ApiProvider>
    </ThemeProviderComponent>
  );
};

export default AppProviders;
