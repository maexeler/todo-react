import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './TodoApp';

import {BrowserRouter as Router} from "react-router-dom"

import { StoreProvider } from 'easy-peasy'
import store from './store/StoreModel'

ReactDOM.render(
  <StoreProvider store={store}>
    <React.StrictMode>
      <Router>
        <TodoApp />
      </Router>
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById('root')
);
