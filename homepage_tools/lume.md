---
layout: layouts/main.vto
title: Lume Site Generator
---

"Lume" benötigt zum Ausführen die Javascript Runtime "Deno".
Es muss also "Deno" vor dem Verwenden von "Lume" installiert sein.

## Installation Deno
### Windows
```powershell
irm https://deno.land/install.ps1 | iex
```
### Linux
```powershell
curl -fsSL https://deno.land/install.sh | sh
```
### macOS
```powershell
curl -fsSL https://deno.land/install.sh | sh
```
## Lume Initialisieren
Lume Init im Arbeits-Ordner
```powershell
deno run -Ar https://deno.land/x/lume/init.ts
```

## Die Seite erstellen
```powershell
deno task lume
```

## Lokalen Server erstellen
```powershell
deno task serve
```
oder
```powershell
deno task lume --serve
```

## Hilfe anzeigen
Zeigt alle verfügbaren Befehle an
```powershell
deno task lume -h
```
