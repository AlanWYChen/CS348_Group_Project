import os, re
from .db_connect import run_query

def db_get_all_movies(engine): 
    all_movies = run_query(engine, "SELECT title, id FROM movies ORDER BY title;", True)
    return all_movies

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


# get the names & ids of all of a given user's lists 
def db_get_all_lists_user(engine, user_id): 
    user_lists = run_query(engine, f'SELECT id, list_name FROM lists WHERE user_id={user_id};', True)
    return user_lists

def db_add_list(engine, user_id, list_name): 
    run_query(engine, f"INSERT INTO lists(user_id, list_name) VALUES({user_id}, '{list_name}');", False)

def db_remove_list(engine, list_id): 
    run_query(engine, f"DELETE FROM lists WHERE id={list_id};", False)