from backend import app, db
from backend.models.movie import Movie

import argparse
import datetime
import csv

SAMPLE_DB_URI = 'mysql+mysqlconnector://root@/film_folio_sample'

def main():
    parser = argparse.ArgumentParser(description='Load data into Movie model from a CSV file.')
    parser.add_argument('csv_path', type=str, help='Path to the CSV file')

    args = parser.parse_args()

    path = args.csv_path

    engine = db.create_engine(SAMPLE_DB_URI)

    with app.app_context():
        db.create_all()
        with open(path, mode='r', newline='') as file:
            reader = csv.DictReader(file); next(reader)

            for row in reader:
                release_date = datetime.datetime.strptime(row['rel_date'], '%Y-%m-%d').date()

                movie = Movie(
                    id=row['id'],
                    title=row['primaryTitle'],
                    is_adult=row['isAdult'] == 1,
                    release_date=release_date,
                    start_year=int(row['startYear']),
                    genres=row['genres'],
                    external_id=row['tconst']
                )

                db.session.add(movie)

        db.session.commit()

if __name__=='__main__':
    main()
