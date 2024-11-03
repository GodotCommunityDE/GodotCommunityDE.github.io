# LiDoc

Der Listen und Document Generator, verwendet einen abgewandelten Markdown Syntax zum Anzeigen von Webseiten.

Als Stylesheet wird Flex.css eingesetzt.
Das ermöglicht das einfache Verwenden von Spalten in einem Dokument.

Für die Darstellung von Code wird das Javascript Framework "prism" Verwendet. [__prismjs.com__](https://prismjs.com/)

Die Generation von statischen Seiten ist noch nicht implementiert.

## Markdown Syntax

### Header
```md
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```

### Fett und Unterstrichen
```md
**Fett**
__Unterstrichen__
```

### Sortierte Liste
```md
1. Erster Eintrag
2. Zweiter Eintrag
3. Dritter Eintrag
```

### Unsortierte Liste
```md
- Erster Eintrag
- Zweiter Eintrag
- Dritter Eintrag
```

### Link
```md
[Titel](https://www.example.com)
```

### Bild
```md
![alt Text](image.jpg)
```

### Absatz
- Text in einer oder mehren Zeilen wird in einem Absatz zusammengeführt.
- Vor jeder neue Zeile wird ein Zeilenumbruch erstellt.
- Eine leere Zeile beendet den Absatz.
- Ein alleinstehendes "%" in einer Zeile erzeugt eine leere Zeile innerhalb eines Absatzes.

```md
Das ist ein Absatz
mit zweiter Zeile

Das ist ein neuer Absatz.
%
mit einer Leerzeile.
```
