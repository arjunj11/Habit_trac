function loadpage(userid){
    var urlhabit = "/api/habitdashboarddisplay/"+userid
    d3.json(urlhabit).then(function(response){
      console.log(response)     // from the API it will get the json response as habit name, habit priority.
      response.forEach(row => {
        var rowadd=d3.select("tbody").append("tr").attr("class",`${row.habit_id}`)
        rowadd.append("td").text(row.habit_name).attr("id",`habitname${row.habit_id}`);
        rowadd.append("td").text(row.habit_priority);
        rowbutton=rowadd.append("td")
        if(row.habit_confirm == 'Yes'){
          rowbutton.append("button").text("Yes").attr("id",`yes${row.habit_id}`)
            .property("style","background-color:green; border-color:blue; color:white")
          rowbutton.append("a").text(" or ")
          rowbutton.append("button").text("No").attr("id",`no${row.habit_id}`);
        }
        else{
          rowbutton.append("button").text("No").attr("id",`no${row.habit_id}`)
            .property("style","background-color:red; border-color:blue; color:white")
          rowbutton.append("a").text(" or ")
          rowbutton.append("button").text("Yes").attr("id",`yes${row.habit_id}`)
        }
        
      });
    })
}
var userid=1
loadpage(userid)

mydoc = d3.select("html")
console.log("running")
mydoc.on("click",yesorno)

function yesorno(event){
  var clickedbutton = d3.event.target.id  // find which button is clicked
  console.log(clickedbutton)

  if (clickedbutton.slice(0,3)=='yes'){
    var num = clickedbutton.slice(3)
    console.log(num)
    d3.json(`/api/updatedashboard/${userid}/${clickedbutton.slice(0,3)}/${num}`).then(function(response){
      console.log(response)
    })
    d3.select(`#yes${num}`).attr("style","background-color:green; border-color:blue; color:white")
    d3.select(`#no${num}`).attr("style","")
  }
  else{
    var num = clickedbutton.slice(2)
    console.log(num)
    d3.json(`/api/updatedashboard/${userid}/${clickedbutton.slice(0,2)}/${num}`).then(function(response){
      console.log(response)
    })
    d3.select(`#no${num}`).attr("style","background-color:red; border-color:blue; color:white")
    d3.select(`#yes${num}`).attr("style","")
  }
}




function loadstheprogressbar(perc_result){
    progressbar=perc_result
    return progressbar

}