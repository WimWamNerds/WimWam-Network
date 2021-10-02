import React from 'react';
import usePersistedState from './utils/usePersistedState';

import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components';
import light from './styles/light';
import dark from './styles/dark';

import Layout from './layouts';
import Pages from './pages';
import Reset from './styles/reset';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <Layout toggleTheme={toggleTheme}>
        <Pages />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
