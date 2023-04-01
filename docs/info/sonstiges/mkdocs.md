# MkDocs
Das ist eine Kurzbeschreibung wie MkDocs auf dieser Homepage verwendet wird

## Installation
```bash title="cmd"
pip install mkdocs-material
```


## Willkommen zu MkDocs
 
Die ganze Dokumentation befindet sich unter [mkdocs.org](https://www.mkdocs.org).



## MkDocs Befehle

* `mkdocs new [dir-name]` - Erstellt ein neues Projekt.
* `mkdocs serve` - Startet den live-reloding Dokumenten Server.
* `mkdocs build` - Erstellt die Dokumentations-Seite.
* `mkdocs -h` - Zeigt die Hilfe zu den Befehlen.



## Project layout

    mkdocs.yml    # Konfiguration Datei.
    docs/
        index.md  # Dokumentation Homepage.
        ...       # Andere Markdown Seiten, Bilder und andere Dateien.


## globale Einstellungen
Einstellungen werden im Root-Ordner in der Datei `mkdocs.yml` gemacht.



## Datei-URL's statt Ordner-URL's
```yaml title="mkdocs.yml"
use_directory_urls: false
```
Mit dieser Einstellung werden Die dateien direkt mit `.html`-Endung angesprochen,  
und nicht als Ordner.  
Damit wird die Struktur 1:1 so abgebildet wie die Struktur der Markdown-Dateien erstellt worden ist.




## Theme material
### Installation
```bash title="cmd"
pip install mkdocs-material
```

### Material Homepage
[squidfunk.github.io/mkdocs-material](https://squidfunk.github.io/mkdocs-material/)


### Aktivieren/ Konfigurieren
```yaml title="mkdocs.yml"
theme: 
  name: material 
  language: de
  palette: 
    primary: blue grey  
    - scheme: default
      toggle:
        icon: material/toggle-switch-off-outline 
        name: Switch to dark mode
    - scheme: slate 
      toggle:
        icon: material/toggle-switch
        name: Switch to light mode
``` 
Diese Einstellung verwendet das Layout `material`,  
und es kann zwischen einem "normalen" und "dunklen" Modus umgeschalten werden.



## Code Syntax Hervorhebung
```yaml title="mkdocs.yml"
markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences  # Für Tabs zum Wechseln
```

Diese Erweiterung verbessert das Anzeigen von Code-Blöcken.  
Damit lassen sich Titel und Zeilennummer im Code-Block anzeigen.  
```md
``` gd title="meineDatei.gd" linenums="1"
var x = 1

func _ready():
	pass
```
erstellt
```gd title="meineDatei.gd" linenums="1"
var x = 1

# wird ausgeführt wenn fertig geladen
func _ready():
	pass

func _progress(delta) -> void:
  pass

```

## Blog Beitrag
Bei einem Blog Beitrag soll folgender Header im MarkDown eingegeben werden
``` yaml title="Blog Header"
---
title: Neue Homepage
description: Eine neue Homepage basierend auf mkDocs
date: "2021-03-21 00:00:00"
---
```



## Eigene CSS-Styles
```yaml title="mkdocs.yml"
extra_css:
  - css/meincss.css

markdown_extensions:
  - attr_list
```

Mit dieser Einsellung können eigene Styles eingebunden,  
und verwendet werden.

Um zum Beispiel die Style-Klasse "green" einem Absatz hinzuzufügen:
``` md title="mein_dokument.md"

Das ist mein Text in grün.
{ .green }

```

Das ist mein Text in grün.
{ .green }



Das ist Links  
mit 2 Zeilen
{ .left }

Und der Rest



## Tabs zum wechseln
```yaml title="mkdocs.jml"
markdown_extensions:
  - pymdownx.tabbed:
      alternate_style: true 
```

Damit können Tabs für Code, und auch andere Inhalte erstellt werden.

``` title="meine_datei.md"
=== "C"

    ``` c title="meine_datei.c"
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"

    ``` c++ title="meine_datei.c"
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```
```
erstellt
=== "C"

    ``` c title="meine_datei.c"
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++" 

    ``` c++ title="meine_datei.c"
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```


## Info-Blöcke
```yaml title="mkdocs.yml"
markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
```

Estellt hervorgehobene Blöcke
```md title="meine_datei.md"
!!! note "Titel"
	Dier Block muss Eingerückt sein
	um richtig angezeigt zu werden
```

!!! tip "Tipp: Titel anzeigen/ verbergen"
	Und es kann auch ein Titel angegeben werden.  
	Soll kein Titel angezeigt werden, wird ein `""` Leerstring angegeben.

Folgende Blöcke(Bezeichner) sind möglich.  

- note  
- abstact  
- info  
- tip  
- success  
- question  
- warning  
- failure  
- danger  
- bug  
- example  
- quote  


!!! note
	Das ist ein Hinweis

!!! warning
	Das ist eine Warnung

!!! failure
	Das ist ein Fehler

!!! success
	Das ist OK

!!! question
	Das ist eine Frage

!!! info
	Das ist eine Info

!!! tip
	Das ist ein Tip




## Text hervorheben, markieren
``` yaml title="mkdocs.yml"
markdown_extensions:
  - pymdownx.critic
  - pymdownx.caret
  - pymdownx.keys
  - pymdownx.mark
  - pymdownx.tilde
```

Mit diesen Erweiterungen kann ein Text einfacher Markiert und hervorgehoben werden.

```html title="meine_datei.md"
{ ==
Dieser Absatz wird hervorgehoben
==}
```
erstellt

{==
Dieser Absatz wird hervorgehoben
==}


### Tastatur Codes
``` title="meine_datei.md"
++ctrl+alt+del++
```
erstellt

++ctrl+alt+del++

## Meta
```yaml title="mkdocs.yml"
markdown_extensions:
  - meta                      
```

Im Header angegeben, wird das Menü in diesem Dokument versteckt.
``` title="mein_dokument.md"
---
hide:
    - navigation
    - toc
---
```
