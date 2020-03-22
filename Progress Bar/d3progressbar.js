
var svg = d3.select('.progress')
            .append('svg')
            .attr('height', 100)
            .attr('width', 500);

var states = ['started', 'inProgress', 'completed'];
var segmentWidth = 100;
var currentState = 'started';

var colorScale = d3.scale.ordinal()
                 .domain(states)
                 .range(['red', '#4863A0', 'green']);

//append a rectangle in svg and add attributes.
// the width of the rectangle will depend on the length of states in the selector
svg.append('rect')
    .attr('class', 'bg-rect')
    .attr('rx', 10)
    .attr('ry', 10)
    .attr('fill', 'gray')
    .attr('height', 15)
    .attr('width', function(){
        return segmentWidth * states.length;
    })
    .attr('x', 0);


// append the rectangle for fill and fill color change with the current state selected 
// add attributes
var progress = svg.append('rect')
                .attr('class', 'progress-rect')
                .attr('fill', function(){
                    return colorScale(currentState);
                })
                .attr('height', 15)
                .attr('width', 0)
                .attr('rx', 10)
                .attr('ry', 10)
                .attr('x', 0);

// start point for progres bar change the width
progress.transition()
    .duration(3000)
    .attr('width', function(){
        var index = states.indexOf(currentState);
        
        return (index + 1) * segmentWidth;
    });

// parameter for moving bar is "state"  and it would loop through each item in the function based on the state selected
function moveProgressBar(state){
    progress.transition()
        .duration(3000)
        .attr('fill', function(){
            return colorScale(state);
        })
        .attr('width', function(){
            var index = states.indexOf(state);
            return (index + 1) * segmentWidth;
        });
        console.log(state)
}


