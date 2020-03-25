

//assume enter_date is '2020-3-20' - need arjun's help to get from database and how to count the Y in the habit
//but right now if we chang enter_date and habit_Y below it works too. that means the function works
var enter_date = '2020-3-22'
var habit_Y = 3

// //get today's date
var today = new Date();
var current_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//tramsform the date type here and get absolute difference
const date1 = new Date(enter_date);
const date2 = new Date(current_date);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(diffDays);
//assume habit_Y is 3 -- need Arjun's help to get from database

//calculate the %
var total_number_days = diffDays + 1
var percetage_progress = (habit_Y/total_number_days)*100

console.log(percetage_progress)

var data = [100,percetage_progress]; // here are the data values;


console.log(data)
  
var chart = d3.select("#container").append("svg") // creating the svg object inside the container div
    .attr("class", "chart")
    .attr("width", 200) // bar has a fixed width
    .attr("height", 20 * data.length);
  
var x = d3.scale.linear() // takes the fixed width and creates the percentage from the data values
    .domain([0, d3.max(data)])
    .range([0, 200]); 

chart.selectAll("rect") // this is what actually creates the bars
    .data(data)
  .enter().append("rect")
    .attr("width", x)
    .attr("height", 20)
    .attr("rx", 5) // rounded corners
    .attr("ry", 5);
    
chart.selectAll("text") // adding the text labels to the bar
    .data(data)
  .enter().append("text")
    .attr("x", x)
    .attr("y", 10) // y position of the text inside bar
    .attr("dx", -3) // padding-right
    .attr("dy", ".35em") // vertical-align: middle
    .attr("text-anchor", "end") // text-align: right
    .text(String);
    
  