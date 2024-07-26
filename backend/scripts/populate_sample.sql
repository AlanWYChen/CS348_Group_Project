use sample_film_folio;

delete from listmovies;
delete from lists;
delete from likes;
delete from comments;
delete from ratings;
delete from users;

INSERT INTO users (id, username, password) VALUES
(1, 'Mitchell', 'Dolny'),
(2, 'Aumio', 'Islam'),
(3, 'Alan', 'Alookie');


-- Populate likes table
INSERT INTO likes (user_id, movie_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 1);

-- Populate ratings table
INSERT INTO ratings (user_id, movie_id, stars) VALUES
(1, 1, 5),
(1, 2, 5),
(2, 2, 4),
(3, 1, 5);

-- Populate comments table
INSERT INTO comments (user_id, movie_id, content) VALUES
(1, 1, 'Amazing movie, must watch!'),
(2, 2, 'A classic. Timeless masterpiece.'),
(3, 1, 'One of the best superhero films ever made.');

-- Populate lists table
INSERT INTO lists (user_id, list_name) VALUES
(1, 'Romance'),
(2, 'Watchlist');

-- Populate listMovies table
INSERT INTO listMovies (list_id, movie_id) VALUES
(1, 1),
(1, 2),
(2, 2);