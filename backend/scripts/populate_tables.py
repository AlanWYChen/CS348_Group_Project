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

                date_str = row['rel_date']
                release_date = f"'{date_str}'" if date_str else 'NULL'

                start_year_str = row['startYear']
                start_year = f"'{int(start_year_str)}'" if start_year_str.isdigit() else 'NULL' 

                genres = row['genres']
                external_id = row['tconst']

                command = (
                        "INSERT INTO MOVIES (release_year, is_adult, external_id, release_date, title, genres)"
                        " VALUES ("
                        f"{start_year}, '{is_adult}', '{external_id}', {release_date}, '{title}', '{genres}'"
                        ");"
                        )

                query = text(command)

                conn.execute(query)


        conn.commit()
