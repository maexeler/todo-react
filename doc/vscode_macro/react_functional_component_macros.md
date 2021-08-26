# Macros in Visual Studio
Immer denselben Code schreiben macht kein Spass. Lassen sie uns ein 'Side Project' starten. Wir erstellen zwei Macros um in Visual Studio Code zu generieren.

## Snippets in Visual Studio Code
In Visual Studio Code können wir [Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) erstellen. Snipets werden in IntelliSense angezeigt und können Code generieren.

## Ein Snipet generieren
* Wählen sie in vscode File->Preferences->User Snipets
* anschliessend wählen sie typescriptreact als Sprache
Es öffnet sich eine passende Datei.

# Beispiel Code
Stellen sie sich vor, dass wir den folgenden Code generieren wollen:
```typescript
import React from 'react';

const TodoView: React.FC = () => {
    return (
        <span>TodoView</span>
    );
}

export default TodoView
``` 
## Code generieren
Das Einzige was sich ändert wenn wir eine weitere Komponente bauen wollen ist das Wort ```TodoView```. Wir werden das Wort ```TodoView``` also durch einen Platzhalter ersetzen.

```typescript
import React from 'react';

const ${0:component}: React.FC = () => {
    return (
        <span>${0:component}</span>
    );
}

export default ${0:component}
```

Als nächstes müssen wir den Code so aufbereiten, dass er als Array von Strings besteht.
Wir fassen dazu jede Zeile in Anführungszeichen ein und schliessen alle Zeilen ausser der Letzten mit einem Komma ab.

```typescript
"import React from 'react';",
"",
"const ${0:Name}: React.FC = () => {",
"    return (",
"        <span>${0:Name}</span>",
"    );",
"}",
"",
"export default ${0:Name}"
```
Ok, perfekt, den Teil für die Codegenerierung haben wir fertig.

## Snippet erstellen
Eine Snipetsammlung ist ein JSON-Objekt mit dem folgenden Aufbau:
```json
{
	"long name": {
		"prefix": "short name",
		"body": [
			"list of strings to generate code"
		],
		"description": "a description of the snippet functionality"
	},
    "may have more snipets here": { ... }
}
```

Wir wollen ein 'React Functional Component' bauen und dazu die Abkürzung 'rfc' benutzen was zu folgendem Code führt:
```json
{
	"React Functional Component": {
		"prefix": "rfc",
		"body": [
"import React from 'react';",
"",
"const ${0:Name}: React.FC = () => {",
"    return (",
"        <span>${0:Name}</span>",
"    );",
"}",
"",
"export default ${0:Name}"
		],
		"description": "Create a React Functional Component without properties"
	},
}
```

Und hier, einfach nur so zum Spass, noch ein Komponentensnipet mit Properties:
```json
	"Create React Functional Component with Properties": {
		"prefix": "rfcp",
		"body": [
			"import React from 'react'",

			"\ninterface ${1:Name}Props {}",

			"\nconst ${1:Name}: React.FC<${1:Name}Props> = (props) => {",
			"\treturn (",
					"\t\t<span>${1:Name}</span>",
				"\t)",
			"}",

			"\nexport default ${1:Name}"
		],
		"description": "Create a React functional component with properties"
	},
```
