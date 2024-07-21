from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import create_engine
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@/sample_film_folio'
db = SQLAlchemy(app)
CORS(app)
migrate = Migrate(app, db)
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

from backend import routes 
