from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@/film_folio_sample'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from backend import models, routes
