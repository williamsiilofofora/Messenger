import React from 'react';
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
// import Button from '@material-ui/core/Button';
import { Router } from 'react-router';
import AppContent from './layout/AppContent';

import history from './history';
import AppMenu from './layout/AppMenu';
import { dark } from '@material-ui/core/styles/createPalette';
import AppLayout from './layout/AppLayout';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#43a047",
      contrastText: "white"
      
    },
    secondary: yellow,
  },
});



function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppLayout />
      </ThemeProvider>
    </Router>
  );
}

export default App;
