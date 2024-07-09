import os, re
from .db_connect import run_query

def db_get_movie_by_id(engine, movie_id): 
    movie_info = run_query(engine, "SELECT * from movies WHERE id=%s;" % (movie_id), True)
    return movie_info

#get all the movies from a given list_id
def db_get_movies_in_list(engine, list_id):
    movies_in_list = run_query(engine, '''SELECT Movies.id, Movies.title
                                 FROM Movies, (
                                    SELECT * 
                                    FROM listMovies 
                                    WHERE list_id=%s                     
                                 ) AS movies_in_list
                                 WHERE Movies.id = movies_in_list.movie_id
                                 ;''' % (list_id), True)
    return movies_in_list

# get all the movies from the DB and display in home page
def db_get_all_movies(engine): 
    all_movies = run_query(db, "SELECT title, id FROM movies ORDER BY title;", True)
    return all_movies
