[bild_label3d]: img/label3d.png

# Label3D und TextMesh
von: Windy

## Label3D
Diese beiden Neuerungen machen das was der Name schon erraten lässt. Label3D ist ein neues Node mit dem du einen Text in einer 3D-Szene darstellen lassen kannst. TextMesh ist da etwas versteckter und ist eine Typ-Erweiterung vom Mesh.

Betrachten wir uns zunächst einmal das Label3D. Zu finden ist dies neue Node unter:
![Label3D][bild_label3d]{ width="250"} 

Bereits nach dem du das Node im Szenentree eingefügt hast und im 
Inspektor => Panel(Text) => Parameter(Text) = einen Text eingegeben hast, ist dieser Text in der 3D-Szen sichtbar.

Der Parameter(Pixel Size) = regelt die Größe des Textes (wie groß soll ein Pixel in der 3D-Welt sein) und mit dem Parameter(Modulate) kannst du Farbe bestimmen.

## TextMesh
Das TextMesh findest du im Node MeshInstance. Also fügst du in die Szene zunächst einmal eine  MeshInstance hinzu.

Zunächst musst du in deinem Projekt eine Schriftart hinzufügen, am besten ein True Type Font (*.ttf).  Kopiere diese ins Projektverzeichnis oder in ein entsprechendes Unterverzeichnis.

Wenn du die MeshInstance ausgewählt hast, kannst du im Inspektor folgende Einstellungen vornehmen:

Parameter(Mesh) = TextMesh
Panel(Text) => Parameter(Text) = eine Zeile Text, die angezeigt werden soll
Parameter(Font) = DynamicFont
=> Panel(Font) => Parameter(Font Data) = TTF-Schrift aus dem Dateisystem rüber ziehen
=> Panel(Settings) => Parameter(Size) = Schriftgröße
=> Panel(Mesh) => Parameter(Depth) = Schrifttiefe

Die Farbe kannst du im Material genauer bestimmen.
