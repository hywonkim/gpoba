//= require 'jquery'
//= require chartist/dist/chartist.min.js

var gpoba = window.gpoba || {};

// Graph module
// -> Create a graph from figure data
// -> uses Chartist.js
// -----------------------------------------------------------------------------
gpoba.chart = (function($) {
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
            width: 30,
            small: {
                stackBars: true,
                chartPadding: {
                    right: 40
                },
                axisY:{
                    offset: 70,
                    showGrid: false,
                    showLabel: false,
                },
                axisX: {
                    showLabel: false,
                    showGrid: false,
                }
            },
            large: {
                horizontalBars: true,
                axisY: {
                  offset: 100,
                }
            }
        },
        line: {},
    }

    var _createBarGraph = function(el, data) {

        new Chartist.Bar(el, data, exports.settings.bar.small, [
                ['screen and (min-width: ' + exports.breakpoints.bar + ')', exports.settings.bar.large]
            ]).on('draw', function(chart) {
                if(chart.type === 'bar') {
                    chart.element.attr({ style: 'stroke-width: ' + exports.settings.bar.width });
                };

                var offset = 0,
                    pointer_y1 = 0,
                    pointer_y2 = 0,
                    label_x = 0,
                    label_y = 5,
                    pointer_offset_x = 1,
                    pointer_offset_y = 0,
                    pointer_x1 = 0,
                    pointer_x2 = 0;

                // get the list of classes on the parent SVG element currently drawn
                // -> DOMTokenList: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
                var ctClassList = chart.element._node.nearestViewportElement.classList;

                // horizontal orientation (larger screens)
                // -> if this has a "ct-horizontal-bars" class, render horizontal labels
                if (ctClassList.contains("ct-horizontal-bars")) {

                    console.log("horizontal chart");
                    // alternate top and bottom labels in horizontal layout
                    if (chart.seriesIndex%2 == 0) {
                        // bottom row
                        pointer_y1 = (exports.settings.bar.width/2 + 5);
                        pointer_y2 = (exports.settings.bar.width/2 + 40);
                        label_x = (exports.settings.bar.width/2 + 30);
                    } else {
                        // top row
                        pointer_y1 = (-exports.settings.bar.width/2 - 5);
                        pointer_y2 = (-exports.settings.bar.width/2 - 40);
                        label_x = (-exports.settings.bar.width/2 - 40);
                    }
                    if(chart.seriesIndex > 0){
                        pointer_offset_x = 10;
                        label_y = 15;
                    }

                // vertical orientation (smaller screens)
                // -> stack labels vertically, to the right of the bar
                } else {
                    label_x = 0;
                    pointer_offset_x = 0;

                    if(chart.seriesIndex > 1) {
                        pointer_offset_y = 10;
                        label_x = pointer_offset_y;
                    }

                    if (chart.seriesIndex%2 == 0) {
                        pointer_x1 = (exports.settings.bar.width/2 + 5);
                        pointer_x2 = (exports.settings.bar.width/2 + 40);
                        label_y = (exports.settings.bar.width/2 + 40);
                    } else {
                        pointer_x1 = (-exports.settings.bar.width/2 - 5);
                        pointer_x2 = (-exports.settings.bar.width/2 - 40);
                        label_y = (-exports.settings.bar.width/2 - 40);
                    }
                }

                if (chart.type == 'bar') {
                    // build the label
                    chart.element.parent().foreignObject(
                            '<p class="label-element"><strong class="label-value">' + chart.series.data[0] + '%</strong> ' + chart.series.name +'</p>',
                            {
                                x: chart.x1 + label_y,
                                y: chart.y2 + label_x,
                                height:20,
                                width:200,
                            }, 'bar-label').attr({ style: 'overflow: visible;' });
                    // build the pointer
                    chart.element.parent().elem('line', {
                        y1: chart.y2 + pointer_y1 + pointer_offset_y,
                        y2: chart.y2 + pointer_y2 + pointer_offset_y,
                        x1: chart.x1 + pointer_offset_x + pointer_x1,
                        x2: chart.x1 + pointer_offset_x + pointer_x2,
                    }, 'label-line');
                };
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
