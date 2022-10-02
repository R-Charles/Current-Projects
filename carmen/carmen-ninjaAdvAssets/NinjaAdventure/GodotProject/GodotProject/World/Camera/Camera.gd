extends Camera2D


signal screen_pos_changed

const RESOLUTION = Vector2(320,176)
export(NodePath) var target_path = ""
var target = ""
onready var tween:Tween = $Tween
var screen_pos = Vector2.ZERO setget set_screen_pos


func _ready():
	target = get_node(target_path)
	update_screen_pos()
	update_position()


func update_position():
	var cam_offset = RESOLUTION/2
	var pos_target = (screen_pos*RESOLUTION)+cam_offset
	tween.interpolate_property(self,"position",position,pos_target,0.6,Tween.TRANS_LINEAR,Tween.EASE_IN_OUT)
	tween.start()

func _process(delta):
	update_screen_pos()


func update_screen_pos():
	if !target:
			return
	self.screen_pos = ((target.global_position/RESOLUTION).floor())


func set_screen_pos(v):
	if screen_pos != v:
		screen_pos = v
		emit_signal("screen_pos_changed")
		update_position()


func _on_World_map_changed():
	yield(get_tree().create_timer(0.01),"timeout")
	tween.stop_all()
	center_pos()


func center_pos():
	update_screen_pos()
	var cam_offset = RESOLUTION/2
	var pos_target = (screen_pos*RESOLUTION)+cam_offset
	position = pos_target
	tween.start()



func _on_Camera_screen_pos_changed():
	reset_map()

func reset_map():
	yield(tween,"tween_all_completed")
	get_tree().call_group("Monster","revive")
	get_tree().call_group("Destroyable","reset")
