extends Area2D

signal dialog_started(player)
signal dialog_ended

export(String, "TimelineDropdown") var timeline: String
export(NodePath) var npc_path = ""

onready var tween = $Tween
onready var dialog_info = $DialogInfo
var player = null


func _ready():
	if npc_path != "":
		connect_to_npc(get_node(npc_path))
	set_process_input(false)
	$DialogInfo.visible = false


func connect_to_npc(npc):
	self.connect("dialog_started",npc,"start_dialog_with")
	self.connect("dialog_ended",npc,"stop_dialog")


func _on_DialogArea_body_entered(body):
	show_dialog_info()
	player = body
	set_process_input(true)


func _on_DialogArea_body_exited(body):
	$DialogInfo.visible = false
	set_process_input(false)


func _input(event):
	if event.is_action_pressed("ui_accept"):
		launch_dialog()


func launch_dialog():
	pass
#	emit_signal("dialog_started",player)
#	player.disabled = true
#	$DialogInfo.visible = false
#	set_process_input(false)
#	var dialog = Dialogic.start(timeline)
#	dialog.connect("timeline_end",self,"on_dialog_end")
#	get_tree().get_nodes_in_group("Hud")[0].add_child(dialog)


func on_dialog_end(timeline):
	show_dialog_info()
	emit_signal("dialog_ended")
	set_process_input(true)

func show_dialog_info():
	if player:
		player.disabled = false
	$DialogInfo.visible = true
	tween.interpolate_property(dialog_info,"position",Vector2(0,10),Vector2(0,0),0.5,Tween.TRANS_ELASTIC,Tween.EASE_OUT)
	tween.start()
