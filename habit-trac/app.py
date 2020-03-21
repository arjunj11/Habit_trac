# import necessary libraries
import os
import datetime as dt
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pymongo

# Flask Setup
app = Flask(__name__, static_url_path='/static')

# Use PyMongo to establish Mongo connection
conn='mongodb://heroku_0zrl06lj:egmnlm1vtil4nk48igf4gkqipd@ds141043.mlab.com:41043/heroku_0zrl06lj?retryWrites=false'
client = pymongo.MongoClient(conn)
db = client["habit_db"]
habit = db["habit"]
habit_dashboard = db["habit_dashboard"]
user_data = db["user_data"]
print("running")

#import psycopg2
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
# create route that renders country.html template
@app.route("/dashboard")
def dashboard():
    return render_template("/dashboard.html")
# create route that renders insights.html template
@app.route("/recommendations")
def recommendations():
    return render_template("/recommendations.html")
# create route that renders data.html template

@app.route("/api/habitadd/<userid>/<newhabit>/<priority>")
def habitadd(userid,newhabit,priority):
    datetoday=dt.date.today()

    insertdict = {
        "user_id":userid,
        "habit_name": newhabit,
        "habit_act_date": datetoday,
        "habit_priority": priority
    }

    # Update the Mongo database using update and upsert=True
    habit.insert_one(insertdict)

    result=habit.find()
    print(result)
    return jsonify(result)

# for the graph on Country page
@app.route("/api/updatedash")
def updatedashboard(grabhabitmod):
    session = Session(engine)
    results = session.query(Emissions.indicator, Emissions.unit,Emissions.country,Emissions.year,Emissions.value,Emissions.variable).\
        filter(grabindicator == Emissions.indicator).\
        filter(grabcountry == Emissions.country).all()
    return jsonify(dash_data)

# for the World graph on Home page 
@app.route("/api/updatereco")
def worldgraph(grabdash):
    session = Session(engine)
    results = session.query(Emissions.indicator, Emissions.unit,Emissions.country,Emissions.year,Emissions.value).\
        filter(grabindicator == Emissions.indicator).\
        filter("World" == Emissions.country).all()
    return jsonify(emission_data)


if __name__ == "__main__":
    app.run()
