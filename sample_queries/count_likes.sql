use toy_film_folios;

SELECT title, count(*) as likes FROM movies
  join likes on movies.id=likes.movie_id
  group by movies.id; 
