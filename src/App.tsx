import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { Router } from 'react-router';
import history from './history';
import AppLayout from './layout/components/AppLayout';
import { Provider } from 'react-redux';
import {store} from './store'

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
    <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppLayout />
      </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
