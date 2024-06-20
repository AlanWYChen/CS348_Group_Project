#!/bin/bash

echo "Loading toy dataset into database..."

mysql --local-infile=1 -u root < create_toy_db.sql

echo -e "\nSuccessfully loaded... see sample user table"
mysql --local-infile=1 -u root -e "use toy_film_folios; select * from users;"

echo -e "\nInserting new users to the user table..."
mysql --local-infile=1 -u root --table < create_user.sql

echo -e "\nNow attempting to insert duplicate username into users table..."
mysql --local-infile=1 -u root --table < create_user_failed.sql
echo -e "Attempt failed as expected..."

echo -e "\nNow let's work with our likes table..."
echo -e "Here is the original likes table loaded from a csv file"
mysql --local-infile=1 -u root -e "use toy_film_folios; select * from likes;"
echo -e "\nAdding likes..."
mysql --local-infile=1 -u root --table < add_like.sql
echo -e "\nFinding all of a user's (user 1) likes"
mysql --local-infile=1 -u root --table < get_user_likes.sql
echo -e "\nRemoving like (1,2)..."
mysql --local-infile=1 -u root --table < delete_like.sql
echo -e "\nFinding all of a user's (user 1) likes"
mysql --local-infile=1 -u root --table < get_user_likes.sql
echo -e "Barbie has been removed from user 1's likes!"

echo -e "\nNow let's aggregate ratings..."
mysql --local-infile=1 -u root --table < get_average_ratings.sql
echo -e "Adding more ratings..."
mysql --local-infile=1 -u root --table < add_ratings.sql
echo -e "Notice the average ratings have changed"
mysql --local-infile=1 -u root --table < get_average_ratings.sql
echo -e "Let's make sure that our constraint for ratings hold by inserting a rating > 5"
mysql --local-infile=1 -u root --table < failed_create_ratings.sql
echo -e "Attempt failed as expected..."

echo -e "\nLet's get all comments for Barbie (movie 2)!"
mysql --local-infile=1 -u root --table < get_movie_comments.sql

echo -e "\nLet's get all dramas in our database!"
mysql --local-infile=1 -u root --table < filter_movies_by_genre.sql
