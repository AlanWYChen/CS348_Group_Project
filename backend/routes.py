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
        return jsonify(movie)
    except:
        retval = jsonify({
            'message': 'DB Error: Failed to get movie Info ',
        })
        return retval, 500

    

@app.route("/all_movies", methods=["GET"])
def get_all_movies():
    all_movies = db_get_all_movies(engine)
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
    try: 
        user_id = request.args['user_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Missing user id',
        })
        return retval,404

    user_lists = db_get_all_lists_user(engine, user_id)

    return jsonify(user_lists), 200

@app.route("/user_lists", methods=["POST"])
def add_user_list(): 
    try: 
        user_id = request.args['user_id']
        list_name = request.args['list_name']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Missing user id/list_name',
        })
        return retval

    try: 
        if db_add_list(engine, user_id, list_name):
            return jsonify({
                'message': f"Successfully created list: {list_name}"
                }), 201
        else:
            retval = jsonify({
            'message': 'DB Error: Name Exists for List',
            })
            return retval, 400
    except:
        retval = jsonify({
            'message': 'DB Error: The INSERT failed',
        })
        return retval, 400

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
        return jsonify(result), 200
    
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
        return jsonify(result), 200
    except:
        retval = jsonify({
            'message': 'Bad Request: Username Exists',
        })
        return retval, 404

@app.route("/movie_comment", methods=["POST"])
def create_comment():
    try: 
        user = request.get_json()['user_id']
        movie = request.get_json()['movie_id']
        content = request.get_json()['content']
    except:
        
        retval = jsonify({
            'message': 'Bad Request: Not All Params Passed',
        })
        return retval, 400
    
    db_create_comment(engine, user, movie, content)
    
    return Response(status=200)

@app.route("/movie_comments", methods=["GET"])
def get_comments():
    try: 
        movie = request.args['movie_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Movie Not Found',
        })
        return retval, 400
    
    return jsonify(db_get_comments(engine, movie))

@app.route("/like_movie", methods=["POST"])
def toggle_like():
    try: 
        user = request.get_json()['user_id']
        movie = request.get_json()['movie_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Movie Not Found',
        })
        return retval, 400
    print(user, movie)
    try:
        db_like_movie(engine, user, movie)
    except:
        db_unlike_movie(engine, user, movie)
    
    return Response(status=200)

@app.route("/all_movies_mitchy", methods=["GET"])
def get_all_movies_mitchy():
    all_movies = db_get_all_movies_mitchy(engine)
    if all_movies: 
        return jsonify(all_movies)
    return Response(status=204)


@app.route("/add_movie_to_list", methods=["POST"])
def add_movie_to_list():
    try: 
        movie = request.args['movie_id']
        list = request.args['list_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Not All Params Passed',
        })
        return retval, 400
    
    db_add_movie_to_list(engine, movie, list)
    
    return Response(status=200)


@app.route("/add_rating", methods=["POST"])
def rating_add():
    try: 
        user = request.get_json()['user_id']
        movie = request.get_json()['movie_id']
        rating = request.get_json()['stars']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Not All Params Passed',
        })
        return retval, 400

    db_set_rating(engine, user, movie, rating)
    
    
    return Response(status=200)

@app.route("/delete_rating", methods=["POST"])
def rating_delete():
    try: 
        user = request.get_json()['user_id']
        movie = request.get_json()['movie_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Not All Params Passed',
        })
        return retval, 400

    db_delete_rating(engine, user, movie)
    
    return Response(status=200)


@app.route("/get_rating", methods=["GET"])
def get_rating():
    try: 
        user = request.args['user_id']
        movie = request.args['movie_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Movie Not Found',
        })
        return retval, 400
    
    return jsonify(db_get_rating(engine, user, movie))

@app.route("/get_avg_rating", methods=["GET"])
def get_avg_rating():
    try: 
        user = request.args['user_id']
        movie = request.args['movie_id']
    except: 
        retval = jsonify({
            'message': 'Bad Request: Movie Not Found',
        })
        return retval, 400
    
    return jsonify(db_get_avg_rating(engine, user, movie))


@app.route("/search", methods=["GET"])
def search_movie():

    try: 
        search_literal = request.args["filter"]
        page_num = request.args["page"] 
        per_page_count = request.args["count"] # number of movies to return for given page
    except: 
        retval = jsonify({
            'message': 'Bad Request: Parameters passed incorrectly',
        })
        return retval, 400

    entries_to_skip = per_page_count * (page_num - 1) 
    movies = db_get_movies_paginated(engine, search_literal, page_num, entries_to_skip)
    print(movies)
    return jsonify(movies), 200
