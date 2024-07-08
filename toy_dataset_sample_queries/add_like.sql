use toy_film_folios;

INSERT INTO likes(user_id, movie_id)
  VALUES
    (1, 2),
    (3, 1),
    (3, 2),
    (3, 3);

select * from likes;
