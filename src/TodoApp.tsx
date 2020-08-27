import React from 'react'
import AppLayout from './component/application/AppLayout'
import TodoHeader from './component/todo/TodoHeader'
import TodoPage from './component/todo/TodoPage'
import AboutPage from './component/about/AboutPage'
import PageNotFoundPage from './component/notfound/PageNotFoundPage'

import { useTodoInitDataHook } from './model/todo_data_int_hook'

import { useLocation } from 'react-router-dom'

const TodoApp: React.FC = () => {
  useTodoInitDataHook()

  let body = <PageNotFoundPage />
  switch (useLocation().pathname) {
    case '/':      { body = <TodoPage />;  break }
    case '/todo':  { body = <TodoPage />;  break }
    case '/about': { body = <AboutPage />; break }
  }
  return (
    <AppLayout 
      header = {<TodoHeader />}
      body = {body}
    />
    );
}

export default TodoApp