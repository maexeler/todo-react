import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'

const TodoHeader: React.FC = () => {
    return (
        <div>
            <h1>ToDo Application</h1>
            <ul>
                <li><a href='/todo'>TodoPage</a></li>
                <li><a href='/about'>AboutPage</a></li>
            </ul>
        </div>
    )
}

export default TodoHeader