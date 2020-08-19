import React from 'react'
import { List, ListItem } from '@material-ui/core'

import TodoListItem from './TodoListItem'

const TodoList: React.FC = () => {
    return(
        <List>
           <TodoListItem />
           <TodoListItem />
           <TodoListItem />
        </List>
    )
}

export default TodoList