use toy_film_folios;

SELECT title as liked_movies FROM likes
  join movies 
  on likes.movie_id=movies.id
  where likes.user_id=1;
