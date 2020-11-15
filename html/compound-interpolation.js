(function() {

	function render(data, scale, selector) { // <-C
		d3.select(selector).selectAll('div.v-bar')
				.data(data)
				.enter().append('div').classed('v-bar', true)
				.append('span');
		
		d3.select(selector).selectAll('div.v-bar')
				.data(data)
				.exit().remove();
		
		d3.select(selector).selectAll('div.v-bar')
				.data(data)
				.classed('v-bar', true)
				.style('height', function(d) { // <-D
					return scale(d).height;
				}) 
				.style('background-color', function(d) { // <-E
					return scale(d).color;
				})
				.select('span')
				.text(function(d, i) {
					return i;
				});
	}
	
	var max = 21, data = [];
	var compoundScale = d3.scalePow()
		.exponent(2)
		.domain([0, max])
		.range([
			{color:'#add8e6', height:'15px'}, // <-A
			{color:'#4169e1', height:'120px'} // <-B
		]);

	for (var i = 0; i < max; ++i) {
		data.push(i);
	}

	render(data, compoundScale, '#compound');
	

}());
