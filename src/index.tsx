import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import TodoApp from './TodoApp';

import {StoreProvider} from 'easy-peasy'
import store from './store/StoreModel'

import {ThemeProvider} from '@mui/material'
// eslint-disable-next-line 
import {theme, themeDark, themeCustom, } from './theme/materialui_themes'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <ThemeProvider theme={theme} > {/* use one of the above themes here */}
    <StoreProvider store={store}>
      <React.StrictMode>
        <Router>
          <TodoApp />
        </Router>
      </React.StrictMode>
    </StoreProvider>
  </ThemeProvider>,
);
