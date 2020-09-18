import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { Router } from 'react-router';
import history from './history';
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
