# Aufräumen des Generierten Codes
Als erstes löschen wir alle nicht benötigten Dateien.

- App.css
- App.test.tsx
- logo.svg
- serviceWorker.ts
- setupTests.ts

Öffnen Sie [App.tsx](../src/App.tsx) und ersetzen Sie das vorhandene div mit folgendem Header-Tag:
```
# Todo Application
```
Löschen Sie die Importe für 'logo.svg' und 'App.css' in App.tsx

Öffnen Sie dann [index.tsx](../src/index.tsx) und entfernen Sie allen Code mit ServiceWorker.

# Konfigurieren der Browser Information
Im Ordner public können die Browserinformationen wie Icons etc. angepasst werden.

Setzen Sie zumindest den Titel in der Datei [index.html](../public/index.html) zu ToDo Application.</br>
Wir werden später auf diese Datei zurück kommen um benötigte CSS-Dateien einzufügen.

| Previous | Home | Next  |
| -------- |:----:| -----:|
| <- [Das generierte Projekt anpassen](./setup_project.md) | [Inhaltsübersicht](./setup_project.md) | [Git](./git.md) ->