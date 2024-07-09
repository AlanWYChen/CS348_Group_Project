from flask import request, Request, Response, jsonify

from backend import app, db, engine

from .db_functions import *

@app.route("/")
def hello_world():
    return "<p>API Backend</p>"

@app.route("/movie", methods=['GET'])
def get_movie_from_id():
    print('here')
    id = request.get_json()['id']
    print(id)

    if id:
        print(id)
        print(engine)
        movie = db_get_movie_by_id(engine, id)
    else:
        return Response(status=204)

    if movie:
        return jsonify(movie)

    return Response(status=204)

@app.route("/all_movies", methods=["GET"])
def get_all_movies():
    all_movies = db_get_all_movies(engine)
    print(all_movies)
    if all_movies: 
        return jsonify(all_movies)
    return Response(status=204)

@app.route("/movies_in_list", methods=["GET"])
def get_movies_by_list_id():
    list_id = request.get_json()['list_id']
    if list_id:
        movies = db_get_movies_in_list(engine, list_id)
    else:
        return Response(status=204)

    if movies:
        return jsonify(movies)

    return Response(status=204)
