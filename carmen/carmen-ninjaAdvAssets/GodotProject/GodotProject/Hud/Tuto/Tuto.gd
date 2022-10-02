extends Control

onready var tween:Tween = $Tween
var tuto_move_completed = false
var tuto_move_attack = false


func _input(event):
	if event.is_action_pressed("move_down") or event.is_action_pressed("move_up") or event.is_action_pressed("move_left") or event.is_action_pressed("move_right"):
		tuto_move_completed = true
	if event.is_action_pressed("action"):
		tuto_move_attack = true


func _on_TutoTime_timeout():
	if tuto_move_attack and tuto_move_completed:
		hide_tuto()
	else:
		$TutoTime.start()
	

func hide_tuto():
	tween.interpolate_property(self,"rect_position:y",0,100,1,Tween.TRANS_CUBIC,Tween.EASE_OUT)
	tween.start()
	yield(tween,"tween_all_completed")
	queue_free()
