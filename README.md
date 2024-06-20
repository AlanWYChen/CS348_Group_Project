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


##  Load Sample Dataset of Movies into cockroach db
-[] TODO: update this!! 
1. Create sample database `hello_world`, and create a table `team_details` with the columns corresponding to the columns in `team.csv`. 
2. Next, allow mysql to load local files via the `local-infile` option and read the csv file into the `team_details` table. 

This can be done by running the sql script `hello_world.sql`, via the command:
```mysql --local-infile=1 -u root < hello_world.sql```

## Example Query
-[] TODO: Update this!!
`SELECT abbreviation as abbr, nickname as name, city FROM hello_world.team_details WHERE state='TEXAS'`

```
+------+-----------+-------------+
| abbr | name      | city        |
+------+-----------+-------------+
| DAL  | Mavericks | Dallas      |
| HOU  | Rockets   | Houston     |
| SAS  | Spurs     | San Antonio |
+------+-----------+-------------+
```