# Farbe mischen

## Beschreibung
Das Überblenden oder Mischen von Farben, kann oft ganz interessante Effekte mit sich bringen.

Eine Mögllichkeit ist, aus zwei Bildern oder Texturen, den Farbpunkt wählen
und die zwei Farb-Punkte durch eine bestimmte Methode zu Mischen.

## Skript
```gdscript title="Farbe Misch Funktion"
# @param old_color: Color		// Farbe die verändert wird
# @param new_color: Color		// neue Farbe mit der vermischt wird
# @param blend_mode: String		// Vermischung Modus (MIX, ADD, SUBTRACT, MULTIPLY, DIVIDE)
# @param opacity: float			// Deckkraft für die Farbe
# @param hardness: float		// Stärke der Vermischung
# @returns : Color				// neue Farbe
func blend_color(old_color: Color, new_color: Color, blend_mode: String, opacity: float, hardness: float) -> Color:
	# je nach Blend Modus
	match blend_mode:
		"MIX":
			var color:Color = old_color.linear_interpolate(new_color, opacity * hardness))
		"ADD":
			var color:Color = old_color.linear_interpolate(old_color + new_color, opacity * hardness))
		"SUBTRACT":
			var color:Color = old_color.linear_interpolate(old_color - new_color, opacity * hardness))
		"MULTIPLY":
			var color:Color = old_color.linear_interpolate(old_color * new_color, opacity * hardness))
		"DIVIDE":
			var color:Color = old_color.linear_interpolate(old_color / new_color, opacity * hardness))
		_:
			var color:Color = new_color

	# Farbe zurückgeben
	return color
```
