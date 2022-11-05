from flask_app import app
from flask_app.controllers import users_controller, stations_controller

# app.secret_key = "passwordpassword"

if __name__=="__main__":       
    app.run(debug=True)