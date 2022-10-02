extends Node2D


var life = 1
var disabled = false setget set_disabled


func hit(damage = 1):
	life -= damage
	if life <= 0:
		destroy()


func destroy():
	$SndHit.play()
	$Anim.play("Destroy")



func _on_Anim_animation_finished(anim_name):
	if anim_name == "Destroy":
		self.disabled = true


func set_disabled(v):
	disabled = v
	visible = !v
	$Shape.set_deferred("disabled",v)


func reset():
	if disabled:
		self.disabled = false
		$Anim.play("Idle")
