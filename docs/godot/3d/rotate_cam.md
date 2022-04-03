# Kamera Rotation 3D

## Beschreibung
Um eine Kamera in 3D zu Rotieren, ist es wichtig, diese als Kind einer Node zu verwenden.  
Das Eltern-Element dient als Hals für die Horizontale Bewegung.  
Die Kamera selber wird nur Vertikal rotiert.  
Damit erfolgt eine schöne Kamera-Bewegung, ohne ein Nicken der Kamera zu verursachen.

## Node Aufbau
``` title="Node-Tree"
- Root (Spatial)
  - Hals (Spatial oder KinematicBody)
    - Kamera (Camera)
```


## Skripte
``` gdscript title="Variablen"
# Die Maus Empfindlichkeit
var mouse_sensivity: float = 1.0

# Relative Position, um die sich der Mauszeiger seit dem letzten Frame bewegt hat
var mouse_relative := Vector2(0.0, 0.0)     

# Sanftheit der Bewegung
var mouse_linear: float = 0.1
```


``` gdscript title="Maus Event abfragen"
# _input Event
func _input(event):
	# globale Variablen
    # @var mouse_relative: Vector2

    # Variablen
    # @var mouse_sensivity: float
    # @var mouse_linear: float

	# Wenn Maus Bewegung (Umschauen)
	if move_cam:
		if event is InputEventMouseMotion:
			# relative Mausbewegung merken
			mouse_relative = mouse_relative.linear_interpolate(event.relative, mouse_linear) * mouse_sensivity
```

Im `_process(delta)`die Kamera-Rotation aufrufen
``` gdscript title="Process"
func _process(delta):
    # Kamera rotieren
    rotate_cam(self, $Kamera)
```

``` gdscript title="Kamera Rotation"
# Kamera Rotieren
# @param hals: Spatial  // um die Kamera horizontal zu Rotieren
# @param cam: Camera    // Die Kamera um nach unten und Oben zu schauen
func rotate_cam(hals: Spatial, cam: Camera):
	# globale Variablen
    # @var mouse_relative
    
    # nur wenn eine MausBewegung
	if mouse_relative.length() > 0 :
		# Relative Maus Bewegung umkehren
		var mouse_dist:Vector2 = -mouse_relative # kommt von _input MouseMotion
		
		# um eigene Y-Achse drehen
		hals.transform.basis = transform.basis.orthonormalized()
		hals.rotate(transform.basis.y, deg2rad(mouse_dist.x))
			
		# Maus (Vertical) empfindlichkeit für Kamera umkehren
		var change = -mouse_relative.y
		
		# Prüfen ob die Mausbewegung + der Kamera ausrichtung innerhalb des erlaupten Sichtfeldes ist
		if mouse_dist.y + camera_angle < 90 and mouse_dist.y + camera_angle > -90:
			# Änderung zur Kamera Bewegung hinzufügen
			camera_angle += mouse_dist.y
			
			# Kamera (Vertical) um die X-Achse der Nase rotieren
			cam.rotate(cam.transform.basis.x, deg2rad(change))

		# Maus Bewegung zurücksetzen
		mouse_relative = Vector2()
```
