import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './TodoApp';

import {BrowserRouter as Router} from "react-router-dom"

import {StoreProvider} from 'easy-peasy'
import store from './store/StoreModel'

import {ThemeProvider} from '@material-ui/core'
// eslint-disable-next-line
import {theme, customTheme, darkTheme} from './theme/materialui_themes'

ReactDOM.render(
  <ThemeProvider theme={customTheme} > {/* use one of the above themes here */}
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
