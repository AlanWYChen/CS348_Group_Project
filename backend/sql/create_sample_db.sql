DROP DATABASE IF EXISTS sample_film_folio;

CREATE DATABASE sample_film_folio;

USE sample_film_folio;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(64) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL
);

DROP TRIGGER IF EXISTS sample_film_folio.addDefaultList; 

delimiter |
CREATE TRIGGER addDefaultList AFTER INSERT ON users
  FOR EACH ROW
  BEGIN
    INSERT into lists(user_id, list_name) VALUES(NEW.id , 'Liked');
  END;
|

delimiter ;

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  release_year INT,
  is_adult TINYINT(1),
  external_id VARCHAR(16),
  release_date DATE,
  title VARCHAR(256) NOT NULL,
  genres VARCHAR(256)
);

DROP TABLE IF EXISTS likes;

CREATE TABLE likes (
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (user_id, movie_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

CREATE TABLE ratings (
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  stars INT, 

  CONSTRAINT validRating check(stars IS NULL OR (stars >= 1 AND stars <= 5)),

  PRIMARY KEY (user_id, movie_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  content VARCHAR(256) NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

DROP TABLE IF EXISTS lists;

CREATE TABLE lists(
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  list_name VARCHAR(128) NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE (user_id ,list_name)
);

DROP TABLE IF EXISTS listMovies;

CREATE TABLE listMovies (
  list_id INT NOT NULL,
  movie_id INT NOT NULL,

  PRIMARY KEY(list_id, movie_id),
  FOREIGN KEY(list_id) REFERENCES lists(id),
  FOREIGN KEY(movie_id) REFERENCES movies(id)
);

DROP TABLE IF EXISTS names;

CREATE TABLE names (
  nconst VARCHAR(16),
  name VARCHAR(128) NOT NULL,

  PRIMARY KEY(nconst)
);

DROP TABLE IF EXISTS director;

CREATE TABLE director (
  tconst VARCHAR(16),
  nconst VARCHAR(16),

  PRIMARY KEY(tconst, nconst)
);

DROP TABLE IF EXISTS writers;

CREATE TABLE writers (
  tconst VARCHAR(16),
  nconst VARCHAR(16),

  PRIMARY KEY(tconst, nconst)
);

DROP TABLE IF EXISTS genres;

CREATE TABLE genres (
  tconst VARCHAR(16),
  genres VARCHAR(50) NOT NULL,

  PRIMARY KEY(tconst, genres)
);
