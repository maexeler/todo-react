import React from 'react'
import { List, ListItem } from '@material-ui/core'

import TodoListItem from './TodoListItem'
import todoList from '../../repository/simple_todo_repository'

const TodoList: React.FC = () => {
    return(
        <List>
            {todoList.map((todo) => 
                {return <TodoListItem todo={todo}/>}
            )}
        </List>
    )
}

export default TodoList