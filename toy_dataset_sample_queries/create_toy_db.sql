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
  uid INT NOT NULL,
  mid INT NOT NULL,
  PRIMARY KEY (uid, mid),
  FOREIGN KEY (uid) REFERENCES users(id),
  FOREIGN KEY (mid) REFERENCES movies(id)
);

LOAD DATA LOCAL INFILE 'likes.csv'
  INTO TABLE likes
  FIELDS TERMINATED BY ','
  IGNORE 1 ROWS;

DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings (
  uid INT NOT NULL,
  mid INT NOT NULL,
  stars INT, 

  CONSTRAINT validRating check(stars IS NULL OR (stars >= 1 AND stars <= 5)),

  PRIMARY KEY (uid, mid),
  FOREIGN KEY (uid) REFERENCES users(id),
  FOREIGN KEY (mid) REFERENCES movies(id)
);

LOAD DATA LOCAL INFILE 'ratings.csv'
  INTO TABLE ratings
  FIELDS TERMINATED BY ','
  IGNORE 1 ROWS;

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  uid INT NOT NULL,
  mid INT NOT NULL,
  content VARCHAR(256) NOT NULL,

  PRIMARY KEY (uid, mid),
  FOREIGN KEY (uid) REFERENCES users(id),
  FOREIGN KEY (mid) REFERENCES movies(id)
);

LOAD DATA LOCAL INFILE 'comments.csv'
  INTO TABLE comments
  FIELDS TERMINATED BY '|'
  IGNORE 1 ROWS;
