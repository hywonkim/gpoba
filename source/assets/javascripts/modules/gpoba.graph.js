//= require 'jquery'
//= require chartist/dist/chartist.min.js

var gpoba = window.gpoba || {};

// Graph module
// -> Create a graph from figure data
// -> uses Chartist.js
// -----------------------------------------------------------------------------
gpoba.graph = (function($) {
    'use strict';
    var exports = {};

    // screen size where each type of chart needs to change
    exports.breakpoints = {
        bar: '700px',
        line: '700px',
    };

    // chartist settings for small and large screens
    // -> "large" are settings applied above the breakpoint (see exports.breakpoints)
    exports.settings = {
        bar: {
            small: {
                stackBars: true,
                chartPadding: {
                    right: 40
                },
                axisY:{
                    offset: 70,
                    showGrid: false
                },
                axisX: {
                    showLabel: false,
                    showGrid: false
                }
            },
            large: {
                horizontalBars: true,
                axisY: {
                  offset: 100
                }
            }
        },
        chart: {},
    }

    var _createBarGraph = function(el, data) {

        new Chartist.Bar(el, data, exports.settings.bar.small, [
                ['screen and (min-width: ' + exports.breakpoints.bar + ')', exports.settings.bar.large]
            ]).on('draw', function(chart) {
                if(chart.type === 'bar') {
                    chart.element.attr({
                        style: 'stroke-width: 30px'
                    });
                };

                var offset = 0
                var label_y1 = 0
                var label_y2 = 0
                var text_y = 0
                var text2_y = 0
                var line_boost = 1
                var label_boost = 1

                if (chart.seriesIndex%2 == 0) {
                    offset = 50
                    label_y1 = 80
                    label_y2 = 105
                    text_y = 110
                    text2_y = 125
                } else {
                    offset = -50
                    label_y1 = 50
                    label_y2 = 30
                    text_y = 0
                    text2_y = -10
                }

                if(chart.seriesIndex > 0){
                    line_boost = 10
                    label_boost = 15
                }

                console.log("chart");
                console.log(chart);

                // chart.element.parent().foreignObject(
                //         '<p class="label-element">' + chart.series.name + '<strong class="label-value"> ' + chart.series.chart[0] + ' </strong>'+'</p>',
                //         {x: chart.x1+label_boost, y: text_y, height:35, width:35 },
                //         'bar-label')
                //     .attr({ style: 'overflow: visible;' });
                // chart.element.parent().elem('line', {y1: label_y1, y2: label_y2, x1: chart.x1+line_boost, x2: chart.x1+line_boost, }, 'label-line');

                // chart.element.parent().foreignObject('<p class="label-element">'+ chart.series.name + '<strong class="label-value"> ' + chart.series.chart[0] + ' </strong>'+'</p>', {x: chart.x1+label_boost, y: text_y, height:35, width:35 }, 'bar-label').attr({ style: 'overflow: visible;' });
                // // chart.element.parent().foreignObject('<p class="label-element">test2</p>', {x: chart.x1, y: text2_y, height:35, width:35 }, 'bar-label').attr({ style: 'overflow: visible;' });
                // chart.element.parent().elem('line', {y1: label_y1, y2: label_y2, x1: chart.x1+line_boost, x2: chart.x1+line_boost, }, 'label-line');
            });
        };

    var _createLineGraph = function(el, data) {

    };

    // init function
    exports.create = function(el, dataURL, type) {
        var type = type || "bar"; // default type is bar graph

        $(el).each(function() {
            $.getJSON(dataURL, function(data) {
                if (type == "bar") {
                    _createBarGraph(el, data);
                } else if (type == "line") {
                    // _createLineGraph(el, data);
                }
            });
        });
    };

    return exports;
})(jQuery);
