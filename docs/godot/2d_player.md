# 2D Player

```gdscript title="player"
extends CharacterBody2D

# Geschwindigkeit des Spilers in Pixel /Sekunde
@export var speed: float = 150.0
@export var min_abstand: float = 30.0

var is_colliding: bool = false # wenn Kolidiert
var mouse_position: Vector2

@onready var cam: Camera2D = $Camera2D

func _process(_delta):
	print("_process: ", _delta)
	# Richtung für bewegung
	var direction: Vector2 = Vector2.ZERO

	# Spieler in die richtung der Maus drehen
	mouse_position =  get_global_mouse_position()
	look_at(mouse_position)
	
	if global_position.distance_to(mouse_position) > min_abstand:
		if Input.is_action_pressed("move_foreward"):
			#direction.y -= 1
			direction.x += 1

	if Input.is_action_pressed("move_back"):
		#direction.y += 1
		direction.x -= 1

	if Input.is_action_pressed("move_left"):
		direction.y -= 1
		pass
	if Input.is_action_pressed("move_right"):
		direction.y += 1
		pass

	# drehen
	direction = global_transform.basis_xform(direction)
	
	# Bewegung dem CharacterBody2D zuweisen
	velocity = direction.normalized() * speed
	
func _physics_process(_delta):
	print("_physics: ", _delta)
	# Spieler bewegen
	is_colliding = move_and_slide()
```
