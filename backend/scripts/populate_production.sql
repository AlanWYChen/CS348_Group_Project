use production_film_folio;

-- INSERT INTO users (id, username, password) VALUES
(1, 'Mitchell', 'Dolny'),
(2, 'Aumio', 'Islam'),
(3, 'Alan', 'Alookie'),
(4, 'Shriya', 'Kaistha');


-- Populate likes table
INSERT INTO likes (user_id, movie_id) VALUES
(1, 234),
(2, 567),
(3, 890),
(4, 1234),
(1, 1500),
(2, 2750),
(3, 4000),
(4, 4999),
(1, 250),
(2, 1750),
(3, 3000),
(4, 4500),
(1, 3500),
(2, 4250),
(3, 4750);

-- Populate ratings table
INSERT INTO ratings (user_id, movie_id, stars) VALUES
(1, 234, 1),
(2, 567, 2),
(3, 890, 3),
(4, 1234, 4),
(1, 1500, 5),
(2, 2750, 1),
(3, 4000, 2),
(4, 4999, 3),
(1, 250, 4),
(2, 1750, 5),
(3, 3000,5),
(4, 4500,4),
(1, 3500,3),
(2, 4250,2),
(3, 4750,1);

-- Populate comments table
INSERT INTO comments (user_id, movie_id, content) VALUES
(1, 1, 'Amazing movie, must watch!'),
(2, 2, 'A classic. Timeless masterpiece.'),
(3, 3, 'One of the best films ever made.'),
(4, 1, 'Life Changing!');

-- Populate lists table
INSERT INTO lists (user_id, list_name) VALUES
(1, 'Liked'),
(2, 'Liked'),
(3, 'Liked'),
(4, 'Liked'),
(1, 'Watchlist'),
(2, 'Watchlist'),
(3, 'Watchlist'),
(4, 'Watchlist'),
(1, 'Comedy'),
(2, 'Action'),
(3, 'Horror'),
(4, 'Romance');

-- Populate listMovies table
INSERT INTO listMovies (list_id, movie_id) VALUES
(1, 1),
(1, 2),
(2, 30),
(2, 60),
(3, 69),
(3, 169),
(4, 555),
(4, 666),
(5, 777);