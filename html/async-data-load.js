(function() {

    require.config({
        paths: {
            utilsService: 'services/utilsService',
            reportService: 'services/reportService',
            d3: 'vendor/d3.min'
        }
    });

    requirejs([
        'utilsService'
        , 'reportService'
        , 'd3'
    ], function(utilsService, reportService, d3) {

        console.log('arguments', arguments);
        console.log('this.services', this.services);

        var render = function (data) {
            console.log('d3', d3);

            // Enter
            d3.select('#chart')
                .selectAll('div.store')
                    .data(data.stores)
                .enter()
                    .append('div')
                        .attr('class', 'store')
                    .append('span');
                    
            // Exit
            d3.select('#chart').selectAll('div.store')
                .data(data.stores)
                .exit()
                    .remove(); 

            // Update
            d3.select('#chart').selectAll('div.store')
                .data(data.stores) 
                .attr('class', 'store')
                    .style('width', function (d) {
                        return (500) + 'px';
                    })
                    .select('span')
                        .text(function (d) {
                            return d.name + ' ' + d.people.length;
                        });       
        }.bind(this);


        var _utilsService = (utilsService || window.services.utilsService)()
			, _reportService = (reportService || window.services.reportService)(_utilsService);
		_utilsService.safeLog('utilsService loaded');

        var model;
        window.load = function() { // <-E
            d3.json('data/report-generated2.json', function(error, json){ // <-F
                if (error) {
                    console.log('Error', error);
                    alert(error);
                } else {
                    console.log('Success', json);
                }

                //model = json;
                model = _reportService.getModel(json);            

                render(model);
            });
        };

    });

}());


