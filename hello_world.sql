CREATE DATABASE IF NOT EXISTS hello_world; 

use hello_world;

DROP TABLE IF EXISTS hello_world.team_details;

CREATE TABLE team_details (
  id INTEGER,
  full_name VARCHAR(64),
  abbreviation CHAR(3),
  nickname VARCHAR(32),
  city VARCHAR(32),
  state VARCHAR(32),
  year_founded INTEGER
); 

LOAD DATA LOCAL INFILE 'team.csv'
  INTO TABLE team_details
  FIELDS TERMINATED BY ','
  IGNORE 1 ROWS;
