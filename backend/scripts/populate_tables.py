import argparse
import os 
import csv

from sqlalchemy import create_engine, text

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='populate sample or production db')
    parser.add_argument('--prod', action='store_true', help='populate sample db')
    parser.add_argument('--path', type=str, help='path to datasets folder')

    args = parser.parse_args()

    db_type = (
                "production"
                if args.prod
                else "sample"
            )
    
    db = create_engine(f"mysql+mysqlconnector://root@/{db_type}_film_folio")

    dataset_zip = os.path.join(args.path, f"{db_type}_dataset.zip")

    os.system(f"(cd {os.path.dirname(dataset_zip)} && unzip -o {os.path.basename(dataset_zip)})")

    with db.connect() as conn:
        movie_csv_name = ("movies.csv" if args.prod else "sample_movies.csv")
        with open(os.path.join(args.path, movie_csv_name), mode='r', newline='') as file:
            reader = csv.DictReader(file); next(reader)

            for row in reader:
                row = { k: None if not v or v == 'NaN' else v for k, v in row.items() }

                escape_quote = lambda x: x.replace('\'', '\'\'') if x else ''
                row = { k: escape_quote(v) for k, v in row.items() }

                title = row['primaryTitle']
                is_adult = row['isAdult']

                date_str = row['release_date']
                release_date = f"'{date_str}'" if date_str else 'NULL'

                start_year_str = row['startYear']
                start_year = f"'{int(start_year_str)}'" if start_year_str.isdigit() else 'NULL' 

                genres = row['genre_names']
                external_id = row['tconst']

                command = (
                        "INSERT INTO MOVIES (release_year, is_adult, external_id, release_date, title, genres)"
                        " VALUES ("
                        f"{start_year}, '{is_adult}', '{external_id}', {release_date}, '{title}', '{genres}'"
                        ");"
                        )

                query = text(command)

                conn.execute(query)


        names_csv_name = ("names.csv" if args.prod else "sample_names.csv")
        with open(os.path.join(args.path, names_csv_name), mode='r', newline='') as file:
            reader = csv.DictReader(file); next(reader)

            for row in reader:
                row = { k: None if not v or v == 'NaN' else v for k, v in row.items() }

                escape_quote = lambda x: x.replace('\'', '\'\'') if x else ''
                row = { k: escape_quote(v) for k, v in row.items() }

                nconst = row['nconst']
                name = row['primaryName']

                command = (
                        "INSERT INTO names (nconst, name)"
                        " VALUES ("
                        f"'{nconst}', '{name}'"
                        ");"
                        )

                query = text(command)

                conn.execute(query)
        
                
        director_csv_name = ("director.csv" if args.prod else "sample_director.csv")
        with open(os.path.join(args.path, director_csv_name), mode='r', newline='') as file:
            reader = csv.DictReader(file); next(reader)

            for row in reader:
                row = { k: None if not v or v == 'NaN' else v for k, v in row.items() }

                escape_quote = lambda x: x.replace('\'', '\'\'') if x else ''
                row = { k: escape_quote(v) for k, v in row.items() }

                tconst = row['tconst']
                directors = row['directors']

                command = (
                        "INSERT INTO director (tconst, nconst)"
                        " VALUES ("
                        f"'{tconst}', '{directors}'"
                        ");"
                        )

                query = text(command)

                conn.execute(query)
        # Cast
        cast_csv_name = ("writers.csv" if args.prod else "sample_writers.csv")
        with open(os.path.join(args.path, cast_csv_name), mode='r', newline='') as file:
            reader = csv.DictReader(file); next(reader)

            for row in reader:
                row = { k: None if not v or v == 'NaN' else v for k, v in row.items() }

                escape_quote = lambda x: x.replace('\'', '\'\'') if x else ''
                row = { k: escape_quote(v) for k, v in row.items() }

                tconst = row['tconst']
                writers = row['writers']

                command = (
                        "INSERT INTO writers (tconst, nconst)"
                        " VALUES ("
                        f"'{tconst}', '{writers}'"
                        ");"
                        )

                query = text(command)

                conn.execute(query)

        
        # Genre
        genres_csv_name = ("genres.csv" if args.prod else "sample_genres.csv")
        with open(os.path.join(args.path, genres_csv_name), mode='r', newline='') as file:
            reader = csv.DictReader(file); next(reader)

            for row in reader:
                row = { k: None if not v or v == 'NaN' else v for k, v in row.items() }

                escape_quote = lambda x: x.replace('\'', '\'\'') if x else ''
                row = { k: escape_quote(v) for k, v in row.items() }

                id = row['tconst']
                genres = row['genres']

                command = (
                        "INSERT INTO genres (tconst, genres)"
                        " VALUES ("
                        f"'{id}', '{genres}'"
                        ");"
                        )

                query = text(command)

                conn.execute(query)


        conn.commit()
