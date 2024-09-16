---
// data
---

# Vektoren 2D

Im Folgenden betrachten wir Vektoren auf einer 2D Fläche und benutzen in unserem Koordinatensystem, die Achsen X und Y. Die gemachten Erkenntnisse können auch im 3D Raum angewendet werden, hierbei kommt lediglich die dritte Achse Z hinzu.

```gdscript
var my_vector = Vector2(7,10)
```

--- [ w-8]
Ein Vektor ist am einfachsten anhand eines Pfeils erklärbar. Die Pfeilspitze zeigt an einen Punkt welcher bezugnehmend zum Startpunkt über die zwei Maße von X und Y bestimmt wird.
In Godot wird dieser Vektor folgendermaßen festgelegt:
--- [ w-4]
![alt text](/doc/godot/img/vector2d_1.png)
---



Da diese Werte auch negativ ausfallen können, kann der Pfeil in jede Richtung zeigen und unterschiedliche Längen haben.

## Addieren

```gdscript
var my_pos = Vector2(7,10)
var bewegung = Vector2(11,-5)
my_pos = my_pos + bewegung		# my_pos = (7,10) + (11,-5) = (18,5)
```

--- [ w-6]
Über das Addieren von zwei Vektoren kann beispielsweise das Verschieben eines Objektes berechnet werden.
--- [ w-6]
![alt text](/doc/godot/img/vector2d_add.png)
---



## Subtrahieren
{{ :godot:syntax:vecsub.png?300}}
Wenn wir von der Position des Ziels die Spieler Position Subtrahieren erhalten wir einen Vektor welcher von unserer Position aufs Ziel zeigt. (bläulicher Vektor = grüner Vektor – schwarzer Vektor)

<code gdskript>
var my_pos = Vector2(11,5)
var ziel_pos = Vector2(7,10)
var ziel_vec = ziel_pos - my_pos	# ziel_vec = (7,10) – (11,5) = (-4,5)
</code>

===== Multiplizieren =====
Multiplizieren wir beide Werte eines Vektors mit der gleichen Zahl, so verlängern(oder verkürzen) sich diese ohne dessen Richtung zu ändern.

<code gdskript>
var my_vec = Vector2(2,3)
my_vec *= 2				#my_vec = (2,3) * 2 = (4,6)
</code>

===== Richtung =====
Um die Richtung eines Vektors zu ermitteln, benutzen wir die Funktion angle()

<code gdskript>
var winkel = 0
winkel = my_vec.angle()	# der Winkel wird jedoch in Bogenmaß ausgegeben!
</code>

**Richtungsvektor**\\
Um aus einer Richtung einen Vektor mit der Länge eins zu generieren, benutzen wir folgende Berechnung:

<code gdskript>
var RichtungsVec = Vector2(cos(angle), sin(angle))
</code>

==== Bogenmaß nach Grad ====
<code gdskript>
Grad = Bogenmass * 180/PI	# 57,29577~
Grad = rad2deg(Bogenmass)
</code>

==== Grad nach Bogenmaß ====
<code gdskript>
Bogenmass = Grad * PI/180	# 0,017453~
Bogenmass = deg2rad(Grad)
</code>

===== Länge =====
Um die Länge eines Vektors zu ermitteln, benutzen wir die Funktion length()

<code gdskript>
var lang = 0
lang = my_vec.length()
</code>

Alternativ gibt es zwei Funktionen zur Umrechnung:
| Vector2 | cartesian2polar ( float x, float y ) | Konvertiert einen Vector (x y) in das Polarkoordinatensystem (Länge und Winkel) |
| Vector2 | polar2cartesian ( float r, float th ) | Konvertiert Polarkoordinatensystem (Länge und Winkel) in Vector |
===== Normalisierung =====
Die Länge des Vektors können wir durch dessen Normalisierung auf die Länge von 1 bringen, seine Richtung bleibt unverändert.

<code gdskript>
var my_vec = Vector2(2,3)
my_vec = my_vec. normalized()
</code>

===== Abprallwinkel =====

Stößt ein KinematicBody2D mit einer Fläche enes StaticBody2D zusammen, so ist der Ausfallswinkel mit dem Einfallswinkel identisch. Um den Einfallswinkel bestimmen zu können, wird Lotrecht zur Aufprallfläche ein Einheitsvektor bestimmt. Dieser Vektor wird als Normale bezeichnet.

Die Funktion move_and_collide liefert im Falle einer Kollision ein Datenpaket welches die Normale der zusammengestoßenen Fläche enthält. Über die Vektor Funktion bounce, unter Angabe dieser Normale, erhalten wir einen Vektor in Abprallrichtung. 

{{:godot:syntax:abprallwinkel.png?300|}}
<code gdskript>
var collision = move_and_collide(velocity * delta)
if collision:
	velocity = velocity.bounce(collision.normal)
</code>

===== Das Skalarprodukt (Punktprodukt) =====

Mit dem Skalarprodukt können wir Aussagen, bezüglich dem Winkel zwischen zwei Einheitsvektoren treffen. Je nach Lage, liegt das Ergebnis zwischen -1 und 1.

Eine klassische Anwendung ist die Ermittlung, ob ein Objekt im Sichtbereich (Richtung) einer Person liegt. Wenn wir von einem Sichtfeld von 180° ausgehen, sieht das Skript folgendermaßen aus:
{{:godot:syntax:skalarprodukt.png?300|}}
<code gdskript>
func _physics_process(delta):
	if Input.is_key_pressed(KEY_A):
		richtung = 1
	elif Input.is_key_pressed(KEY_D):
		richtung = -1
	else:
		richtung = 0
	rotation += richtung * delta
	var VecZumZiel = ($"../Ziel".position - position).normalized()
	var SichtRichtung = rotation - (PI/2)	# 90Grad drehen
	var SichtVec = Vector2(cos(SichtRichtung), sin(SichtRichtung))
	var punkt = VecZumZiel.dot(SichtVec)
	if  punkt > 0:
		$"../Label".text =" Ich kann dich sehen"
	else:
		$"../Label".text =" "
</code>
