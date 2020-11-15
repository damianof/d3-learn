(function() {

    function render(data, scale, selector) { // <-E
        d3.select(selector).selectAll('div.fixed-cell')
        	.data(data)
            .enter()
            .append('div').classed('fixed-cell', true);
		
        d3.select(selector).selectAll('div.fixed-cell')
            .data(data)
            .exit().remove();
		
        d3.select(selector).selectAll('div.fixed-cell')
			.data(data)
			.style('margin-left', function(d){ // <-F
				return scale(d) + 'px';
			})
			.html(function (d) { // <-G
				var format = d3.timeFormat('%x'); // <-H
				return format(d) + '<br>' + scale(d) + 'px';
			});
    }

	var start = new Date(2013, 0, 1), // <-A 
        end = new Date(2013, 11, 31),
        range = [0, 1200],
        time = d3.scaleTime().domain([start, end]) // <-B
            .rangeRound(range), // <-C
        max = 12,
        data = [];
	
    for (var i = 0; i < max; ++i){ // <-D
        var date = new Date(start.getTime());
        date.setMonth(start.getMonth() + i);
        data.push(date);
    }

    render(data, time, '#time');
	

}());
