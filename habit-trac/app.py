# import necessary libraries
import os
from datetime import datetime
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_pymongo import PyMongo

# Flask Setup
app = Flask(__name__)
mongo = PyMongo(app,uri="mongodb://heroku_0zrl06lj:egmnlm1vtil4nk48igf4gkqipd@ds141043.mlab.com:41043/heroku_0zrl06lj", retryWrites=False)

# db = client["habit_db"]
# habit = db["habit"]
# habit_dashboard = db["habit_dashboard"]
# user_data = db["user_data"]
#removing the underscores from newhabit and putting spaces
def _2spaces(habit_):
    words= habit_.split('_')
    habitspaces=''
    for i in words:
        if (i==words[0]):
            habitspaces=habitspaces + i
        else:
            habitspaces=habitspaces + ' '+ i
    return(habitspaces)
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

@app.route("/api/habitadd/<userid>/<newhabit>/<priority>/<counter>")
def habitadd(userid,newhabit,priority,counter):
    tme=datetime.now()
    newhabit2=_2spaces(newhabit)
    insertdict = {
        "user_id":userid,
        "habit_id":counter,
        "habit_name": newhabit2,
        "habit_act_date": tme,
        "habit_priority": priority
    }
    # Update the Mongo database using update and upsert=True
    mongo.db.habit.insert(insertdict)
    query_list=[{
        "user_id":userid,
        "habit_id":counter,
        "habit_name": newhabit2,
        "habit_act_date": tme,
        "habit_priority": priority
    }]
    return jsonify(query_list)

@app.route("/api/habitdisplay/<userid>")
def habitdisplay(userid):
    query = mongo.db.habit.find()
    query_list=[]
    for x in query: 
        query_dict={}
        query_dict['user_id'] = x['user_id']
        query_dict['habit_id'] = x['habit_id']
        query_dict['habit_name'] = x['habit_name']
        query_dict['habit_act_date']= x['habit_act_date']
        query_dict['habit_priority']= x['habit_priority']
        query_list.append(query_dict)
    return jsonify(query_list)

@app.route("/api/count/habit")
def counthabit():
    y=mongo.db.habit.count()
    return jsonify(y)

@app.route("/api/habitrem/<userid>/<oldhabit>")
def habitremove(userid,oldhabit):
    oldhabit2=_2spaces(oldhabit)
    mongo.db.habit.delete_one({'user_id':userid,"habit_name":oldhabit2})
    result = "it is done"
    return jsonify(result)

# for the graph on Country page
# @app.route("/api/updatedash")
# def updatedashboard(grabhabitmod):
#     session = Session(engine)
#     results = session.query(Emissions.indicator, Emissions.unit,Emissions.country,Emissions.year,Emissions.value,Emissions.variable).\
#         filter(grabindicator == Emissions.indicator).\
#         filter(grabcountry == Emissions.country).all()
#     return jsonify(dash_data)

# # for the World graph on Home page 
# @app.route("/api/updatereco")
# def worldgraph(grabdash):
#     session = Session(engine)
#     results = session.query(Emissions.indicator, Emissions.unit,Emissions.country,Emissions.year,Emissions.value).\
#         filter(grabindicator == Emissions.indicator).\
#         filter("World" == Emissions.country).all()
#     return jsonify(emission_data)


if __name__ == "__main__":
    app.run()
