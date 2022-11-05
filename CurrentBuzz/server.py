from flask_app import app

from flask_app.controllers import controller_routes, controller_users, controller_station

# app.secret_key = "passwordpassword"



if __name__=="__main__":       
    app.run(debug=True)