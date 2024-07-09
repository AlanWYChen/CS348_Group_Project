from flask import request, Request, Response, jsonify

from backend import app

from db_functions import get_movie_by_id

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/movie", methods=['GET'])
def get_movie_from_id():
    if request.method == 'GET':
        id = request.get_json()['id']

        if id:
            movie = get_movie_by_id(id)
        else:
            return Response(status=204)

        if movie:
            return jsonify(movie)

    return Response(status=204)
