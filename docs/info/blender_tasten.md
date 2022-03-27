# Blender3.1 Kurz-Tasten

Grundsätzlich wirken die Tasten in jeweils dem Editor, in dem sich der Mauszeiger befindet!

Im 3D-View-Fenster gibt es eine Sicht, welches die Ansicht liefert und eine oder mehrere Kameras, dessen Bild später gerendert werden kann.

## Ansicht

Nummerntastatur  
++num7++ = Draufsicht  
++num1++ = Vorderansicht -Y  
++num3++ = Seitenansicht -X  
++num9++ = wechsel der Ansicht  
++num5++ = Perspektive / orthografisch  
++ctrl++ + ( ++num7++ / ++num1++ / ++num3++ ) = inverse Ansicht  
++num0++ = Sicht aus Kamera  
++ctrl+alt+num0++ = Kamera auf Sichtposition  

Scrollrad oder ++num-plus++ / ++num-minus++ = zoom  
++shift+middle-button++ = Sicht horizontal und vertikal verschieben

++middle-button++ = Sicht drehen  
++comma++ = Aktuelles Objekt Im Zentrum (Drehpunkt)  

++ctrl+alt+q++ = Vierfensteransicht

++shift+7++ = Sichtrichtung aus selektierter normale

++z++ = Shading (Anzeigemodus)

++shift+c++ = zoomt soweit raus, bis alle Objekte im Bild zu sehen sind

++u++ = Hide Selected (ausgewähltes Ausblenden)  
++shift+h++ = Hide Unselected (nicht ausgewähltes Ausblenden)  
++alt+u++ = Show Hidden (Ausgeblendetes wieder Einblenden)

<kbd class="key-z">#</kbd> = User Perspective Lokal (Zoomt an selektiertes Objet heran und Blendet alle anderen Objekte aus)
nochmaliges drücken macht den Vorgang rückgängig.

++shift++ + <kbd class="key-z">ö</kbd> = flymode (WASD)

## selektieren

++left-button++ = selektieren
++shift+left-button++ = mehrfach selektieren

++a++ = alles selektieren  
++alt+a++  = deselektieren

++c++ = Auswahlpinsel  
++b++ = Rechteckauswahl  
++w++ = wechseln des Auswahlmode

## Grundsätzlich

++g++ = bewegen  
++s++ = skalieren  
++r++ = rotieren  

++shift+right-button++ = setzt Curser auf Mausposition

++x++ / ++y++ / ++z++ = auf jeweiliger Achse  
++shift+z++ = ++x++ und ++y++ und entsprechen  
++x+x++ / ++y+y++ / ++z+z++ = verschieben Lokaler Achse  

++tab++ = wechsel zwischen Edit und Objekt mode

++right-button++ = Abbruch eines Vorgangs im Bearbeitungsmodus

++t++ = Toolbar  
++n++ = Sidebar  

++f9++ = Funktionsfenster öffnen(letzte Funktion)

++alt+b++ = nur selektierter Bereich sichtbar / Tastenkombi nochmals alles wieder sichtbar

++h++ = Hide (selektierte ausblenden)  
++alt+h++ = Hide (alles verstecke wieder einblenden)  

++x++ = löschen


## Objekt Mode

RMT = Objekt Context Menu  

++shift+d++ = eigenständige Kopie  
++alt+d++ = Kopie  

++ctrl++ ++1++ bis ++5++ = subdivision modifier

++ctrl+j++ = Join verbindet zwei Objekte zu einem (Gegenfunktion von separate-Menü ++p++ aus Edit-Mode)

++ctrl+l++ = Link Transfer Data (Eigenschaften auf andere Objekte)

++o++ = Proportional Editing an/aus  
++h++ = hide  

<kbd class="key-z">#</kbd> = selektiertes Objekt ins Zentrum, maximal ran zoomen (wie <kbd class="key-z">num ,</kbd>)  
++x++ = delete  

++m++ = remove from lokal view  
 
++space++ = play  

++f2++ = Rename Objekt  
++f3++ = Suchen  
++f4++ = File Context Menü  
++f9++ = Adjust last Operation  

### Kreismenü

++z++ = shading  
<kbd class="key-z">ö</kbd> = View  
++comma++ = orientation  
++period++ = Pivot Point  

## Dialogmenü

++i++ = insert Keyframe Menü  

## Edit Mode

### selektieren

++1++ = Punkt  
++2++ = Kante  
++3++ = Fläche  


