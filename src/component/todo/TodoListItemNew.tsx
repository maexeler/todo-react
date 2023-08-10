import React from 'react'
import { 
    Button,
    ListItem,
 } from '@mui/material'

import { useStoreActions } from "../../store/StoreModel";

const TodoListItemNew: React.FC = () => {
  const resetSelectedTodo = useStoreActions(actions => actions.todoModel.resetSelectedTodo)
  return (
    <ListItem>
      <Button
        onClick={() => { resetSelectedTodo() }}
        variant='contained' color='primary' fullWidth
      >
        Add a new ToDo
      </Button>
    </ListItem>
  )
}

export default TodoListItemNew