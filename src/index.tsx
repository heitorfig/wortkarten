import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#1976d2',
    }
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          pointerEvents: 'none',
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          pointerEvents: 'initial',
          justifyContent: 'center'
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          fontWeight: 700,
          pointerEvents: 'none',
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none'
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          paddingTop: 16,
          pointerEvents: 'none',
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none'
        }
      }
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
