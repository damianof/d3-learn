(function() {

    var height = 500, 
        width = 500, 
        margin = 25,
        offset = 50,
        axisWidth = width - 2 * margin,
        svg;
    
    function createSvg(){ // <-A
         svg = d3.select('body').append('svg') // <-B
            .attr('class', 'axis') // <-C
            .attr('width', width)
            .attr('height', height)
			;
    }

	// d3 v4
	var _strategy = {
		bottom: d3.axisBottom,
		top: d3.axisTop,
		left: d3.axisLeft,
		right: d3.axisRight
	};
    
    function renderAxis(scale, i, orient){
		// d3 v3 was like this
        // var axis = d3.svg.axis() // <-D
        //     .scale(scale) // <-E
        //     .orient(orient) // <-F
        //     .ticks(5); // <-G

		// d3 v4 
		var axisFunc = _strategy[orient];
        var axis = axisFunc(scale)
            .ticks(5)
			.tickPadding(10) // <-B
            .tickFormat(function(v){ // <-C
                return v + '%';
            });
        
        svg.append('g')        
            .attr('transform', function(){ // <-H
                if (['top', 'bottom'].indexOf(orient) >= 0) {
                    return 'translate(' + margin + ',' + i * offset + ')';
				} else {
                    return 'translate(' + i * offset + ', ' + margin + ')';
				}
            })
            .call(axis); // <-I
    }
    
    window.renderAll = function renderAll(orient) {
        if (svg) {
			svg.remove();
		}
        
        createSvg();
        
        renderAxis(d3.scaleLinear()
                    .domain([0, 1000])
                    .range([0, axisWidth]), 1, orient);
        renderAxis(d3.scalePow()
                    .exponent(2)
                    .domain([0, 1000])
                    .range([0, axisWidth]), 2, orient);
        renderAxis(d3.scaleTime()
                    .domain([new Date(2012, 0, 1), new Date()])
                    .range([0, axisWidth]), 3, orient);
    };
	

}());
