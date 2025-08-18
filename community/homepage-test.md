# Homepage lokal testen
Um die Homepage lokal am eigenen Rechner testen zu können, wird ein Webserver benötigt.
Das Projekt von der GitHUB Homepage liefert einen einfachen Webserver mit aus.


## Test Server mit Bun
Um das Projekt lokal testen zu können, ist ein einfacher Webserver mit dabei.
Dieser Server ist in der Programmiersprache Javascript geschrieben, und kann mit der Javascript Runtime "Bun" ausgeführt werden. 

### Installation von Bun
Windows:
```shell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Linux & macOS
```shell
curl -fsSL https://bun.sh/install | bash
```

### Ausführen
Um den Testserver zu starten, einfach folgenden Code im "/" Ordner der Homepage ausführen: 

```shell
bun lib/server/bunserver.js
```
Danach kann der Server über die URL **http://localhost:8080** aufgerufen werden.
Die Zahl hinter dem Doppelpunkt(:) bestimmt den angegebenen Port.

#### anderen Port angeben
Der Server wird standardmäßig mit dem Port 8080 gestartet.
Auf Wunsch kann mit dem Parameter --port (oder -p) ein anderer Port mit angegeben werden.

```shell
bun lib/server/bunserver.js -p 8090
```