++alt+left-button++  = select loop  
++l++ = select linked (selektiert alles zusammenhängende) 

++ctrl+num-plus++ = alle selektierten angrenzende hinzu
+ctrl+num-minus++ = alle angrenzende Flächen weg

erste Fläche selektiert, +ctrl+ weitere Fläche selektiert, alle dazwischenliegende Flächen selektiert.

++alt++ = loop select

++shift+right-button++ = courser auf Fläche

++right-button++ = Vertex, Edge oder Face Context Menu (je nach Mode Punkt, Kante oder Fläche)

++g++ ++g++ = entlang der angrenzenden Kanten

++shift+w++ = drehen um origin auf Ansicht

++i++ = insert face  
++k++ = knife (schneiden)  
++ctrl+b++ = bevel (Mausrad mehrere Abstufungen) Fase  

++v++ = rip (aufreißen) Durch verdoppeln der selektierten Kante oder Eckpunkte, entsteht im Mesh ein Loch.

++alt+v++ = split Vertex / Edge (wie rip, jedoch wird mit neuen Flächen das entstehende Loche wieder geschlossen)

++e++ = extrude

++alt+e++ = extrude Menü(Mainfold)

++shift+r++ = wieder holen des letzten Vorgangs

++ctrl+right-button++ = extrudieren zum Mauszeiger

++ctrl+r++ = loopcut (klicken auf Kante, Scrollrad Anzahl der Unterteilungen)

++shift+s++ = Curser-Menü  
++x++ = delete-Menü (dissolve / limit dissolve)  


### Vertex (Eckpunkt)
++ctrl+v++ = Vertex-Menü
++m++ = merge-Menü (by distance)


### Edge (Kante)
++ctrl+e++ = Edge-Menü


### Face (Fläche)
++ctrl+f++ = Face-Menü (grid fill)


### Kanten an den nur eine Fläche angrenzt => fehlende Fläche erzeugen
zwei punkte selektieren + ++f++ = neue Kante dazwischen  
mindestens zwei kanten selektieren + ++f++ = neue Fläche  
++ctrl+right-button++ = neuer Eckpunkt (darf keine Fläche selektiert sein, sonst extrude)

++alt+f++ = füllen mit Dreiecken  
++alt+j++ = füllen mit Vierecken(wenn möglich)  

++ctrl+a++ = skalieren eines Vertex Punkt(Skin modifier)  

++shift+g++ = select singulär-Menü  

++ctrl+t++ = Triangulate Faces

++ctrl+z++ = Undo Letzte Aktion Rückgängig  
++shift+ctrl+z++ = Redo Letzte Aktion wieder herstellen  

++shift+z++ = wire frame mode  

++o++ = Proportional Editing an/aus  
++q++ = Quick Favorites

Wenn das bool tool installiert ist:
  
+ Erstes selektierte Objekt ist Formgebend.  
+ Mit ++shift++ zweites Objekt(Bleibende Objekt) selektiert.  
  
++ctrl+num-minus++ = abziehen  
++ctrl+num-plus++ = hinzufügen  
++ctrl+num-asterisk++ = Schnittmenge  
++ctrl+num-slash++ = slice  

++shift+ctrl+num-minus++ / ++num-plus++ / ++num-asterisk++ / ++num-slash++ wie oben mit entfernen vom ersten Objekt


## Kreismenü
++z++ = shading  
<kbd class="key-z">#</kbd> = view  
++comma++ = orientation  
++period++ = pivot Point  
++shift+o++ = Proportional Editing Falloff  
++shift+s++ = snap  


## Dialogmenü
++u++ = UV-Mapping  
++x++ = delete  
++m++ = merge  
++p++ = separate-Menü  
++ctrl+f++ = Face-Menü (grid fill)  
++ctrl+v++ = Vertex-Menü  
++ctrl+e++ = Edge-Menü  
++ctrl+q++ = beenden  
++ctrl+r++ = loop cut  

++ctrl+o++ = Open Dialog  
++ctrl+s++ = Speichern  
++ctrl+n++ = New File  

++shift+a++ = Add Mesh  
++shift+g++ = select similar   

++f2++ = Mesh neuen Namen geben  
++f3++ = Such-Eingabefenster  
++f4++ = File Context Menü  
++f9++ = Toggle Edit Mode Öffnet letztes Dialogfenster mit den Funktionsparametern  
++f11++ = Render-Fenster  
++f12++ = Render-Fenster mit Start eines Rendervorgangs 
