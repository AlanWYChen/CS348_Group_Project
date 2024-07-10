use toy_film_folios;

SELECT title, username, content from movies
  join comments 
  on movies.id=comments.movie_id
  join users 
  on users.id=comments.user_id
  where movies.id=2;
