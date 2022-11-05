from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app import DATABASE
from flask_app.models.user_model import User

class Station:
    def __init__( self, data ):
        self.id = data['id']
        self.address = data['address']
        self.charging_speed = data['charging_speed']
        self.functionality = data['functionality']
        self.user_id = data['user_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.station_num = data['station_num']

    @classmethod
    def create( cls,data ):
        query = "INSERT INTO stations( address, charging_speed, functionality, station_num, user_id ) "
        query += "VALUES (%(address)s, %(charging_speed)s, %(functionality)s, %(station_num)s, )s, %(user_id)s );"

        result = connectToMySQL( DATABASE ).query_db( query,data )
        print(result)
        return result
    
    @classmethod
    def get_all_with_users( cls ): ##***
        query = "SELECT * " 
        query += "FROM cars "
        query += "JOIN users ON cars.user_id = users.id;"

        results = connectToMySQL( DATABASE ).query_db( query ) ##***
        list_cars = []
        # print( results )
        for row in results:
            current_car = cls( row )
            user_data = {
                **row,
                "created_at" : row['users.created_at'],
                "updated_at" : row['users.updated_at'],
                "id" : row['users.id']
            }
            current_user = User( user_data )
            current_car.user = current_user
            list_cars.append( current_car )
        return list_cars

    @classmethod
    def get_one_with_user( cls, data ):
        query = " SELECT * " 
        query += " FROM cars "
        query += " JOIN users ON cars.user_id = users.id "
        query += " WHERE cars.id = %(id)s;"

        result = connectToMySQL( DATABASE ).query_db( query, data )

        if len( result ) > 0: 
            current_car = cls( result[0] )
            user_data = {
                
                **result[0],
                "created_at" : result[0]['users.created_at'],
                "updated_at" : result[0]['users.updated_at'],
                "id" : result[0]['users.id'] 
            
            }
            current_car.user = User( user_data )
            return current_car
        else:
            return None

    @classmethod
    def update_one( cls, data ):
        query = " UPDATE cars "
        query += "SET address = %(address)s, charging_speed = %(charging_speed)s, functionality = %(functionality)s, station_num = %(station_num)s = )s"
        # query += "cooked_date = %(cooked_date)s, under_30 = %(under_30)s, "
        query += "WHERE id = %(id)s; "

        return connectToMySQL(DATABASE).query_db( query, data )

    @classmethod
    def delete_one( cls, data ):
        query = " DELETE FROM cars "
        query += "WHERE id = %(id)s;"
        return connectToMySQL( DATABASE ).query_db( query, data )


    @staticmethod
    def validate_car( data ):
        is_valid = True 
        # if len(data["address"]) == '':
            # flash( "address must not be empty", "error_car_model" )
            # is_valid = False 
        if len(data['functionality']) == "":
            flash( "functionality must not be empty", "error_car_description" )
            is_valid = False 
        if len(data['functionality']) < 3:
            flash("functionality must be at least 2 characters.", "error_registration_description")
            is_valid = False    
        if int(data['station_num']) < 0:
            flash( "station_num must not be empty", "error_car_year" )
            is_valid = False 
        # if int(data)']) < 0:
        #     flash( must not be empty", "error_car_price" )
        #     is_valid = False 

        return is_valid



        # line 72 functionality may effect table data