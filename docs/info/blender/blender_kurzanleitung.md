# Blender 3.1 Kurzanleitung Objekte Editieren

Grundsätzlich wirken die Tasten in jeweils dem Editor, in dem sich der Mauszeiger befindet!

Im 3D-View-Fenster gibt es eine Sicht, welches die Ansicht liefert und eine oder mehrere Kameras,
dessen Bild später gerendert werden kann.

## Generell

### Ansicht

<kbd>Num 1</kbd> = Vorderansicht -Y  
<kbd>Num 3</kbd> = Seitenansicht -X  
<kbd>Num 7</kbd> = Draufsicht   
<kbd>Num 9</kbd> = inverse Ansicht (aktuelle Sicht)   
<kbd>Strg</kbd> + <kbd>Num 1</kbd> / <kbd>Num 1</kbd> / <kbd>Num 1</kbd> = inverse Ansicht  
<kbd>Num 5</kbd> = Perspektive / orthografisch 

<kbd>ö</kbd> = View - Sichtauswahl als (Kreismenü)

<kbd>Scrollrad</kbd> oder <kbd>Num +</kbd> / <kbd>Num -</kbd> = Zoom  

<kbd>Shift</kbd> + <kbd>MMT</kbd> = Sicht horizontal und vertikal verschieben  
<kbd>MMT</kbd> = Sicht drehen  

<kbd>Strg</kbd> + <kbd>Alt</kbd> + <kbd>q</kbd> = Vierfensteransicht 

<kbd>Num ,</kbd> = Selektiertes Objekt Im Zentrum (Drehpunkt) und optimales heranzoomen.  
<kbd>shift</kbd> + <kbd>c</kbd> = zoomt soweit raus, bis alle Objekte im Bild zu sehen sind

<kbd>z</kbd> = Shading - Anzeigemodus (Kreismenü)

#### Kamera
<kbd>0</kbd> = Sicht aus Kamera  
<kbd>Strg</kbd> + <kbd>Alt</kbd> + <kbd>0</kbd> = Kamera auf Sichtposition

#### Ausblenden
<kbd>u</kbd> = Hide Selected (ausgewähltes Ausblenden)  
<kbd>Shift</kbd> + <kbd>h</kbd> = Hide Unselected (nicht ausgewähltes Ausblenden)  
<kbd>Alt</kbd> + <kbd>u</kbd> = Show Hidden (Ausgeblendetes wieder Einblenden)  

<kbd>Alt</kbd> + <kbd>b</kbd> = Bereich selektieren, danach ist nur dieser sichtbar / Tastenkombi nochmals, alles wieder sichtbar

<kbd>#</kbd> = User Perspective Lokal (Zoomt an selektiertes Objet heran und blendet alle anderen Objekte aus) nochmaliges drücken macht den Vorgang rückgängig.

#### Fly & Walk Mode
<kbd>Shift</kbd> + <kbd>ö</kbd> = Fly & Walk Mode  

+ <kbd>TAB</kbd> = wechselt in den Walk Mode (Kamera fällt auf Augenhöhe)
+ <kbd>w</kbd> / <kbd>a</kbd> / <kbd>s</kbd> / <kbd>d</kbd> = Bekannte Steuerung
+ <kbd>q</kbd> / <kbd>e</kbd> = Hoch & Runter
+ <kbd>Shift</kbd> + <kbd>w</kbd> / <kbd>a</kbd> / <kbd>s</kbd> / <kbd>d</kbd> / <kbd>q</kbd> / <kbd>e</kbd> = Schnellere Bewegung

+ <kbd>Mausbewegung</kbd> = Sichtrichtung

### Selektieren

<kbd>LMT</kbd> = selektieren  
<kbd>Shift</kbd> + <kbd>LMT</kbd> = mehrfach selektieren

<kbd>a</kbd> = alles selektieren  
<kbd>Alt</kbd> + <kbd>a</kbd>  = deselektieren  

<kbd>c</kbd> = Auswahlpinsel  
<kbd>b</kbd> = Rechteckauswahl  
<kbd>w</kbd> = wechseln des Auswahlmode  

### Editieren

<kbd>g</kbd> = bewegen  
<kbd>s</kbd> = skalieren  
<kbd>r</kbd> = rotieren  

**Anschließend** wenn Achsen für Aktion beschränkt sein sollen    
<kbd>x</kbd> / <kbd>y</kbd> / <kbd>Z</kbd> = Aktion auf jeweiliger Achse  
<kbd>Shift</kbd> + <kbd>x</kbd> / <kbd>y</kbd> / <kbd>Z</kbd> = Aktion nur den anderen beiden Achsen   

<kbd>Shift</kbd> + <kbd>RMT</kbd> = setzt Cursor auf Mausposition

### Vorgänge
<kbd>Strg</kbd> + <kbd>z</kbd> = Undo Letzte Aktion Rückgängig  
<kbd>shift</kbd> + <kbd>Strg</kbd> + <kbd>z</kbd> = Redo Letzte Aktion wieder herstellen

