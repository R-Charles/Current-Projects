from flask_app import app
from flask import render_template, request, redirect, flash, session
from flask_app.models.comment_model import Comment


# @app.route( '/shows/<int:id>' )
# def display_shows():
#     if 'email' not in session:
#         return redirect( '/' )
#     tvshows_list = Tvshow.get_all_with_users(request.form)    #Grab all the recipes
#     print (request.form)
#     return render_template( 'shows_display.html', tvshows_list = tvshows_list )

# /new/show----shows_new.html----
@app.route( '/new' )
def display_create_car():
    if 'email' not in session:
        return redirect( '/' )
    return render_template( "cars_new.html" )

# /shows/new----/shows/new ------ /cars/new
@app.route( '/cars/new', methods = ['POST'] )
def create_car():
    if Car.validate_car( request.form ) == False:  #validate fields
        return redirect( '/cars/new' )

    data = {
        **request.form,
        "user_id" : session['user_id']
    }

# /shows
    Car.create( data )
    return redirect( '/cars' )


# /shows ----- shows.html---/cars
@app.route('/cars')
def show_all():
    if 'email' not in session:
        return redirect( '/' )
    # data = {
    #     "id" : id
    # }
    cars_list = Car.get_all_with_users()
    return render_template('dashboard.html', cars_list = cars_list )

# @app.route( '/recipes' )
# def display_recipes():
#     if 'email' not in session:
#         return redirect( '/' )
#     list_recipes = Recipe.get_all_with_users()    #Grab all the recipes
#     return render_template( 'recipes.html', list_recipes = list_recipes )

# @app.route( '/edit/<int:id>' )
# @app.route( '/cars/<int:id>/edit' )
# def display_one( id ):
#     if 'email' not in session:
#         return redirect( '/' )
#     data = {
#         "id" : id
#     }
#     current_car = Car.get_one_with_user( data )
#     return render_template( "dashboard.html", current_car = current_car )

# shows_display
@app.route( '/show/<int:id>' )
def display_car( id ):
    if 'email' not in session:
        return redirect( '/' )
    data = {
        "id" : id
    }
    current_car = Car.get_one_with_user( data )
    return render_template( "show.html", current_car = current_car )

# watchout for potential error in f'... added cars to line 77
# @app.route( '/cars/edit/<int:id>', methods = ['POST'] ) was edit
@app.route( '/cars/<int:id>/update', methods = ['POST'] ) 
def update_car( id ):
    if Car.validate_car( request.form ) == False:  #validate fields
        return redirect( f'/cars/{id}/update' )
    car_data = {
        **request.form,
        "id": id,
    }
    Car.update_one( car_data)
    return redirect( '/cars' )


@app.route( '/cars/<int:id>/edit' ) 
def edit_car(id):
    # if Car.validate_car( request.form ) == False:  #validate fields
    #     return redirect( '/' )
    data = {
    "id" : id
    }
    current_car = Car.get_one_with_user( data )
    return render_template( "edit.html", current_car = current_car )


# /shows ----
@app.route( '/cars/<int:id>/delete' )
def delete_car( id ):
    data = {
        "id" : id 
    }
    Car.delete_one( data )
    return redirect( '/cars' )

