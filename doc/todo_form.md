# ToDo's erstellen und Bearbeiten

Wir werden unsere Formulare mit Hilfe der Formik-Library erstellen und Yup für die Validierung benutzen.

Importieren Sie diese:

```
npm install formik
npm install yup
```

## Formik
Die [Formik](https://formik.org/docs/overview)-Bibliothek hilft uns bei der Erstellung von Formularen. Die drei wichtigsten Dinge die sie für uns erledigt sind:

* **Status:** Formik hilft den Formularstatus zu Verwalten und Werte in den Formularstatus hinein und wieder heraus zu bringen
* **Fehlermeldungen:** Formik hilft uns bei der Validierung und der Anzeige von Fehlermeldungen
* **Formularübermittlung:** Formik unterstützt uns bei der Formularübermittlung

Formik ist ewas ungewohnt wenn man es das erste Mal sieht. Ein gutes kurzes Tutorial in Englisch finden Sie unter [React Typescript Material UI Form](https://youtu.be/6VmVYi9yrAA)

# Ein ToDo-Formular erstellen

Wir brauchen Formular im welchem wir ToDos erstellen oder verändern können.
Erstellen Sie die Komponente [TodoForm](../src/component/todo/TodoForm.tsx) in './component/todo.

```typescript
import React from 'react'

interface TodoFormProps {
}

const TodoForm: React.FC<TodoFormProps> = (props) => {
    return (
        <span>TodoForm</span>
    )
}

export default TodoForm
```
und benuzen Sie diese in der TodoView-Komponente.

```typescript
import TodoForm from './TodoForm'

const TodoView: React.FC = () => {
    return(
        <TodoForm />
    )
}
```

## Formik verwenden
Die Formik-Komponente braucht mindestens die beiden Props ```initialValues``` (ein Objekt mit key-value Paaren) und eine ```onSubmit``` Funktion die gerufen wird wenn die Submitaktion ausgelöst wird.

Weiter erwarte sie in ihre Body eine Render**funktion** welche die Komponente zurückliefert, die angezeigt werden soll.

Formik übergiebt dieser Funktion eine Menge von Parametern, unter anderm ```values``` welche den Zustand unserer Form enthält.

Als Formularkomponente benutzen wir &lt;Form>. Als Eingabefelder innerhalb von &lt;Form> können wir &lt;Field> benutzen.
&lt;Field>s besitzen das Property ```name```. Es bindet das Feld an den passenden Wert aus ```initialValues```.

Studieren Sie den folgenden Code um zu sehen wie das Ganze Umgesetzt wird.

```typescript
const TodoForm: React.FC<TodoFormProps> = (props) => {
	return (
		// Formik has at least two properties,
		// initialValues and onSubmit
		<Formik
			initialValues={{title: ''}}
			onSubmit={() => {}}
		>
			{
			// Formik wants a funcion which returns the
			// component to be displayed
			//
			// Formik supplies a lot of properties to our funktion
			// but we are only interreted in 'values' for now
			({values}) => {
				// This usualy is a <Form> componenent
				// containing some fields and Labels
				return <Form>
					<Field
						//  Field name must match someting from initialValues
						name="title"
					/>
					{/* Let's add a <pre> to see that the <Field name="title">
					is synchronized to {values} by Formik */}
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</Form>
			}}
		</Formik>
	)
}
```
## Formik mit MaterialUI verbinden
Wir können ein MaterialUi &lt;TextField> direkt in &lt;Form> verwenden. Dazu müssen wir aber die benötigten Parameter unsere Renderfunktion anpassen. Ändern Sie ToDoForm passend ab:

```typescript
import { TextField } from '@material-ui/core'
        ...
        <Formik
			initialValues={{title: ''}}
			onSubmit={() => {}}
		>
			{({values, handleChange}) => {
				return <Form>
					<div><Field name='title' /></div>
					<div><TextField
						name = 'title'
						value = {values.title}
						onChange = {handleChange}
					/></div>
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</Form>
			}}
		</Formik>
```
Wie Sie sehen, synchronisiert Formik nun beiede Inputs mit dem internen Zustand.

&lt;TextField> ist einiges unhandlicher in der Bedienung als &lt;Field>. Idealerweise wollen wir ein &lt;Field> mit der Darstellung eines &lt;TextField>s.

Lassen Sie uns genau das implementieren. Wir programmieren uns ein 'custom field' in Formik.

```typescript
const MaterialUiField: React.FC<FieldProps & TextFieldProps> =
    ({field, form, ...textProps})
        => <TextField fullWidth {...field} {...textProps}/>
```
Wie Sie sehen, hat ein ```MaterialUiField``` sowohl die Eigenschaftet eines Formik-Fields (FieldProps) als auch die Eigenschaften eines MaterialUi-TextField (TextFieldProps) als Properties.
Von Formik kriegen wir die field- und form-Properties, alle anderen Eigenschaften sammeln wir in textProps.

Die form-Properties brauchen wir nicht, die field und textProps injizieren wir einfach in unsere Komponente.  
Wir können diese dann innerhalb eines Formik &lt;Field> als Anzeigekomponente brauchen.
```typescript
<Field
    name = 'title'
    component={MaterialUiField}
    placeholder='Enter a new ToDo'
    label='todo'
/>
```
Alle weiteren Eigenschaften welche wir in &lt;Field> definieren, werden dann in &lt;MaterialUiField> einfach an die &lt;TextField>-Komponente weitergegeben.

### Stand der Dinge
Nach etwas Aufräumen und ein wenig MaterialUi-Design sieht der Code nun folgendermassen aus:

```typescript
const TodoForm: React.FC<TodoFormProps> = (props) => {
	return (
		<Formik
			initialValues={{title: ''}}
			onSubmit={(values) => { console.log('values: ', values)}}
		>
			{() => {
				return <Form>
					<Grid container direction='column' spacing={1}>
						<Grid item >
							<Field
								name = 'title'
								component={MaterialUiField}
								placeholder='Enter a new ToDo'
								label='todo'
							/>
						</Grid>
						<Grid item >
							<Button
								type='submit'
								variant='contained' color='primary' fullWidth
							>
									Create new ToDo
							</Button>
						</Grid>
					</Grid>
				</Form>
			}}
		</Formik>
	)
}

const MaterialUiField: React.FC<FieldProps & TextFieldProps> =
    ({field, form, ...textProps})
        => <TextField fullWidth {...field} {...textProps}/>
````

## Validierung der Eingaben in Formik
Formik unterstützt uns bei der implementierung der Form-Validierung.  
Wir können die Validierungsfunktionen selber schreiben oder eine Library benutzen.  
Formik schlägt vor, die Bibliothek [Yup](https://github.com/jquense/yup) zu verwenden. Also machen wir das:
```
npm install yup -D @types/yup
```
Wir definieren uns ein Validation-Schmea
```typescript
const todoValidationSchema = Yup.object().shape({
	title: Yup.string().required('A ToDo is required'),
})
```
und benutzen dieses in Formik:
```typescript
<Formik
    ...
    validationSchema={todoValidationSchema}
    ...
>
    ...
</Formik>
```

Formik unterbricht den Submitt-Ablauf solange, wie noch Validierungsfehler bestehen.

Damit wir unseren Benutzern Fehlerhinweise anzeigen können, stellt und Formik die Properties errors und touched zur verfügung.  
Wir extrahieren diese als Parameter unser Rendererfunktion und ergänzen unser Formular um eine Fehleranzeige. Diese wird nur angezeigt, falls wir einen Fehler haben.
```typescript
<Formik
    ...
    validationSchema={todoValidationSchema}
    ...
>
    {({ errors, touched }) => {
        return <Form>
            <Grid container direction='column' spacing={1}>
                <Grid item >
                    <Field
                        ...
                    />
                    {errors.title && touched.title
                        ? (<Typography color='secondary'>{errors.title}</Typography>)
                        : null
                    }
                </Grid>
                ...
            </Grid>
        </Form>
    }}
</Formik>
```

# Die TodoForm zu Bearbeiten und Erstellen eines Todo einrichten

Wir wollen unser Formular sowohl bei der Erstellung- als auch bei der Bearbeitung eines ToDos benutzen können, aber unsere &lt;TodoForm> soll nichts davon wissen, wie sie benutzt wird.  
In beiden Fällen brauchen wir ein Todo-Objekt, welches angezeigt und bearbeitet wird. Was sich unterscheidet, ist die Funktionalität welche wir bei einem Submit auslösen und der Text welcher auf dem Submitt-Button angezeigt wird. Weiter unterscheidet sich das Formularverhalten darin, dass nach einem 'New ToDo' der Inhalt des title-Feldes gelöscht werden soll, nach einem 'Edit ToDo' nicht.

Wir brauchen als Formparameter also
* ein Todo
* ein Submit-Text
* eine Submit-Funktion
* einen Boolean, ob wir das Formular löschen müssen.

Passen Sie das Interface TodoFormProps passend an:

```typescript
interface TodoFormProps {
	todo: Todo
	submitText: string
	submitFunction(todo: Todo):void
	resetFormAfterSubmit: boolean
}
```
Anschliessend müssen wir diese Parameter im Formulat auch benutzen:
```typescript
interface TodoFormProps {
	todo: Todo
	submitText: string
	submitFunction(todo: Todo):void
	resetFormAfterSubmit: boolean
}

const TodoForm: React.FC<TodoFormProps> = (
    {todo, submitText, submitFunctionresetFormAfterSubmit}) => {
	return (
		<Formik
            ...
            initialValues={{title: todo.title}}
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
                            ...
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
```

Beachten Sie, dass {resetForm} eine Funktion ist, welche uns von Formik als Parameter beim aufruf der Submitfunktion übergeben wird.
