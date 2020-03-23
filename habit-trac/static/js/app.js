
function loadpage(){
  var urlhabit = "/api/habitdisplay"
    d3.json(urlhabit).then(function(response){
      console.log(response)     // from the API it will get the json response as habit name, habit priority.
      response.forEach(row => {
        rowadd=d3.select("tbody").append("tr")
        rowadd.append("td").text(window.globalhabitcounter);
        rowadd.append("td").text(row.habit_name);
        rowadd.append("td").text(row.habit_priority);
        rowadd.append("td").append("button").text("Remove");
     });
})
}
loadpage()

var globalhabitcounter=0;
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
    var urlhabit = "/api/habitadd/" + userid +"/"+ newhabit2 +"/"+ priority
    console.log(urlhabit)  
    d3.json(urlhabit).then(function(response){
      console.log(response)     // from the API it will get the json response as habit name, habit priority.
      response.forEach(row => {
        rowadd=d3.select("tbody").append("tr")
        rowadd.append("td").text(window.globalhabitcounter);
        rowadd.append("td").text(row.habit_name); //.classed(`habit${window.globalhabitcounter}`)
        rowadd.append("td").text(row.habit_priority);
        rowadd.append("td").append("button").text("Remove"); //.id(`delete${window.globalhabitcounter}`)
     });
});
}
else if(clickedbutton.slice(0,6) =="delete"){
  console.log(clickedbutton.slice(6,7))
  num=clickedbutton.slice(6,7)
  var oldhabit  = d3.selectAll(`.habit${num}`).text()
  var userid  = 1 // Need to append the code for credentials
  var urlhabitrem = "/api/habitrem/" + userid +"/"+ oldhabit
  console.log(urlhabitrem)
  d3.json(urlhabitrem).then(function(response){
    console.log(response)
  })
  // var div = document.getElementById(`habit${num}`);
  // div.remove()
    
}
}
//   else if( clickedbutton)


// }

// d3.select("#delete0").on("click",addhabit)
// function addhabit(event){
//   // find which button is clicked
//   console.log((d3.event.target.id).slice(7,8)  )
// }

// if (clickedbutton == "#add*") {
//   d3.select("#add").on("click",addhabit)
//   function addhabit(){
//     var habit  = d3.selectAll(`#habit${window.globalhabitcounter}`).property("value")
//     var urlhabit = "/api/habitadd/" + habit
//     console.log(urlhabit) 

//     window.globalhabitcounter++ //counting the number of habits
//     var row = d3.select("#habitcont").append("div").classed(`row rownum${window.globalhabitcounter}`)
//     row.append("div").classed("col-md-10")
//       .append("h3")
//       .append("input").classed("form-control").id(`habit${window.globalhabitcounter}`).type("text")
//     var row2=row.append("div").classed("col-md-2")
//     row2.append("button").id(`#delete${window.globalhabitcounter}`).text("Remove")
//     row2.append("button").id(`#add${window.globalhabitcounter}`).text("Add")
//   }
// }
// else if ( clickedbutton =="#delete*") {
//   num=clickedbutton.slice(7,8)
//   d3.select(`#delete${num}`).on("click",removehabit)  // grabbing the habit and remove that row
//   function removehabit(){
//     var habit  = d3.selectAll(`#habit${num}`).property("value")
//     var urlhabit = "/api/habitremove/" + habit
//     console.log(urlhabit) 

//     d3.select("#habitcont").drop("div").classed(`.row rownum${num}`)
    
//     d3.json(urlhabit).then(function(response){
//       dashboard(response)
//     })

// }