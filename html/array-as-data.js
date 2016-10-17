(function() {

	function render(data) {
        // Enter
        d3.select('body').selectAll('div.h-bar')
            .data(data)
            .enter()
                .append('div')
                    .attr('class', 'h-bar')
                .append('span');
        // Update
        d3.select('body').selectAll('div.h-bar')
            .data(data) 
                .style('width', function (d) {
                    return (d * 3) + 'px';
                })
                .select('span')
                    .text(function (d) {
                        return d;
                    });
                
        // Exit
        d3.select('body').selectAll('div.h-bar')
            .data(data)
            .exit()
                .remove();        
    }

    var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];

    setInterval(function () {
        data.shift();
        data.push(Math.round(Math.random() * 100));
        render(data);
    }, 250);


    render(data);

}());


