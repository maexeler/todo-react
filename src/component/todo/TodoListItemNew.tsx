import React from 'react'
import { 
    Button,
    ListItem, 
    ListItemIcon, 
    IconButton,
    Typography,
 } from '@mui/material'
 import AddIcon from '@mui/icons-material/Add';

import Todo from '../../model/todo'
import { useStoreActions } from "../../store/StoreModel";

interface TodoListItemProps {
    todo: Todo;
}

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