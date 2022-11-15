from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app import DATABASE
from flask_app.models.station_model import Station

class Comment:
    def __init__( self, data ):
        self.id = data['id']
        self.content = data['content']
        self.user_id = data['user_id']
        self.station_id = data['station_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']


    @classmethod
    def create( cls,data ):
        query = "INSERT INTO comments( content, station_id, user_id ) "
        query += "VALUES (%(content)s, %(station_id)s, %(user_id)s );"

        result = connectToMySQL( DATABASE ).query_db( query,data )
        print(result)
        return result
    
    @classmethod
    def get_all_with_stations( cls ): ##***
        query = "SELECT * " 
        query += "FROM comments "
        query += "JOIN stations ON comments.station_id = stations.id;"

        results = connectToMySQL( DATABASE ).query_db( query ) ##***
        list_comments = []
        # print( results )
        for row in results:
            current_comment = cls( row )
            station_data = {
                **row,
                "created_at" : row['users.created_at'],
                "updated_at" : row['users.updated_at'],
                "id" : row['stations.id'] ##was [user.id]
            }
            current_station = Station( station_data )
            current_comment.station = current_station
            list_comments.append( current_comment )
        return list_comments

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
        query = " UPDATE comments "
        query += "SET content = %(content)s, station = %(station)s, user_id = %(user_id)s "
        # query += "cooked_date = %(cooked_date)s, under_30 = %(under_30)s, "
        query += "WHERE id = %(id)s; "

        return connectToMySQL(DATABASE).query_db( query, data )

    @classmethod
    def delete_one( cls, data ):
        query = " DELETE FROM comments "
        query += "WHERE id = %(id)s;"
        return connectToMySQL( DATABASE ).query_db( query, data )


    @staticmethod
    def validate_comments( data ):
        is_valid = True 
        # if len(data["model"]) == '':
            # flash( "model must not be empty", "error_comments_model" )
            # is_valid = False 
        if len(data['content']) == "":
            flash( "Content must not be empty", "error_comment_content" )
            is_valid = False 
        if len(data['content']) < 3:
            flash("content must be at least 2 characters.", "error_comment_content")
            is_valid = False    
        if int(data['user_id']) < 0:
            flash( "User_id must not be empty", "error_comment_user_id" )
            is_valid = False 
        if int(data['station_id']) < 0:
            flash( "Station_id must not be empty", "error_comment_station_id" )
            is_valid = False 

        return is_valid



        # line 72 description may effect table data