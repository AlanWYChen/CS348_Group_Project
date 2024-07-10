# CS348 Project: FilmFolios

## Setting up the Devlopment Environment 

### Backend Dev Environment Setup
1. We use pixi to manage our python packages!
```brew install pixi```
2. Our `pixi.toml` file in the repo stores our python dependencies, so we can reproduce the necessary environment.
```pixi install```
3. Load the virtual python environment.
```eval $(pixi shell-hook)```

* Note this is configured for Apple Silicon. You may have to add your OS to `pixi.toml`

### MySQL Setup
1. Install `mysql` via package manager of choice. For example on MacOS, run `brew install mysql`.
2. Startup `mysql` services. For MacOS, run `brew services start mysql`.

### Creating the Dataset:

The following links were used to pull the data used in this application:
1. https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset 
2. https://developer.imdb.com/non-commercial-datasets/#titleakastsvgz 

a. The sample movies are any movie that contains the key word Iron man in the title of the movie. All the data manipulations are in the DataCleanup.R file and uses the above two links to clean up the IMDB dataset since there are a lot of non-english language movies present.  

b. The sample data is 3 users who have rated, liked, and commented on movies. With some of the users having a list they have created to save some movies. 

c. The production is all the movies from the following join with all of our group members as users who each has a respected list with movies. 

###  Load Toy Dataset of Movies Into Local MySQL Database and Run Sample Queries
1.  To create the toy database and load the toy dataset, go to directory `toy_dataset_sample_queries` and run 
```mysql --local-infile=1 -u root < create_toy_db.sql```

All the sample queries can be run from a shell script from the top level directory:
```./toy_dataset_sample_queries/test_sample_queries.sh```

Any of the sample queries can be individually run using the following command:
```mysql --local-infile=1 -u root --table < path_to_sample_queries.sql```

### Load Sample and Production Datasets into Sample and Production Databases
1. Create the database and tables.
```mysql -uroot < backend/sql/create_sample_db.sql```
* Can create production database with `create_production_db.sql` in the same directory. In general, the steps are the same, just replacing sample with production in the script names. For brevity we will just follow the instructions for setting up the sample database.

2. Populate the tables.
```python backend/scripts/populate_tables.py --path backend/sql/datasets```
By default, this populates the sample database. We can add a `--prod` flag to populate the production database.
```python backend/scripts/populate_tables.py --path backend/sql/datasets --prod```

3. Run the SQL scripts in `backend/scripts` to populate tables that don't depend on the dataset (ie user data, likes, comments etc).

# Front End Development

in myMovies/src/pages contains the pages used for the front end 
a. savedlist.tsx - contains the code required to run the Saved Lists tab 
b. viewlist.tsx - contains the code required to view a list from the list click on saved lists page 
c. movieinfo.tsx - contains the code required to view the information about a movie 
d. allmovies.tsx - contains the code for all the movies in the db (will be filtered based on user) 

# Endpoints

in backend contains the code used for the endpoints
a. db_functions.py contains the native sql queries 
b. db_connect.py contains a function that executes the queries in db_functions.py
c. routes.py contains the crud operations


## Example Query on Toy Dataset
Let's run the `count_likes.sql` sample query.
`mysql --local-infile=1 -u root --table < count_likes.sql`
```
+--------------+-------+
| title        | likes |
+--------------+-------+
| Oppenheimer  |     3 |
| Barbie       |     2 |
| Forrest Gump |     2 |
+--------------+-------+
```
