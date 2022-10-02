extends Node2D

signal map_changed

func _ready():
	for teleporter in get_tree().get_nodes_in_group("Teleporter"):
		teleporter.connect("teleported",self,"change_map")

func change_map():
	emit_signal("map_changed")
