# import necessary libraries
import os
from datetime import date
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
    datetoday = date.today()
    tme = datetoday.strftime("%m/%d/%Y")
    newhabit2=_2spaces(newhabit)
    insertdict = {
        "user_id":userid,
        "habit_id":counter,
        "habit_name": newhabit2,
        "habit_act_date": tme,
        "habit_priority": priority
    }
    # Insert this entry in Habit database 
    mongo.db.habit.insert_one(insertdict)
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
    y=mongo.db.habit.count_documents({})
    return jsonify(y)

@app.route("/api/habitrem/<userid>/<oldhabit>")
def habitremove(userid,oldhabit):
    oldhabit2=_2spaces(oldhabit)
    mongo.db.habit.delete_one({'user_id':userid,"habit_name":oldhabit2})
    result = "deleted"
    return jsonify(result)

@app.route("/api/habitdashboarddisplay/<userid>")
def habitdashboarddisplay(userid):
    datetoday = date.today()
    tme = datetoday.strftime("%m/%d/%Y")
    query = mongo.db.habit.find({'user_id':userid})  # get all the habits from habit table
    return_list=[]
    flag=False
    for eachrow in query:
        query2=mongo.db.habit_dashboard.find({'user_id':userid}) # get all entries from habit_dashboard
        for eachrow2 in query2: 
                       
            if ((eachrow['habit_id'] == eachrow2['habit_id']) and (eachrow2['date'] ==tme)): 
                return_dict={}
                return_dict['habit_name']=eachrow['habit_name']
                return_dict['habit_id']=eachrow['habit_id']
                return_dict['habit_priority']=eachrow['habit_priority']
                return_dict['habit_confirm']=eachrow2['habit_confirm']
                return_list.append(return_dict)
                flag=True
            
        if ((flag==False)): # if the date is not the current date it will add another entry for that habit ID in habit_dashboard table
            mongo_dict={}
            return_dict={}
            mongo_dict['user_id']=eachrow['user_id']
            mongo_dict['habit_id'] = eachrow['habit_id']
            mongo_dict['date'] = tme 
            mongo_dict['habit_confirm']='No'
            mongo.db.habit_dashboard.insert_one(mongo_dict)
            
            return_dict['habit_name']=eachrow['habit_name']
            return_dict['habit_id']=eachrow['habit_id']
            return_dict['habit_priority']=eachrow['habit_priority']
            return_dict['habit_confirm']='No'
            return_list.append(return_dict)
        flag=False
    print(return_list)
    return jsonify(return_list)

@app.route("/api/updatedashboard/<userid>/<yesorno>/<habitid>")
def updatedash(userid,yesorno,habitid):
    datetoday = date.today()
    tme = datetoday.strftime("%m/%d/%Y")
    if (yesorno=='yes'):
        mongo.db.habit_dashboard.update_one({"user_id":userid,"habit_id":habitid,"date":tme},{"$set":{'habit_confirm':'Yes'}})
    else:
        mongo.db.habit_dashboard.update_one({"user_id":userid,"habit_id":habitid,"date":tme},{"$set":{'habit_confirm':'No'}})
        
    result = "updated yesorno"
    return jsonify(result)

if __name__ == "__main__":
    app.run()
