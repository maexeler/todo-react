import React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import { TextField, TextFieldProps, Button, Grid, Typography } from '@material-ui/core'
import * as Yup from "yup"

import Todo from '../../model/todo'

interface TodoFormProps {
	todo: Todo
	submitText: string
	submitFunction(todo: Todo):void
	resetFormAfterSubmit: boolean
}

const TodoForm: React.FC<TodoFormProps> = ({todo, submitText, submitFunction, resetFormAfterSubmit}) => {
	return (
		<Formik
			initialValues={{title: todo.title}}
			validationSchema={todoValidationSchema}
			onSubmit={(values, {resetForm}) => {
				todo.title = values.title
				submitFunction(todo)
				if (resetFormAfterSubmit) { resetForm() }
			}}
		>
			{({ errors, touched }) => {
				return <Form>
					<Grid container direction='column' spacing={1}>
						<Grid item >
							<Field
								name = 'title'
								component={MaterialUiField}
								placeholder='Enter a new ToDo'
								label='todo'
							/>
							{errors.title && touched.title
								? (<Typography color='secondary'>{errors.title}</Typography>)
								: null
							}
						</Grid>
						<Grid item >
							<Button
								type='submit'
								variant='contained' color='primary' fullWidth
							>
									{submitText}
							</Button>
						</Grid>
					</Grid>
				</Form>
			}}
		</Formik>
	)
}

const MaterialUiField: React.FC<FieldProps & TextFieldProps> =
	({field, form, ...textProps}) => <TextField fullWidth {...field} {...textProps}/>

const todoValidationSchema = Yup.object().shape({
	title: Yup.string().required('A ToDo is required'),
})

export default TodoForm