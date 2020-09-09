import React from 'react'

import NewTodo from './NewTodo'
import EditTodo from './EditTodo'

import { Grid } from '@material-ui/core'

const TodoView: React.FC = () => {

    return(
        <Grid container direction='column' spacing={1} >
            <Grid item ><NewTodo /></Grid>
            <Grid item ><EditTodo /></Grid>
        </Grid>
    )
}

export default TodoView