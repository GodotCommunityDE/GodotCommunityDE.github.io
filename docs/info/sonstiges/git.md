# Git und GitHUB

## Übersicht
![git Befehle](git-befehle.png)


## Projekt Fork erstellen



## Git Clone
$ git clone https://github.com/{USERNAME}/{PROJECT}


## in Projekt-Ordner wechseln
```
cd {Project}
```

## Upstream Setzen

```
git remote add upstream https://github.com/{ORIGUSER}/{PROJECT}  
git fetch upstream
```

## Entwicklungs-Branch erstellen
1. Erzeuge einen Branch vom aktuellen Branch (main)
2. Ändere den Branch zu dem neuen Branch

```
git branch {mein-branch}
git checkout {mein-branch}
```
oder erzeugen und auschecken in einem
```
git checkout -b {mein-branch}
```

## Update den Branch regelmäßig
Es sollte regelmäßig der letzte Stand des Projektes in den eigenen Branch integriert werden,
um mögliche Merge-Konflikte frühzeitig zu Erkennen und Auszubessern. 

Sichere Methode
```
git fetch upstream
git merge upstream/main
```

Unsichere Methoden - Merge wird direkt ausgeführt.  
Dafür ist dann der Index linearer.
```
git pull --rebase upstream main  
(bei Fork)
```

oder
```
git pull --rebase origin main  
(wenn im eigenen Projekt)
```

bei Konflikten:  
Auflisten von Konflikten
```
git status
```

Fehler beheben  
und danach wieder in den Index(stage)  
``` 
git add {ausgebesserte Datei}
```

neuer Commit (bei sicherer Methode)
```
git commit -m "mein Text zur Ausbesserung"
```

und "rebase" fortsetzen (bei unsicherer Methode)
```
git rebase --continue  
```

## Änderungen auf den Server pushen
```
git push origin mein-branch
```

## Pull Request erzeugen  
auf der GitHUB Page

## Änderungen NACH Pull Request
Wenn der Pull Request nicht angenommen wird oder noch Fehler im Pull Request ausgebessert werden müssen.
```
git checkout {mein-branch}
```
Änderungen  
und dann commit erstellen
```
git add .
git commit -m "meine neuen Änderungen"
```

Änderungen auf dem Server aktualisieren
```
git push origin {mein-branch}
(Updatet den Pull-Request)
```

## Pull Request lokal abrufen
Für den Projekt Besitzer des Originalen Projektes.
Um den Pull-Request zu Prüfen oder lokal zu Mergen.

ID Ermitteln, ist die Nummer nach den Titel des Pull Requests  
(Titel #12345)

```
git fetch origin pull/{ID}/head:{BRANCH_NAME}  
({BRANCH_NAME} ist ein Neuer Branch Name) 
```

Neuer Branch kann wie ein normaler Branch verwendet werden  
```
git checkout {BRANCH_NAME}
```
oder  
```
git merge {BRANCH_NAME}
```

