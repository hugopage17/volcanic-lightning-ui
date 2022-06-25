import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import Console from './ui/console';
import AppContext from './AppContext';
import useLightning from './hooks/useLightning';
import useSetTheme from './hooks/useSetTheme';
import { palette } from './colorPalette'

const App = () => {
  const { theme, setTheme } = useSetTheme();
  const darkTheme = createTheme({
    palette: {
      mode: theme ?? 'light',
      primary: { main: palette.primary },
      // secondary: palette.secondary as PaletteColorOptions
    },
  });

  const { lightning, loading, toggleLoading, error } = useLightning();

  const [selectedPanel, setPanel] = React.useState('Map')

  return (
    //@ts-ignore
    <ThemeProvider theme={darkTheme}>
      <AppContext.Provider value={{ lightning, loading, error, selectedPanel, setPanel, toggleLoading, setTheme, theme }}>
        <Console/>
      </AppContext.Provider> 
    </ThemeProvider>
  );
}

export default App;
