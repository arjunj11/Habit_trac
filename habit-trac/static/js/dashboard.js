function loadpage(){
    var urlhabit = "/api/habitdisplay"
      d3.json(urlhabit).then(function(response){
        console.log(response)     // from the API it will get the json response as habit name, habit priority.
        response.forEach(row => {
          rowadd=d3.select("tbody").append("tr")
          rowadd.append("td").text(row.habit_name).append(graph);
          rowadd.append("td").text(row.habit_priority);
          rowadd.append("td").append("button").text("Yes");
       });
  })
  }
  loadpage()

function loadstheprogressbar(perc_result){
    
    return bar

}
  graph = loadstheprogressbar(asd)