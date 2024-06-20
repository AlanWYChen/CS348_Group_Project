CREATE TABLE myMovieList (
    user_id VARCHAR(36) NOT NULL FOREIGN KEY REFERENCES USER(user_id),
    list_id VARCHAR(36) NOT NULL FOREIGN KEY REFERENCES LIST(list_id),
    movie_id VARCHAR(9) NOT NULL FOREIGN KEY REFERENCES MOVIES(movie_id),
    PRIMARY KEY (user_id, list_id)
);

INSERT INTO FAVORITE(user_id, list_id, movie_id)
VALUE(  "bba424e2-e0a1-445b-86bc-f8f2427bd7c4", 
        "24ec6dbb-ba9f-404d-8c8f-375277e0e80f",
        "tt0160127");

INSERT INTO FAVORITE(user_id, list_id, movie_id)
VALUE(  "bba424e2-e0a1-445b-86bc-f8f2427bd7c4", 
        "050f8dae-af02-4e44-b24a-8cc72e1473fe",
        "tt0167260");

DELETE FROM FAVORITE WHERE (user_id = "0652905f-ac23-4a3c-afc8-0c585d261636" AND 
                            list_id = "8cd2997e-1fb5-4449-b6d0-acdc005c5fa9" AND 
                            mId = "tt1034303");