// Code goes here

(function(){
  
  var _innerRadius = 0.30
  , _outerRadius = 1.1
  , _circleRadius = 0.3;
  
  function DonutCharts(domEl) {
    this.domEl = domEl;
    var charts = d3.select('#donut-charts');
  
    var chart_m,
        chart_r,
        color = d3.scale.category20();
  
    var getCatNames = function(dataset) {
      var catNames = [];
      for (var i = 0; i < dataset[0].data.length; i++) {
          catNames.push(dataset[0].data[i].cat);
      }
      return catNames;
    };

    var createCenter = function(pie) {
      var _toggle = false;
      var eventObj = {
          'mouseover': function(d, i) {
              d3.select(this)
                  .transition()
                  .attr("r", chart_r * (_circleRadius*1.5));
          },
          'mouseout': function(d, i) {
              d3.select(this)
                  .transition()
                  .duration(500)
                  .ease('bounce')
                  .attr("r", chart_r * _circleRadius);
          },
          'click': function(d, i) {
              console.log('click center');
              var paths = charts.selectAll('.clicked');
              pathAnim(paths, 0);
              paths.classed('clicked', false);
              //resetAllCenterText();
              updateDonut();
              if (_toggle) {
                _toggle = false;
                charts.selectAll('.donut')
                      .selectAll('path')
                      .attr('visibility', 'hidden');
              } else {
                _toggle = true;
                charts.selectAll('.donut')
                      .selectAll('path')
                      .attr('visibility', 'visible');
              }
          }
      };

      var donuts = d3.selectAll('.donut');

      // The circle displaying total data.
      donuts.append("svg:circle")
          .attr("r", chart_r * _circleRadius)
          //.style("fill", "#E7E7E7")
          .on(eventObj);

      /*donuts.append('text')
              .attr('class', 'center-txt type')
              .attr('y', chart_r * -0.16)
              .attr('text-anchor', 'middle')
              .style('font-weight', 'bold')
              .text(function(d, i) {
                  return d.type;
              });
      donuts.append('text')
              .attr('class', 'center-txt value')
              .attr('text-anchor', 'middle');
      donuts.append('text')
              .attr('class', 'center-txt percentage')
              .attr('y', chart_r * 0.16)
              .attr('text-anchor', 'middle')
              .style('fill', '#A2A2A2');*/
    }.bind(this);

    /*var setCenterText = function(thisDonut) {
      var sum = d3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
          return d.data.val;
      });

      thisDonut.select('.value')
          .text(function(d) {
              return (sum)? sum.toFixed(1) + d.unit
                          : d.total.toFixed(1) + d.unit;
          });
      thisDonut.select('.percentage')
          .text(function(d) {
              return (sum)? (sum/d.total*100).toFixed(2) + '%'
                          : '';
          });
    }.bind(this);*/

    /*var resetAllCenterText = function() {
      charts.selectAll('.value')
          .text(function(d) {
              return d.total.toFixed(1) + d.unit;
          });
      charts.selectAll('.percentage')
          .text('');
    }.bind(this);*/

    var pathAnim = function(path, dir) {
      switch(dir) {
          case 0:
              path.transition()
                  .duration(1000)
                  .ease('bounce')
                  .attr('d', d3.svg.arc()
                      .innerRadius(chart_r * _innerRadius)
                      .outerRadius(chart_r)
                  );
              break;

          case 1:
              path.transition()
                  .attr('d', d3.svg.arc()
                      .innerRadius(chart_r * _innerRadius)
                      .outerRadius(chart_r * _outerRadius)
                  );
              break;
      }
    }.bind(this);

    var updateDonut = function() {
      var eventObj = {
          'mouseover': function(d, i, j) {
              pathAnim(d3.select(this), 1);

              var thisDonut = charts.select('.type' + j);
              thisDonut.select('.value').text(function(donut_d) {
                  return d.data.val.toFixed(1) + donut_d.unit;
              });
              thisDonut.select('.percentage').text(function(donut_d) {
                  return (d.data.val/donut_d.total*100).toFixed(2) + '%';
              });
          },
          'mouseout': function(d, i, j) {
              var thisPath = d3.select(this);
              if (!thisPath.classed('clicked')) {
                  pathAnim(thisPath, 0);
              }
              var thisDonut = charts.select('.type' + j);
              //setCenterText(thisDonut);
          },
          'click': function(d, i, j) {
              console.log('donut click');
              var thisDonut = charts.select('.type' + j);

              if (0 === thisDonut.selectAll('.clicked')[0].length) {
                  thisDonut.select('circle').on('click')();
              }

              var thisPath = d3.select(this);
              var clicked = thisPath.classed('clicked');
              pathAnim(thisPath, ~~(!clicked));
              //thisPath.classed('clicked', !clicked);
              //setCenterText(thisDonut);
          }
      };

      var pie = d3.layout.pie()
                      .sort(null)
                      .value(function(d) {
                          return d.val;
                      });

      var arc = d3.svg.arc()
                      .innerRadius(chart_r * _innerRadius)
                      .outerRadius(function() {
                          return (d3.select(this).classed('clicked'))? chart_r * _outerRadius
                                                                     : chart_r;
                      });

      // Start joining data with paths
      var paths = charts.selectAll('.donut')
                      .selectAll('path')
                      .data(function(d, i) {
                          return pie(d.data);
                      });

      paths
          .transition()
          .duration(1000)
          .attr('d', arc);

      paths.enter()
          .append('svg:path')
              .attr('d', arc)
              .attr('class', function(d, i) {
                return 'arc' + i;
              })
              .style('fill', function(d, i) {
                return color(i);
              })
              .style('stroke', '#0FF')
              .text(function(d) {
                console.log('svg:path text', d.data.cat)
                return d.data.cat;
              })
              .on(eventObj);
    

      paths.exit().remove();

      //resetAllCenterText();
    }.bind(this);

    this.create = function(dataset) {
      var elInnerWidth = parseInt(window.getComputedStyle(this.domEl).width);
      chart_m = elInnerWidth / dataset.length / 2 * 0.14;
      chart_r = elInnerWidth / dataset.length / 2 * 0.85;

      var donut = charts.selectAll('.donut')
                      .data(dataset)
                  .enter().append('svg:svg')
                      .attr('width', (chart_r + chart_m) * 2)
                      .attr('height', (chart_r + chart_m) * 2)
                  .append('svg:g')
                      .attr('class', function(d, i) {
                          return 'donut type' + i;
                      })
                      .attr('transform', 'translate(' + (chart_r+chart_m) + ',' + (chart_r+chart_m) + ')')
                      .on({
                        'click': function(d, i) {
                          console.log('click vsg ', d); 
                        }
                      });

      createCenter();

      //updateDonut();
    }.bind(this);
  
    this.update = function(dataset) {
        // Assume no new categ of data enter
        var donut = charts.selectAll(".donut")
                    .data(dataset);
  
        updateDonut();
    }.bind(this);
  }


  /*
  * Returns a json-like object.
  */
  function genData() {
    var type = ['Users'];
    var unit = ['M', 'GB', ''];
    var cat = ['Twitter', 'LinkedIn', 'Facebook'];
  
    var dataset = [];
  
    for (var i = 0; i < type.length; i++) {
        var data = [];
        var total = 0;
  
        for (var j = 0; j < cat.length; j++) {
            var value = 33; //Math.random()*10*(3-i);
            total += value;
            data.push({
                "cat": cat[j],
                "val": value
            });
        }
  
        dataset.push({
            "type": type[i],
            "unit": unit[i],
            "data": data,
            "total": total
        });
    }
    
    return dataset;
  }
  
  var donutData = genData();

  var $domEl = document.getElementById('donut-charts');
  console.log('$domEl.innerWidth', parseInt(window.getComputedStyle($domEl).width));
  
  var donuts = new DonutCharts($domEl);
  donuts.create(donutData);

  window.refresh = function refresh() {
      donuts.update(genData);
  };

}());
