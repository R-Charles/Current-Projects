extends KinematicBody2D


export(String,"Left","Right","Up","Down") var direction = "Left" setget set_direction
export(String,"Idle","Walk") var animation = "Idle" setget set_animation
var disabled = false setget set_disabled
var old_direction = "Down"

onready var anim = $Anim
onready var sprite = $Sprite


func _ready():
	self.direction = direction


func set_disabled(v):
	disabled = v
	anim.playback_active = !v
	set_process(!v)
	set_physics_process(!v)


func set_direction(v):
	direction = v
	update_sprite()


func set_animation(v):
	animation = v
	update_sprite()


func update_sprite():
	if sprite:
		if sprite.frames.has_animation(animation+direction):
			sprite.animation = animation+direction
		else:
			sprite.animation = animation


func start_dialog_with(player):
	self.disabled = true
	old_direction = direction
	self.direction = get_target_direction(player)


func stop_dialog():
	self.direction = old_direction
	self.disabled = false


func get_target_direction(target):
	var target_dir = "Left"
	var dist_x = (global_position.x-target.global_position.x)
	var dist_y = (global_position.y-target.global_position.y)
	if abs(dist_x) > 8:
		if dist_x < 0:
			target_dir = "Right"
		else:
			target_dir = "Left"
	else:
		if dist_y < 0:
			target_dir = "Down"
		else:
			target_dir = "Up"
	return(target_dir)
	
