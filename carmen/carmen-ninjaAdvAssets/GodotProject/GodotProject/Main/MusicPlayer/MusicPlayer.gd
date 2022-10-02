extends AudioStreamPlayer

onready var tween = $Tween
const BASE_VOLUME = 0
const MUTE_VOLUME = -60

func _on_music_changed(v):
	if v == null:
		fade_out()
	else:
		if stream == v:
			return
		stream = v
		reset_sound()
		play()


func reset_sound():
	tween.stop_all()
	volume_db = BASE_VOLUME


func fade_out():
	tween.interpolate_property(self,"volume_db",BASE_VOLUME,MUTE_VOLUME,1.4,Tween.TRANS_LINEAR,Tween.EASE_IN)
	tween.start()
