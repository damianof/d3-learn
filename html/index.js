(function() {

	var render = function (item) {
		var div = d3.select('body').append('div');
		div.attr('style', 'outline:solid 1px green');

		var a = div.append('a').text(item.text);
		a.attr('href', item.href);
	};

	var items = [{
		text: 'functional-js'
		, href: 'functional-js.html'
	}, {
		text: 'async-data-load'
		, href: 'async-data-load.html'
	}, {
		text: 'array-as-data'
		, href: 'array-as-data.html'
	}, {
		text: 'quantitative-scales'
		, href: 'quantitative-scales.html'
	}, {
		text: 'time-scales'
		, href: 'time-scales.html'
	},  {
		text: 'compound-interpolation'
		, href: 'compound-interpolation.html'
	}, {
		text: 'basic-axes'
		, href: 'basic-axes.html'
	}];

	for (var i = items.length + 1; --i > 0;) {
		var item = items[items.length - i];
		render(item);
	}

}());
