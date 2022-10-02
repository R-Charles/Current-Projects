tool
extends Area2D

signal teleported

export(NodePath) var target = ""
export(Vector2) var teleport_direction = Vector2(0,0)

var teleport_node = null

func _ready():
	if target != "":
		teleport_node = get_node(target)

func _on_body_entered(body):
	if $Timer.time_left:
		return
	body.global_position = teleport_node.global_position+teleport_direction*10
	body.set_direction(teleport_direction)
	teleport_node.waiting()
	emit_signal("teleported")


func waiting():
	$Timer.start()


func _draw():
	if Engine.is_editor_hint():
		draw_circle(Vector2.ZERO,5,Color.red)
		draw_line(Vector2.ZERO,get_node(target).position-position,Color.red,3)
