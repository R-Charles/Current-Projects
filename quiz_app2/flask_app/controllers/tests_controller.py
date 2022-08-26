from flask_app import app
from flask import render_template, request, redirect, flash, session
from flask_app.models.test_model import Test


# @app.route( '/tests/<int:id>' )
# def display_tests():
#     if 'email' not in session:
#         return redirect( '/' )
#     tests_list = Test.get_all_with_users(request.form)    #Grab all the recipes
#     print (request.form)
#     return render_template( 'tests_display.html', tests_list = tests_list )


@app.route( '/new' )
def display_create_test():
    if 'email' not in session:
        return redirect( '/' )
    return render_template( "dashboard.html" )


@app.route( '/tests/new', methods = ['POST'] )
def create_test():
    if Test.validate_test( request.form ) == False:  #validate fields
        return redirect( '/tests/new' )

    data = {
        **request.form,
        "user_id" : session['user_id']
    }


    Test.create( data )
    return redirect( '/tests' )


@app.route('/tests')
def show_all():
    if 'email' not in session:
        return redirect( '/' )
    # data = {
    #     "id" : id
    # }
    tests_list = Test.get_all_with_users()
    return render_template('dashboard.html', tests_list = tests_list )

# @app.route( '/recipes' )
# def display_recipes():
#     if 'email' not in session:
#         return redirect( '/' )
#     list_recipes = Recipe.get_all_with_users()    #Grab all the recipes
#     return render_template( 'recipes.html', list_recipes = list_recipes )

# @app.route( '/edit/<int:id>' )
# @app.route( '/tests/<int:id>/edit' )
# def display_one( id ):
#     if 'email' not in session:
#         return redirect( '/' )
#     data = {
#         "id" : id
#     }
#     current_car = Test.get_one_with_user( data )
#     return render_template( "dashboard.html", current_car = current_car )


@app.route( '/test/<int:id>' )
def display_test( id ):
    if 'email' not in session:
        return redirect( '/' )
    data = {
        "id" : id
    }
    current_test = Test.get_one_with_user( data )
    return render_template( "test.html", current_test = current_test )

# watchout for potential error in f'... added cars to line 77
# @app.route( '/cars/edit/<int:id>', methods = ['POST'] ) was edit
@app.route( '/tests/<int:id>/update', methods = ['POST'] ) 
def update_test( id ):
    if Test.validate_test( request.form ) == False:  #validate fields
        return redirect( f'/tests/{id}/edit' )
    test_data = {
        **request.form,
        "id": id,
    }
    Test.update_one( test_data)
    return redirect( '/tests' )


@app.route( '/tests/<int:id>/edit' ) 
def edit_test(id):
    # if Test.validate_test( request.form ) == False:  #validate fields
    #     return redirect( '/' )
    data = {
    "id" : id
    }
    current_test = Test.get_one_with_user( data )
    return render_template( "edit.html", current_test = current_test )


@app.route( '/tests/<int:id>/delete' )
def delete_test( id ):
    data = {
        "id" : id 
    }
    Test.delete_one( data )
    return redirect( '/tests' )

@app.route( '/tests/history' )
def history():
    return render_template('history2.html')


@app.route( '/tests/general' )
def general():
    return render_template('test1.html')


