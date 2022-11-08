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
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.station = data['station']

    @classmethod
    def create( cls,data ):
        query = "INSERT INTO stations( address, charging_speed, functionality, station, user_id ) "
        query += "VALUES (%(address)s, %(charging_speed)s, %(functionality)s, %(station)s, )s, %(comment_id)s );"

        result = connectToMySQL( DATABASE ).query_db( query,data )
        print(result)
        return result
    
    @classmethod
    def get_all( cls ): ##***
        query = """
        SELECT * FROM  stations;"""
        
        # query = """
        # SELECT * FROM stations 
        # JOIN comments ON comments.station_id = stations.id;
        # """

        results = connectToMySQL( DATABASE ).query_db( query ) ##***
        list_stations = []
        # print( results )
        for row in results:
            print(row)
            current_station = cls( row )
            list_stations.append( current_station )
        return list_stations

    @classmethod
    def get_one_with_station( cls, data ):
        query = " SELECT * " 
        query += " FROM comments "
        query += " JOIN stations ON comments.station_id = stations.id "
        query += " WHERE comments.id = %(id)s;"

        result = connectToMySQL( DATABASE ).query_db( query, data )

        if len( result ) > 0: 
            current_comment = cls( result[0] )
            station_data = {
                
                **result[0],
                "created_at" : result[0]['stations.created_at'],
                "updated_at" : result[0]['stations.updated_at'],
                "id" : result[0]['stations.id'] 
            
            }
            current_comment.station = Station( station_data )
            return current_comment
        else:
            return None

    @classmethod
    def update_one( cls, data ):
        query = " UPDATE stations "
        query += "SET address = %(address)s, charging_speed = %(charging_speed)s, functionality = %(functionality)s, station = %(station)s = )s"
        # query += "cooked_date = %(cooked_date)s, under_30 = %(under_30)s, "
        query += "WHERE id = %(id)s; "

        return connectToMySQL(DATABASE).query_db( query, data )

    @classmethod
    def delete_one( cls, data ):
        query = " DELETE FROM stations "
        query += "WHERE id = %(id)s;"
        return connectToMySQL( DATABASE ).query_db( query, data )


    @staticmethod
    def validate_station( data ):
        is_valid = True 
        # if len(data["address"]) == '':
            # flash( "address must not be empty", "error_car_model" )
            # is_valid = False 
        if len(data['functionality']) == "":
            flash( "functionality must not be empty", "error_station_functionality" )
            is_valid = False 
        if len(data['functionality']) < 3:
            flash("functionality must be at least 2 characters.", "error_registration_description")
            is_valid = False    
        if int(data['station']) < 0:
            flash( "station must not be empty", "error_station_num" )
            is_valid = False 
        # if int(data)']) < 0:
        #     flash( must not be empty", "error_car_price" )
        #     is_valid = False 

        return is_valid



        # line 72 functionality may effect table data