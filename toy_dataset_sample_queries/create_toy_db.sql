DROP DATABASE IF EXISTS toy_film_folios;

CREATE DATABASE toy_film_folios;

USE toy_film_folios;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(64) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL
);

LOAD DATA LOCAL INFILE 'users.csv'
  INTO TABLE users
  FIELDS TERMINATED BY ','
  IGNORE 1 ROWS;

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  releaseYear INT,
  title VARCHAR(256) NOT NULL,
  genres VARCHAR(256)
);

LOAD DATA LOCAL INFILE 'movies.csv'
  INTO TABLE movies
  FIELDS TERMINATED BY '|'
  IGNORE 1 ROWS;

DROP TABLE IF EXISTS likes;

CREATE TABLE likes (
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (user_id, movie_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

LOAD DATA LOCAL INFILE 'likes.csv'
  INTO TABLE likes
  FIELDS TERMINATED BY ','
  IGNORE 1 ROWS;

DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings (
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  stars INT, 

  CONSTRAINT validRating check(stars IS NULL OR (stars >= 1 AND stars <= 5)),

  PRIMARY KEY (user_id, movie_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

LOAD DATA LOCAL INFILE 'ratings.csv'
  INTO TABLE ratings
  FIELDS TERMINATED BY ','
  IGNORE 1 ROWS;

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  content VARCHAR(256) NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

LOAD DATA LOCAL INFILE 'comments.csv'
  INTO TABLE comments
  FIELDS TERMINATED BY '|'
  IGNORE 1 ROWS;

DROP TABLE IF EXISTS lists;

CREATE TABLE lists(
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  list_name VARCHAR(128) NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

LOAD DATA LOCAL INFILE 'lists.csv'
  INTO TABLE lists
  FIELDS TERMINATED BY ','
  IGNORE 1 ROWS;

DROP TABLE IF EXISTS listMovies;

CREATE TABLE listMovies (
  list_id INT NOT NULL,
  movie_id INT NOT NULL,

  PRIMARY KEY(list_id, movie_id),
  FOREIGN KEY(list_id) REFERENCES lists(id),
  FOREIGN KEY(movie_id) REFERENCES movies(id)
);
