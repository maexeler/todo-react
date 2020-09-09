import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './TodoApp';

import {BrowserRouter as Router} from "react-router-dom"

import { StoreProvider } from 'easy-peasy'
import store from './store/StoreModel'

import {ThemeProvider } from '@material-ui/core'
// import { theme, } from './theme/materialui_themes'
// import { darkTheme } from './theme/materialui_themes'
import { customTheme } from './theme/materialui_themes'

ReactDOM.render(
  <ThemeProvider theme={customTheme} >
    <StoreProvider store={store}>
      <React.StrictMode>
        <Router>
          <TodoApp />
        </Router>
      </React.StrictMode>
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
