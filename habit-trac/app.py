# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_pymongo import PyMongo 

# Flask Setup
app = Flask(__name__, static_url_path='/static')

# Use PyMongo to establish Mongo connection
conn='mongodb://heroku_0zrl06lj:egmnlm1vtil4nk48igf4gkqipd@ds141043.mlab.com:41043/heroku_0zrl06lj'
client = PyMongo.MongoClient(conn)
db= client.habit_db
collection = db.

#import psycopg2
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
# create route that renders country.html template
@app.route("/dashboard")
def country():
    return render_template("/dashboard.html")
# create route that renders insights.html template
@app.route("/recommendations")
def insights():
    return render_template("/recommendations.html")
# create route that renders data.html template

@app.route("/api/habitmodify")
def habitmodify():
    session = Session(engine)
    results = session.query(Emissions.indicator,Emissions.country,Emissions.year).all()
    return jsonify(emission_data)
# for the graph on Country page
@app.route("/api/updatedash")
def updatedashboard(grabhabitmod):
    session = Session(engine)
    results = session.query(Emissions.indicator, Emissions.unit,Emissions.country,Emissions.year,Emissions.value,Emissions.variable).\
        filter(grabindicator == Emissions.indicator).\
        filter(grabcountry == Emissions.country).all()
    return jsonify(dash_data)

# for the World graph on Home page 
@app.route("/api/updatereco")
def worldgraph(grabdash):
    session = Session(engine)
    results = session.query(Emissions.indicator, Emissions.unit,Emissions.country,Emissions.year,Emissions.value).\
        filter(grabindicator == Emissions.indicator).\
        filter("World" == Emissions.country).all()
    return jsonify(emission_data)