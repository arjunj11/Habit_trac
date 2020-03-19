
var globalhabitcounter=0;
mydoc = d3.select("html")

mydoc.on("click",addorremove)

// grabbing the habit and adding another row for the next option
function addorremove(event){
  var clickedbutton = d3.event.target  // find which button is clicked
  console.log(clickedbutton)
}
// d3.select("#delete0").on("click",addhabit)
// function addhabit(event){
//   // find which button is clicked
//   console.log((d3.event.target.id).slice(7,8)  )
// }

if (clickedbutton == "#add*") {
  d3.select("#add").on("click",addhabit)
  function addhabit(){
    var habit  = d3.selectAll(`#habit${window.globalhabitcounter}`).property("value")
    var urlhabit = "/api/habitadd/" + habit
    console.log(urlhabit) 

    window.globalhabitcounter++ //counting the number of habits
    var row = d3.select("#habitcont").append("div").classed(`.row rownum${window.globalhabitcounter}`)
    row.append("div").classed(".col-md-10")
      .append("h3")
      .append("input").classed(".form-control").id(`#habit${window.globalhabitcounter}`).type("text")
    var row2=row.append("div").classed(".col-md-2")
    row2.append("button").id(`#delete${window.globalhabitcounter}`).text("Remove")
    row2.append("button").id(`#add${window.globalhabitcounter}`).text("Add")
  }
}
else if ( clickedbutton =="#delete*") {
  num=clickedbutton.slice(7,8)
  d3.select(`#delete${num}`).on("click",removehabit)  // grabbing the habit and remove that row
  function removehabit(){
    var habit  = d3.selectAll(`#habit${num}`).property("value")
    var urlhabit = "/api/habitremove/" + habit
    console.log(urlhabit) 

    d3.select("#habitcont").drop("div").classed(`.row rownum${num}`)
    
    d3.json(urlhabit).then(function(response){
      dashboard(response)
    })

}
}




