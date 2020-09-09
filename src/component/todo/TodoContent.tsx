import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import TodoList from './TodoList'
import TodoView from './TodoView'

const TodoContent: React.FC = () => {
    return (
        <Paper>
        <Grid container direction='row' spacing={1}>
            <Grid item xs={12} sm={4}>
                <TodoList />
            </Grid>
            <Grid item xs={12} sm={8}>
                <TodoView />
            </Grid>
        </Grid>
        </Paper>
    )
}

export default TodoContent