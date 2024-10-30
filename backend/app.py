from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from backend.models import db
from backend.resources import TaskListResource, TaskResource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db.init_app(app)
CORS(app)
api = Api(app)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
