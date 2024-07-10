use sample_film_folio;

-- Part A
SELECT title, count(*) as likes FROM movies
  join likes on movies.id=likes.movie_id
  group by movies.id; 

-- Part B
insert into likes (user_id, movie_id) VALUES (1,2);
Select * from likes;

DELETE FROM likes where user_id=1 and movie_id=2;

SELECT * FROM likes;
Delete from likes where user_id = 1 and movie_id = 2;

-- Part C
SELECT title, release_year FROM movies WHERE genres LIKE '%action%' limit 10;

-- Part D
SELECT title, username, content from movies
  join comments 
  on movies.id=comments.movie_id
  join users 
  on users.id=comments.user_id
  where movies.id=2;

-- Part E
SELECT title, AVG(stars) as average_rating from movies
  join ratings 
  on movies.id = ratings.movie_id
  group by movies.id;

-- Part F

select * from lists;
INSERT INTO lists(user_id, list_name)
VALUE(3, 'a third list');
select * from lists;
delete from lists where user_id = 3 AND list_name = 'a third list';

-- Part G

Delete from listMovies where list_id = 1 and movie_id = 1;
Delete from listMovies where list_id = 1 and movie_id = 2;
Delete from listMovies where list_id = 1 and movie_id = 3;
Delete from listMovies where list_id = 2 and movie_id = 1;

SELECT * FROM listMovies where list_id = 1 or list_id = 2 LIMIT 10;
INSERT INTO listMovies(list_id, movie_id)
  VALUES
  (1,1),
  (1,2),
  (1,3),
  (2,1),
  (2,3);
SELECT * FROM listMovies where list_id = 1 or list_id = 2 LIMIT 10;

Delete from listMovies where list_id = 1 and movie_id = 1;
Delete from listMovies where list_id = 1 and movie_id = 2;
Delete from listMovies where list_id = 1 and movie_id = 3;
Delete from listMovies where list_id = 2 and movie_id = 1;

-- Part H

SELECT * FROM listMovies where list_id=2;
DELETE FROM listMovies WHERE list_id=2 AND movie_id=3;
SELECT * FROM listMovies where list_id=2;