<kbd>RMT</kbd> = Abbruch eines Vorgangs im Bearbeitungsmodus  

<kbd>Shift</kbd> + <kbd>r</kbd> = wieder holen des letzten Vorgangs

#### Schnelltaste (Liste)

Alle Funktionen aus den Menüs können über <kbd>RMT</kbd> und dem sich dann öffnenden Pulldown Menü mit dem Menüpunkt (Add to Quick Favorites) in diese Liste aufgenommen werden

<kbd>q</kbd> = Quick Favorites ruft diese Liste zum auswählen der Funktion auf

### Sonstiges

<kbd>TAB</kbd> = wechsel zwischen Edit und Objekt mode

<kbd>t</kbd> = Toolbar  
<kbd>n</kbd> = Sidebar  

<kbd>F9</kbd> = Funktionsfenster öffnen - letzte Funktion  
<kbd>F2</kbd> = Rename Objekt  
<kbd>F3</kbd> = Suchen  
<kbd>F4</kbd> = File Context Menü  
 
<kbd>o</kbd> = Proportional Editing an/aus 

<kbd>,</kbd> = Orientation (Kreismenü)  
<kbd>.</kbd> = Pivot Point (Kreismenü)  
<kbd>Shift</kbd> + <kbd>s</kbd> = Snap (Kreismenü)  
<kbd>Shift</kbd> + <kbd>o</kbd> = Proportional Editing Falloff  (Kreismenü)   

### Asset Browser
Objekte hinzufügen:   
Im Editor (Outliner) Objekt mit <kbd>RMT</kbd> auswählen Dialogmenü(Object) => Menüpunkt(Mark as Asset)

Material hinzufügen:
Im Editor (Properties) => Reiter(Materialeigenschaften)  => 
Materialliste => <kbd>RMT</kbd> Dialogmenü(Active Material Index) => Menüpunkt(Mark as Asset)

Auf der linke Seite des Editors (Asset Browser) befindet sich eine Listbox in der z.Z. „Current File“ ausgewählt ist, also in der Aktuellen Datei. Somit sind die Assets lediglich in dieser Blender-Datei verfügbar.

Unter Hauptmenü(Edit) => Menüpunkt(Preferences) => Dialogfenster(Blender Preferences) => Button(File Paths) => Panel(Asset Libraries) kannst du Namen und Path zu den Blender-Dateien angeben, welche Assets enthalten 
sollen. 

Speicherst du eine oder mehrere Blender-Dateien mit Assets in diesem Verzeichnis, kannst du diese in allen künftigen Blender-Projekten unter:  
Editor (Asset Browser) => Listbox () unter dem gespeicherten Namen auswählen.

In dem darunterliegenden Panel kannst du für die Assets Kategorien anlegen und die Assets in diese verschieben.

## Objekt Mode

### Objekte

<kbd>Shift</kbd> + <kbd>a</kbd> = Objekt hinzufügen (Dialogmenü)  
<kbd>x</kbd> = selektiertes Objekt entfernen    

<kbd>RMT</kbd> = Objekt Context Menu (Dialogmenü)

<kbd>m</kbd> = Move to Collection

<kbd>Strg</kbd> + <kbd>1</kbd> bis <kbd>5</kbd> = subdivision modifier  

<kbd>Strg</kbd> + <kbd>j</kbd> = Join verbindet zwei Objekte zu einem (Gegenfunktion von separate-Menü[P] aus Edit-Mode)  

<kbd>Strg</kbd> + <kbd>l</kbd> = Link Transfer Data - Eigenschaften auf andere Objekte(Dialogmenü)

<kbd>i</kbd> = insert Keyframe Menü (Dialogmenü)  

#### Duplikate

<kbd>Shift</kbd> + <kbd>d</kbd> = eigenständige Kopie  
<kbd>Alt</kbd> + <kbd>d</kbd> = link Kopie  

#### Bool Tool

Wenn das Bool Tool installiert ist:  
+ Erstes selektierte Objekt ist Formgebend.
+ Mit <kbd>Shift</kbd> zweites Objekt (Bleibende Objekt) selektiert.

<kbd>Strg</kbd> + <kbd>Num -</kbd> = abziehen  
<kbd>Strg</kbd> + <kbd>Num +</kbd> = hinzufügen  
<kbd>Strg</kbd> + <kbd>Num *</kbd> = Schnittmenge  
<kbd>Strg</kbd> + <kbd>Num /</kbd> = slice  

<kbd>Shift</kbd> + <kbd>Strg</kbd> + <kbd>Num +-*/</kbd> Wie oben, jedoch wird das erste Objekt anschließend entfernt.

## Edit Mode

<kbd>Shift</kbd> + <kbd>a</kbd> = Mesh hinzufügen (Dialogmenü)  
<kbd>x</kbd> = Delete (Dialogmenü)  

<kbd>Shift</kbd> + <kbd>Num 7</kbd> = Sichtrichtung aus selektierter Normale

