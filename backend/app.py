from flask import Flask, jsonify, request, Response
from db_functions import *
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'film_folio_sample'

db = MySQL(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/movie", methods=['GET'])
def get_movie_from_id():
    id = request.args.get('id')

    if id:
        movie = get_movie_by_id(db, id)
    else:
        return Response(status=204)

    if movie:
        return jsonify(movie)

    return Response(status=204)

@app.route("/all_movies", methods=["GET"])
def get_all_movies():
    all_movies = get_all_movies_db(db)
    print(all_movies)
    if all_movies: 
        return jsonify(all_movies)
    return Response(status=204)

@app.route("/movies_in_list", methods=["GET"])
def get_movies_by_list_id():
    list_id = request.args.get('list_id')
    if list_id:
        movies = get_movies_in_list(db, list_id)
    else:
        return Response(status=204)

    if movies:
        return jsonify(movies)

    return Response(status=204)
