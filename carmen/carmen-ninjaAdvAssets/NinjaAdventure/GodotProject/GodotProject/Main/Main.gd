extends Node

onready var hud = $Hud
onready var life_bar = $Hud/LifeBar

func _ready():
	var player = $World/YSort/Character
	player.connect("hit",hud,"on_player_hit")
	life_bar.connect("dead",player,"death")


