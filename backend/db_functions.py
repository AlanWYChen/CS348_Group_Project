import os, re
from .db_connect import run_query

def db_get_all_movies(engine): 
    all_movies = run_query(engine, "SELECT title, id FROM movies ORDER BY title;", True)
    return all_movies

def db_get_movie_by_id(engine, movie_id): 
    movie_info = run_query(engine, f"SELECT id, release_date, title, genres from movies WHERE id={movie_id};", True)
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
    result = run_query(engine, f"SELECT * FROM lists WHERE user_id={user_id} and list_name='{list_name}';", True)
    if not result:
        run_query(engine, f"INSERT INTO lists(user_id, list_name) VALUES({user_id}, '{list_name}');", False)
        return True
    return False
    
def db_remove_list(engine, list_id): 
    return run_query(engine, f"DELETE FROM lists WHERE id={list_id};", False)

def db_create_user(engine, name, password):
    run_query(engine, f"insert into users(username, password) values (\'{name}\', \'{password}\');", False)
    return run_query(engine, f"SELECT id, username FROM users WHERE username=\'{name}\';", True)

def db_login_user(engine, name, password):
    return run_query(engine, f"SELECT id, username from users WHERE username=\'{name}\' AND password=\'{password}\';", True)

def db_create_comment(engine, user_id, movie_id, text):
    run_query(engine, f"insert  into comments(user_id, movie_id, content) values ({user_id}, {movie_id}, \'{text}\');", False)

def db_get_comments(engine, movie_id):
    return run_query(engine, f"Select username, content from comments c JOIN users u on u.id = c.user_id WHERE movie_id={movie_id};", True)

def db_get_rating(engine, user_id, movie_id):
    return run_query(engine, f"SELECT * FROM ratings WHERE user_id = {user_id} AND movie_id = {movie_id};", True)

def db_set_rating(engine, user_id, movie_id, stars):
    try:
        run_query(engine, f"INSERT INTO RATINGS(user_id, movie_id, stars) VALUES({user_id}, {movie_id}, {stars});", False)
    except:
        run_query(engine, f"UPDATE RATINGS SET stars={stars} WHERE user_id= {user_id} AND movie_id = {movie_id};", False)

def db_delete_rating(engine, user_id, movie_id):
    run_query(engine, f"DELETE FROM RATINGS WHERE user_id = {user_id} AND movie_id = {movie_id};", False)

def db_get_avg_rating(engine, movie_id):
    return run_query(engine, f"SELECT avg(stars) as avg_rating FROM ratings WHERE movie_id={movie_id}", True)

def db_get_all_movies_mitchy(engine, page): 
    all_movies = run_query(engine, "SELECT title, id FROM movies ORDER BY title;", True)[(page-1)*20:20*page]
    return all_movies

def db_get_all_likes(engine, movie_id):
    return run_query(engine, f"Select count(*) from likes WHERE movie_id={movie_id};", False)

def db_like_movie(engine, user_id, movie_id):
    run_query(engine, f"insert  into likes(user_id, movie_id) values ({user_id}, {movie_id});", False)

def db_unlike_movie(engine, user_id, movie_id):
    run_query(engine, f"DELETE FROM likes WHERE user_id={user_id} AND movie_id={movie_id};", False)

def db_add_movie_to_list(engine, movie_id, list_id):
    run_query(engine, f"insert  into listMovies(list_id, movie_id) values ({list_id}, {movie_id});", False)

def db_get_all_number_ratings(engine, movie_id):
    return run_query(engine, f"SELECT COUNT(*) FROM ratings WHERE movie_id = {movie_id};", False)

def db_remove_movie_from_list(engine, movie_id, list_id):
    run_query(engine, f"DELETE FROM listMovies WHERE movie_id={movie_id} AND list_id={list_id};", False)

def db_get_movies_paginated(engine, search_literal, page, entries_to_skip): 
    movies = run_query(engine, f'''select id, title 
                                    from movies 
                                    where movies.title like '%{search_literal}%'
                                    order by title
                                    limit {per_page_count}
                                    offset {entries_to_skip}; ''', True)
    return movies 

def db_get_directors(engine, movie_id):
    return run_query(engine, f'''
                     SELECT name from director d
                     JOIN movies m ON m.external_id = d.tconst
                     JOIN names n on d.nconst = n.nconst WHERE id={movie_id};''', True)

def db_get_genres(engine, movie_id):
    return run_query(engine, f'''
                     SELECT g.genres from genres g
                     JOIN movies m ON m.external_id = g.tconst
                     WHERE id={movie_id};''', True)

def db_get_cast(engine, movie_id):
    return run_query(engine, f'''
                     SELECT name from writers w
                     JOIN movies m ON m.external_id = w.tconst
                     JOIN names n on w.nconst = n.nconst WHERE id={movie_id};''', True)