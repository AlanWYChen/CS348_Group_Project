USE film_folio_sample;

-- Populate users table
INSERT INTO users (username, password) VALUES
('john_doe', 'password123'),
('jane_doe', 'password456'),
('alice', 'password789');

-- Populate movies table
INSERT INTO movies (release_year, is_adult, external_id, release_date, title, genres) VALUES
(2010, 0, 'tt1228705 ', '2010-04-28 ', 'Iron Man', 'Action,Sci-Fi'),
(1972, 0, 'tt0068646', '1972-03-24', 'The Godfather', 'Crime, Drama'),
(2008, 0, 'tt0468569', '2008-07-18', 'The Dark Knight', 'Action, Crime, Drama');

-- Populate likes table
INSERT INTO likes (user_id, movie_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 3);

-- Populate ratings table
INSERT INTO ratings (user_id, movie_id, stars) VALUES
(1, 1, 5),
(1, 3, 5),
(2, 2, 4),
(3, 3, 5);

-- Populate comments table
INSERT INTO comments (user_id, movie_id, content) VALUES
(1, 1, 'Amazing movie, must watch!'),
(2, 2, 'A classic. Timeless masterpiece.'),
(3, 3, 'One of the best superhero films ever made.');

-- Populate lists table
INSERT INTO lists (user_id, list_name) VALUES
(1, 'Liked'),
(2, 'Watchlist');

-- Populate listMovies table
INSERT INTO listMovies (list_id, movie_id) VALUES
(1, 1),
(1, 3),
(2, 2);