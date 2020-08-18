import React from 'react'
import AppLayout from './components/application/AppLayout'
import TodoHeader from './components/todo/TodoHeader'
import TodoPage from './components/todo/TodoPage'


const TodoApp: React.FC = () => {
  return (
    <AppLayout 
      header = {<TodoHeader />}
      body = {<TodoPage />}
    />
    );
}

export default TodoApp;
