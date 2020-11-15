(function() {

	function render(data, scale, selector) {
        d3.select(selector).selectAll('div.cell')
                .data(data)
                .enter().append('div').classed('cell', true);

        d3.select(selector).selectAll('div.cell')
                .data(data)
                .exit().remove();

        d3.select(selector).selectAll('div.cell')
                .data(data)
                .style('display', 'inline-block')
                .text(function (d) {
                    return d3.format('.3')(scale(d), 2);
                });
    }

	
	var max = 11, data = [];
    for (var i = 1; i < max; ++i) {
		data.push(i);
	}

	// In D3 v4 it is no longer named d3.scale.linear(). Use d3.scaleLinear() instead.
    var linear = d3.scaleLinear() // <-A
        .domain([1, 10]) // <-B
        .range([1, 10]); // <-C

    var linearCapped = d3.scaleLinear()
        .domain([1, 10])
        .range([1, 20]); // <-D
        
    var pow = d3.scalePow().exponent(2); // <-E
    var powCapped = d3.scalePow() // <-F
        .exponent(2)
        .domain([1, 10])
        .rangeRound([1, 10]); // <-G
        
    var log = d3.scaleLog(); // <-H
    var logCapped = d3.scaleLog() // <-I
        .domain([1, 10])
        .rangeRound([1, 10]);

    render(data, linear, '#linear');
    render(data, linearCapped, '#linear-capped');
    render(data, pow, '#pow');
    render(data, powCapped, '#pow-capped');
    render(data, log, '#log');
    render(data, logCapped, '#log-capped');

}());
