from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app import DATABASE
from flask_app.models.user_model import User

class Test:
    def __init__( self, data ):
        self.id = data['id']
        self.subject = data['subject']
        self.score = data['score']
        self.user_id = data['user_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']


    @classmethod
    def create( cls,data ):
        query = "INSERT INTO tests( subject, score, user_id ) "
        query += "VALUES (%(subject)s, %(score)s, %(user_id)s );"

        result = connectToMySQL( DATABASE ).query_db( query,data )
        print(result)
        return result
    
    @classmethod
    def get_all_with_users( cls ): ##***
        query = "SELECT * " 
        query += "FROM tests "
        query += "JOIN users ON tests.user_id = users.id;"

        results = connectToMySQL( DATABASE ).query_db( query ) 
        list_tests = []
        # print( results )
        for row in results:
            current_test = cls( row )
            user_data = {
                **row,
                "created_at" : row['users.created_at'],
                "updated_at" : row['users.updated_at'],
                "id" : row['users.id']
            }
            current_user = User( user_data )
            current_test.user = current_user
            list_tests.append( current_test )
        return list_tests

    @classmethod
    def get_one_with_user( cls, data ):
        query = " SELECT * " 
        query += " FROM tests "
        query += " JOIN users ON tests.user_id = users.id "
        query += " WHERE tests.id = %(id)s;"

        result = connectToMySQL( DATABASE ).query_db( query, data )

        if len( result ) > 0: 
            current_test = cls( result[0] )
            user_data = {
                
                **result[0],
                "created_at" : result[0]['users.created_at'],
                "updated_at" : result[0]['users.updated_at'],
                "id" : result[0]['users.id'] 
            
            }
            current_test.user = User( user_data )
            return current_test
        else:
            return None

    @classmethod
    def update_one( cls, data ):
        query = " UPDATE tests "
        query += "SET subject = %(subject)s, score = %(score)s "
        # query += "cooked_date = %(cooked_date)s, under_30 = %(under_30)s, "
        query += "WHERE id = %(id)s; "

        return connectToMySQL(DATABASE).query_db( query, data )

    @classmethod
    def delete_one( cls, data ):
        query = " DELETE FROM tests "
        query += "WHERE id = %(id)s;"
        return connectToMySQL( DATABASE ).query_db( query, data )


    @staticmethod
    def validate_test( data ):
        is_valid = True 
        # if len(data["subject"]) == '':
            # flash( "subject must not be empty", "error_test_subject" )
            # is_valid = False 
        # if len(data['description']) == "":
        #     flash( "Description must not be empty", "error_test_description" )
        #     is_valid = False 
        # if len(data['description']) < 3:
        #     flash("description must be at least 2 characters.", "error_registration_description")
        #     is_valid = False    
        # if int(data['year']) < 0:
        #     flash( "Year must not be empty", "error_test_year" )
        #     is_valid = False 
        # if int(data['price']) < 0:
        #     flash( "Price must not be empty", "error_test_price" )
        #     is_valid = False 

        return is_valid



        # line 72 description may effect table data


