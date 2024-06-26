# CS348 Project: FilmFolios

## Setting up the Devlopment Environment 

Run the command `docker-compose up` to create a container with the backend services up and running

## Using Migrations 

1. `docker-compose --profile tools run create-migrate <name-of-migration>`. This command should be used to create a new migration. 
It will generate 2 files (up and down) in the migrations folder named as follows, `<sequence-number>_<name-of-migration>.up.sql`, `<sequence-number>_<name-of-migration>.down.sql`. 
The up.sql file is where you write the SQL script for the action you want to take
The down.sql is where you write the script for undoing the action taken by the counterpart .up file

2. Running the command `docker-compose --profile tools run migrate` will run all SQL migrations over the film-folio database. 
**_NOTE:_**  All the migrations will be run IN ORDER.

3. `docker-compose --profile tools run rollback-migrate` undoes the changes introduced by the last migration (i.e, the last numbered file in the migrations folder) and rolls back by 1 version. To rollback n versions, need to run this command n times. 

4. `docker-compose --profile tools run fix-migrate <version-number>` 
If either of commands 2(run migrate), 3(rollback migrate) fails,and the next command you run gives 'Dirty Database' error, indicates your database has been corrupted. 
 
To fix it, run this command, where the `<version_number> = the version number displayed in the error message`. Folow this commnad by 3(rollback-migrate), to return to the last stable version of the database. 

## MySQL Setup
1. Install `mysql` via package manager of choice. For example on MacOS, run `brew install mysql`.
2. Startup `mysql` services. For MacOS, run `brew services start mysql`.

##  Load Toy Dataset of Movies Into Local MySQL Database and Run Sample Queries
1.  To create the toy database and load the toy dataset, go to directory `toy_dataset_sample_queries` and run 
```mysql --local-infile=1 -u root < create_toy_db.sql```

All the sample queries can be run from a shell script from the top level directory:
```./toy_dataset_sample_queries/test_sample_queries.sh```

Any of the sample queries can be individually run using the following command:
```mysql --local-infile=1 -u root --table < path_to_sample_queries.sql```

## Example Query
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
