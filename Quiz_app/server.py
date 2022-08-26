from flask import Flask, render_template  # Import Flask to allow us to create our app
app = Flask(__name__)    # Create a new instance of the Flask class called "app"
from flask_app.controllers import tests_controller 

# @app.route('/')          # The "@" decorator associates this route with the function immediately following
# def index():
#     return render_template("index.html")



if __name__=="__main__":   # Ensure this file is being run directly and not from a different module    
    app.run(debug=True)    # Run the app in debug mode.

