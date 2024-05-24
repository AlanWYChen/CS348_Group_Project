# CS348_Group_Project

# MySQL Setup
1. Install `mysql` via package manager of choice. For example on MacOS, run `brew install mysql`.
2. Startup `mysql` services. For MacOS, run `brew services start mysql`.

#  Load Sample Dataset of NBA Teams into MySQL
1. Create sample database `hello_world`, and create a table `team_details` with the columns corresponding to the columns in `team.csv`. 
2. Next, allow mysql to load local files via the `local-infile` option and read the csv file into the `team_details` table. 

This can be done by running the sql script `hello_world.sql`, via the command:
`mysql --local-infile=1 -u root < hello_world.sql`

# Example Query
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