### selektieren

<kbd>1</kbd> = Punkt  
<kbd>2</kbd> = Kante  
<kbd>3</kbd> = Fläche  

<kbd>Strg</kbd> + <kbd>Num +</kbd> = Selektion erweitern
<kbd>Strg</kbd> + <kbd>Num -</kbd> = Selektion verringern

<kbd>l</kbd> = select linked - selektiert alles zusammenhängende  

<kbd>Alt</kbd> + <kbd>LMT</kbd>  = select loop

<kbd>Shift</kbd> + <kbd>s</kbd> = Snap Cursor (Kreismenü)

---  

Erste Fläche selektieren, <kbd>Strg</kbd> gedrückt halten, weitere Fläche selektieren = alle dazwischenliegende Flächen sind selektiert. Selbiges funktioniert auch mit Punkten und Kanten.

---

<kbd>Shift</kbd> + <kbd>RMT</kbd> = 3D-Cursor auf Fläche

<kbd>RMT</kbd> = Vertex, Edge oder Face Context Menu (je nach Mode Punkt, Kante oder Fläche)

<kbd>g</kbd> <kbd>g</kbd> = Bewegen entlang der angrenzenden Kanten

### Geometrie erweitern

<kbd>e</kbd> = extrude  
<kbd>Alt</kbd> + <kbd>e</kbd> = extrude Menü {Mainfold}(Dialogmenü)  
<kbd>Strg</kbd> + <kbd>RMT</kbd> = extrudieren zum Mauszeiger

<kbd>i</kbd> = insert face

<kbd>Strg</kbd> + <kbd>b</kbd> = bevel - Fase (Mausrad mehrere Abstufungen)  

<kbd>k</kbd> = knife (schneiden)

---

#### Knife Project
Mit dieser Methode kannst du ein 2D Objekt wie Plane, Circle oder Text, auf eine Oberfläche eines 3D Objektes projizieren und dort ausschneiden. 

Diese Schnittkante kannst du anschließend zum Beispiel extrudieren.

Die Vorgehensweise ist wie folgt:
+ Beide Objekte im Objekt-Mode platzieren.
+ 3D Objekt selektieren und in Edit-Mode wechseln
+ Sicht so platzieren, dass Projektion richtig
+ mit <kbd>Strg</kbd> + <kbd>RMT</kbd> 2D-Objekt selektieren
+ Menü(Mesh) => Menüpunkt(Knife Project) anwählen

---

<kbd>v</kbd> = rip (aufreißen) Durch verdoppeln der selektierten Kante oder Eckpunkte, entsteht im Mesh ein Loch.  
<kbd>Alt</kbd> + <kbd>v</kbd> = split Vertex / Edge (wie rip, jedoch wird mit neuen Flächen das entstehende Loche wieder geschlossen)

#### Kanten an den nur eine Fläche angrenzt => fehlende Fläche erzeugen (im Vertex-Mode)

+ zwei punkte selektieren + <kbd>f</kbd> = neue Kante  
+ mindestens zwei kanten selektieren + <kbd>f</kbd> = neue Fläche  

<kbd>Strg</kbd> + <kbd>RMT</kbd> = neuer Eckpunkt (es darf keine Fläche selektiert sein, sonst extrude)

<kbd>Alt</kbd> + <kbd>f</kbd> = füllen mit Dreiecken  
<kbd>Alt</kbd> + <kbd>j</kbd> = füllen mit Vierecken(wenn möglich)  

Bestehende Fläche umwandeln in:
<kbd>>Strg</kbd> + <kbd>t</kbd> = Triangulate Faces / Dreieckige Flächen  
<kbd>Alt</kbd> + <kbd>j</kbd> = Tris to Quads / Viereckige Flächen  

<kbd>x</kbd> = delete-Menü (dissolve / limit dissolve)

### Vertex (Eckpunkte)

<kbd>Strg</kbd> + <kbd>v</kbd> = Vertex-Menü  
<kbd>m</kbd> = merge-Menü (by distance)

### Edge (Kante)

<kbd>Strg</kbd> + <kbd>e</kbd> = Edge-Menü

#### Loopcut

<kbd>Strg</kbd> + <kbd>r</kbd> = Loopcut 
+ Mit Mauszeiger auf Kante zeigen
+ Scrollrad Anzahl der Unterteilungen einstellen,
+ Loopcuts mit Maus platzieren
+ <kbd>LMT</kbd> Vorgang abschließen

Alternativ kannst du auch eine Kante selektieren bevor du die Tastenkombination benutzt.

---

### Face (Fläche)

<kbd>Strg</kbd> + <kbd>f</kbd> = Face-Menü (grid fill)

<kbd>Strg</kbd> + <kbd>a</kbd> = skalieren eines Vertex Punkt(Skin modifier)

<kbd>Shift</kbd> + <kbd>g</kbd> = select singulär-Menü

<kbd>Shift</kbd> + <kbd>z</kbd> = wire frame mode 