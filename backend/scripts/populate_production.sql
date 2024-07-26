use production_film_folio;

INSERT INTO users (id, username, password) VALUES
(1, 'Mitchell', 'Dolny'),
(2, 'Aumio', 'Islam'),
(3, 'Alan', 'Alookie'),
(4, 'Shriya', 'Kaistha');


-- Populate likes table
delete from likes;
INSERT INTO likes (user_id, movie_id) VALUES
(1, 234),
(2, 567),
(3, 890),
(4, 1234),
(1, 1500),
(2, 2750),
(3, 4000),
(4, 4500),
(1, 250),
(2, 1750),
(3, 3000),
(4, 444),
(1, 3500),
(2, 4250),
(3, 4750);

-- Populate ratings table
delete from ratings;
INSERT INTO ratings (user_id, movie_id, stars) VALUES
(1, 234, 1),
(2, 567, 2),
(3, 890, 3),
(4, 1234, 4),
(1, 1500, 5),
(2, 2750, 1),
(3, 4000, 2),
(4, 4540, 3),
(1, 250, 4),
(2, 1750, 5),
(3, 3000,5),
(4, 4500,4),
(1, 3500,3),
(2, 4250,2),
(3, 4750,1);

-- Populate comments table
delete from comments;
INSERT INTO comments (user_id, movie_id, content) VALUES
(1, 1, 'Amazing movie, must watch!'),
(2, 2, 'A classic. Timeless masterpiece.'),
(3, 3, 'One of the best films ever made.'),
(4, 1, 'Life Changing!');

-- Populate lists table
delete from lists;
INSERT INTO lists (user_id, list_name) VALUES
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
(1, 30),
(1, 60),
(1, 69),
(2, 169),
(2, 555),
(2, 666),
(2, 777);