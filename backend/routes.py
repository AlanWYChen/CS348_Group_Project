from flask import request, Request, Response, jsonify
from backend import app, db, engine

from .db_functions import *
#TODO: Write all get request woth query params 
# get all the movies from the DB and display in home page
@app.route("/")
def hello_world():
    return "<p>API Backend</p>"

@app.route("/movie", methods=['GET'])
def get_movie_from_id():
    
    #Check if movie ID passed
    try: 
        id = request.args['id']
        print(id)
    except: 
        retval = jsonify({
            'message': 'Bad Request: Missing user id',
        })
        return retval
    
    #TODO: Add checks for valid movie id in DB? or here? 
    try: 
        movie = db_get_movie_by_id(engine, id)
        print(movie)
        return jsonify(movie)
    except:
        retval = jsonify({
            'message': 'DB Error: Failed to get movie Info ',
        })
        return retval, 500

    

@app.route("/all_movies", methods=["GET"])
def get_all_movies():
    all_movies = db_get_all_movies(engine)
    print(all_movies)
    if all_movies: 
        return jsonify(all_movies)
    return Response(status=204)

@app.route("/movies_in_list", methods=["GET"])
def get_movies_by_list_id():
    try: 
        list_id = request.args['list_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Missing list id',
        })
        return retval
    
    try: 
        movies = db_get_movies_in_list(engine, list_id)
        return jsonify(movies)
    except:
        retval = jsonify({
            'message': 'DB Error: Failed to get movies in list',
        })
        return retval, 500 

@app.route("/user_lists", methods=["GET"])
def get_user_lists():
    # print("user_list")
    try: 
        user_id = request.get_json()['user_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Missing user id',
        })
        return retval

    user_lists = db_get_all_lists_user(engine, user_id)

    if user_lists: 
        return jsonify(user_lists)

    return Response(status=204)

@app.route("/user_lists", methods=["POST"])
def add_user_list(): 
    try: 
        data = request.get_json()
        print(data)
        user_id = data['user_id']
        list_name = data['list_name']
        print(user_id, list_name)
    except: 
        retval = jsonify({
            'message': 'Bad Request: Missing user id/list_name',
        })
        return retval

    try: 
        db_add_list(engine, user_id, list_name)
        return jsonify({
            'message': f"Successfully created list: {list_name}"
            }), 201
    except:
        retval = jsonify({
            'message': 'DB Error: The INSERT failed',
        })
        return retval, 500

@app.route("/user_lists", methods=["DELETE"])
def remove_user_list(): 
    try: 
        list_id = request.args["list_id"]
        print(list_id)
    except: 
        retval = jsonify({
            'message': 'Bad Request: Missing list id',
        })
        return retval

    db_remove_list(engine, list_id)
    return jsonify({
        'message': f"Successfully deleted list: {list_id}"
    }), 200


@app.route("/login", methods=["GET"])
def login_user():
    try: 
        username = request.args['username']
        password = request.args['password']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Username of Password doesnt exist',
        })
        return retval, 400
    result = db_login_user(engine, username, password)

    if result:
        return Response(status=200)
    
    return Response(status=404)

@app.route("/register", methods=["POST"])
def create_user():
    try: 
        username = request.args['username']
        password = request.args['password']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Username of Password doesnt exist',
        })
        return retval, 400
    try:
        result = db_create_user(engine, username, password)
        return Response(status=200)
    except:
        retval = jsonify({
            'message': 'Bad Request: Username Exists',
        })
        return retval, 409



