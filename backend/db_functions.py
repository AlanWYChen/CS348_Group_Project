import os, re
from db_connect import run_query

def get_movie_by_id(db, movie_id): 
    movie_info = run_query(db, "SELECT * from movies WHERE id=%s;" % (movie_id), True)
    return movie_info

#get all the movies from a given list_id
def get_movies_in_list(db, list_id):
    movies_in_list = run_query(db, '''SELECT Movies.id, Movies.title
                                 FROM Movies, (
                                    SELECT * 
                                    FROM listMovies 
                                    WHERE list_id=%s                     
                                 ) AS movies_in_list
                                 WHERE Movies.id = movies_in_list.movie_id
                                 ;''' % (list_id), True)
    return movies_in_list

# get all the movies from the DB and display in home page
def get_all_movies_db(db): 
    all_movies = run_query(db, "SELECT title, id from movies;", True)
    return all_movies