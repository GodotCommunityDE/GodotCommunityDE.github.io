# Neue godot-community.de Homepage
https://www.godot-community.de (mit mkDocs gebaut)

## Wie kann ich mithelfen?
Beiträge schreiben, Infos und Tools einfügen, etc. - am Besten ` maurehago` auf Discord in unserem Community Discord Server fragen.

## Wie kann ich meine Änderungen sehen?

2 Möglichkeiten

### Ich installiere mkDocs am Computer
```
pip install mkdocs mkdocs-material
```

### Ich möchte es in einer virtuellen Umgebung haben

Vorraussetzung: `python-venv`
```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---
Sobald ihr mkdocs + mkdocs-material installiert habt könnt ihr die Seite mit dem Befehl `mkdocs serve` interaktiv starten, bei Änderungen wird die Seite aktualisiert. Diese sollte unter "http://127.0.0.1:8000" verfügbar sein - ansonsten bitte die Ausgabe bei `mkdocs serve` anschauen.
```
(venv) ➜  homepage git:(main) ✗ mkdocs serve                      
INFO     -  Building documentation...
INFO     -  Cleaning site directory
INFO     -  Documentation built in 0.29 seconds
INFO     -  [15:02:06] Serving on http://127.0.0.1:8000/
INFO     -  [15:02:09] Browser connected: http://127.0.0.1:8000/index.html
```

## Neue Module

Solltet ihr neue Module hinzufügen (mit pip install) dann bitte diese auch in die requirements.txt miteintragen!
Am leichtesten geht das wenn du eine virtuelle Umgebung hast, dann kannst du einfach `pip freeze > requirements.txt` machen.

