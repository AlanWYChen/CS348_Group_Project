use toy_film_folios;

SELECT title, AVG(stars) as average_rating from movies
  join ratings 
  on movies.id = ratings.mid
  group by movies.id;
