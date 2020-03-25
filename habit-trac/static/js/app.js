function loadpage(userid){
  var urlhabit = "/api/habitdisplay/" + userid
    d3.json(urlhabit).then(function(response){
      console.log(response)     // from the API it will get the json response as habit name, habit priority.
      response.forEach(row => {
        rowadd=d3.select("tbody").append("tr").attr("id",`habit${window.globalhabitcounter}`)
        rowadd.append("td").text(row.habit_name).attr("class",`habit${window.globalhabitcounter}`);
        rowadd.append("td").text(row.habit_priority);
        rowadd.append("td").append("button").text("Remove").attr("id",`habitrem${window.globalhabitcounter}`);
        window.globalhabitcounter++; 
     });
})
}
d3.json("api/count/habit").then(function(response){
  console.log(`current window.globalhabitcounter is ${response}`) // current value of the window.globalhabitcounter
  window.globalhabitcounter=response
  var userid=1
  loadpage(userid)
  mydoc = d3.select("html")
  mydoc.on("click",addorremove)
  
  // grabbing the habit and adding another row for the next option
  function addorremove(event){
    var clickedbutton = d3.event.target.id  // find which button is clicked
    console.log(clickedbutton)
  
    // putting underscores instead of spaces
    function spaces2_(habitsentence){
    words= habitsentence.split(' ')
    var habit_=''
    for (i=0;i<words.length;i++){
        if (i==0){ habit_=habit_ + words[i]}
        else {habit_=habit_ + '_'+ words[i]}
    }
    return(habit_)
    }
  
    if (clickedbutton == "add"){
  
      var newhabit  = d3.selectAll("#habitname").property("value")
      var userid  = 1 // Need to append the code for credentials
      var priority  = d3.selectAll("#habitpriority").property("value")
      
      newhabit2= spaces2_(newhabit)
      window.globalhabitcounter++ //counting the number of habits
      var urlhabit = "/api/habitadd/" + userid +"/"+ newhabit2 +"/"+ priority + "/" + window.globalhabitcounter
      console.log(urlhabit)  
      d3.json(urlhabit).then(function(response){
        console.log(response)     // from the API it will get the json response as habit name, habit priority.
        response.forEach(row => {
          rowadd=d3.select("tbody").append("tr").attr("id",`habit${window.globalhabitcounter}`)  // appending a row
          rowadd.append("td").text(row.habit_name).attr("class",`habit${window.globalhabitcounter}`)
          rowadd.append("td").text(row.habit_priority);
          rowadd.append("td").append("button").attr("id",`habitrem${window.globalhabitcounter}`).text("Remove")
       });
      });
    }
    else if(clickedbutton.slice(0,8) =="habitrem"){
      console.log(clickedbutton)
      num=clickedbutton.slice(8,9)
      var oldhabit  = d3.select(`.habit${num}`).text()
      var userid  = 1 // Need to append the code for credentials
      var oldhabit2= spaces2_(oldhabit)
      var urlhabitrem = "/api/habitrem/" + userid +"/"+ oldhabit2
      console.log(urlhabitrem)
      d3.json(urlhabitrem).then(function(response){
        console.log(response)      
      })
      var div = document.getElementById(`habit${num}`);
      div.remove()
  }
  }

})