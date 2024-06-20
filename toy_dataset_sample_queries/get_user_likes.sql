use toy_film_folios;

SELECT title as liked_movies FROM likes
  join movies 
  on likes.mid=movies.id
  where likes.uid=1;
