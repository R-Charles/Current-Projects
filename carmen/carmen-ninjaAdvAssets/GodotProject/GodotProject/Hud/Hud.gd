extends CanvasLayer

onready var life_bar = $LifeBar


func fade():
	$Fade/Anim.stop()
	$Fade/Anim.play("Fade")


func _on_map_changed():
	fade()

func on_player_hit(damage):
	life_bar.life -= damage

func revive():
	fade()
	life_bar.reset()
	
