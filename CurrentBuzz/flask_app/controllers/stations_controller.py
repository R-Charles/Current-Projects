from flask_app import app
from flask import render_template, request, redirect, flash, session
from flask_app.models.station_model import Station


# @app.route( '/shows/<int:id>' )
# def display_shows():
#     if 'email' not in session:
#         return redirect( '/' )
#     tvshows_list = Tvshow.get_all_with_users(request.form)    #Grab all the recipes
#     print (request.form)
#     return render_template( 'shows_display.html', tvshows_list = tvshows_list )

# /new/show----shows_new.html----
@app.route( '/new' )
def display_create_post():
    if 'email' not in session:
        return redirect( '/' )
    return render_template( "posts_new.html" )

# /shows/new----/shows/new ------ /cars/new
@app.route( '/stations/new', methods = ['POST'] )
def create_post():
    if Station.validate_post( request.form ) == False:  #validate fields
        return redirect( '/stations/new' )

    data = {
        **request.form,
        "user_id" : session['user_id']
    }

# /shows
    Station.create( data )
    return redirect( '/stations' )


# /shows ----- shows.html---/cars
@app.route('/stations')
def show_all():
    if 'email' not in session:
        return redirect( '/' )
    # data = {
    #     "id" : id
    # }
    stations_list = Station.get_all()
    return render_template('dashboard.html', stations_list = stations_list )

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
def display_station( id ):
    if 'email' not in session:
        return redirect( '/' )
    data = {
        "id" : id
    }
    current_station = Station.get_one_with_station( data )
    return render_template( "show.html", current_station = current_station )

# watchout for potential error in f'... added cars to line 77
# @app.route( '/cars/edit/<int:id>', methods = ['POST'] ) was edit
@app.route( '/stations/<int:id>/update', methods = ['POST'] ) 
def update_station( id ):
    if Station.validate_station( request.form ) == False:  #validate fields
        return redirect( f'/stations/{id}/update' )
    station_data = {
        **request.form,
        "id": id,
    }
    Station.update_one( station_data)
    return redirect( '/stations' )


@app.route( '/stations/<int:id>/edit' ) 
def edit_station(id):
    # if Station.validate_station( request.form ) == False:  #validate fields
    #     return redirect( '/' )
    data = {
    "id" : id
    }
    current_station = Station.get_one_with_user( data )
    return render_template( "edit.html", current_station = current_station )


# /shows ----
@app.route( '/stations/<int:id>/delete' )
def delete_station( id ):
    data = {
        "id" : id 
    }
    Station.delete_one( data )
    return redirect( '/stations' )

