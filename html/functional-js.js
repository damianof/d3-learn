(function() {

	function SimpleWidget(spec) {
		var instance = {}; // <-- A
		var headline, description; // <-- B

		instance.render = function () {
			var div = d3.select('body').append('div');
			div.append('h3').text(headline); // <-- C
			div.attr('class', 'box')
				.attr('style', 'color:' + spec.color + '; outline:solid 1px green') // <-- D
				.append('p')
					.text(description); // <-- E
			return instance; // <-- F
		};

		instance.headline = function (h) {
			if (!arguments.length) {
				return headline; // <-- G
			}

			headline = h;
			return instance; // <-- H
		};

		instance.description = function (d) {
			if (!arguments.length) {
				return description;
			}

			description = d;
			return instance;
		};

		return instance; // <-- I
	}

	var widget = new SimpleWidget({
			color: '#6495ed'
		})
		.headline('Simple Widget')
		.description('This is a simple widget demonstrating functional javascript.');

	widget.render();

	widget = new SimpleWidget({
			color: '#F0F'
		})
		.headline('Another Widget')
		.description('A second instance');

	widget.render();

	d3.selectAll('div')
		.each(function(d, i) {
			d3.select(this).append('h1').text(i);
		});

}());


