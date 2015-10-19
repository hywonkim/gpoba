//= require 'jquery'

// namespace for this site's custom code
var gpoba = {};

// =============================================================================
// Modules
// =============================================================================

// Sticky module
// -> make an element "sticky" (fixed position) depending on scroll position
// -> can't get this to work right now -- commenting out and will come back to it later
// -----------------------------------------------------------------------------
gpoba.sticky = (function($) {
    'use strict';

    var exports = {
        displayClass: "is-fixed",
        currentClass: "is-active",
        bottomClass: "at-bottom",
        viewportMargin: 4,
    };

    exports.init = function(el, highlightEl, stopEl, parent) {
        var _parent = parent ? parent : window; // the parent container; defaults to the window
        var _parentH = $(_parent).height;
        var _yPosInit = $(el).offset().top; // target element's offset (distance to top)
        var _$highlightEl = highlightEl ? $(highlightEl) : false; // a nav element to be highlighted on scroll
        var _stopPos = stopEl ? $(stopEl).offset().top : false; // element which "stops" the sticky behavior
        var _elH = $(el).outerHeight();

        // console.log(_$highlightEl);
        _toggleSticky(el, _elH, _yPosInit, _stopPos);

        $(_parent).scroll(function() {
            _toggleSticky(el, _elH, _yPosInit, _stopPos);

            // highlight the current nav item based on scroll position
            if (_$highlightEl) {
                _$highlightEl.each(function() {
                    var _$target = $($(this).attr("href"));

                    if (_checkVisible(_$target)) {
                        $(this).addClass(exports.currentClass);
                        // console.log($(this).attr('href') + " is visible");
                    } else {
                        $(this).removeClass(exports.currentClass);
                    };
                });
            }
        });

        // reset the target element's offset when the window resizes
        $(_parent).resize(function() {
            _toggleSticky(el, _elH, $(el).offset().top, _stopPos);
        });
    };

    function _toggleSticky(el, elH, offset, stopPos) {
        var _scrollPos = $(window).scrollTop(),
            _scrollBottom = _scrollPos + elH,
            _yPosInit = offset ? offset : 0;

        if (_yPosInit <= _scrollPos && _scrollBottom <= stopPos) {
            $(el).addClass(exports.displayClass);
            $(el).removeClass(exports.bottomClass);
            console.log("sticky");
        } else {
            $(el).removeClass(exports.displayClass);

            if (_scrollBottom >= stopPos) {
                $(el).addClass(exports.bottomClass);
            }
        }
    }

    // http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
    function _checkVisible(el) {
        // console.log("check visible: " + el);
        var _viewportMargin = ($(window).height()/exports.viewportMargin), // Viewport Height
            _scrollPos = $(window).scrollTop(), // Scroll Top
            _yPos = $(el).offset().top,
            _elH = $(el).outerHeight();

        return ((_yPos < (_viewportMargin + _scrollPos)) && (_yPos > (_scrollPos + _viewportMargin - _elH)));
    }

    return exports;
})(jQuery);


// Charist module
// -> All the JS for chartist
// -----------------------------------------------------------------------------
gpoba.chartist = (function($) {
    'use strict';
    var exports = {};

     exports.init = function(){
        // TO DO: 

        // 1) Make query draw the boxes and labels for each graph. 
        // 2) Theme each bar chart 
        // 3) Modularize so that data can be passed in via JSON instead.
        // Turn into partial?



        // --- BAR CHART ---- 

        new Chartist.Bar('.ct-figure-04', {
                labels: ['By Sector'],
                series: [
                    {
                      name: 'Education',                      
                      data: [1]
                    },
                    {
                      name: 'Telecom',                      
                      data: [1]
                    },
                    {
                      name: 'Solid Waste Management',                      
                      data: [6]
                    },
                    {
                      name: 'Sanitation',                      
                      data: [9]
                    },
                    {
                      name: 'Health',                      
                      data: [16]
                    },
                    {
                      name: 'Water',                      
                      data: [24]
                    },
                    {
                      name: 'Energy',                      
                      data: [42]
                    }
                ]
            }, {
                stackBars: true,
                horizontalBars: true,
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
                },
            }).on('draw', function(data) {
                if(data.type === 'bar') {
                    data.element.attr({
                    style: 'stroke-width: 30px'
                });
            }
        });

        new Chartist.Bar('.ct-figure-05', {
                labels: ['By Region'],
                series: [
                    {
                      name: 'Europe & Central Asia',                      
                      data: [1]
                    },
                    {
                      name: 'Latin America & the Caribbean',                      
                      data: [7]
                    },
                    {
                      name: 'Middle East & North Africa',                      
                      data: [8]
                    },
                    {
                      name: 'East Asia & the Pacific',                      
                      data: [11]
                    },
                    {
                      name: 'South Asia Region',                      
                      data: [21]
                    },
                    {
                      name: 'Africa',                      
                      data: [52]
                    }
                ]
            }, {
                stackBars: true,
                horizontalBars: true,
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
                },
            }).on('draw', function(data) {
                if(data.type === 'bar') {
                    data.element.attr({
                    style: 'stroke-width: 30px'
                });
            }
        });

        new Chartist.Bar('.ct-figure-06', {
                labels: ['Total: 51'],
                series: [
                    {
                      name: 'Financial Institution',                      
                      data: [2]
                    },
                    {
                      name: 'Non-Governmanetal Organization',                      
                      data: [5]
                    },
                    {
                      name: 'Public Sector',                      
                      data: [7]
                    },
                    {
                      name: 'Government',                      
                      data: [18]
                    },
                    {
                      name: 'Private Sector',                      
                      data: [19]
                    }
                ]
            }, {
                stackBars: true,
                horizontalBars: true,
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
                },
            }).on('draw', function(data) {
                if(data.type === 'bar') {
                    data.element.attr({
                    style: 'stroke-width: 30px'
                });
            }
        });

        // --- Provide Chart Labels    

        var $chart = $('.bar-chart');

        var $toolTip = $chart
          .append('<div class="tooltip"></div>')
          .find('.tooltip')
          .hide();

        $chart.on('mouseenter', '.ct-bar', function() {
          var $point = $(this),
            value = $point.attr('ct:value'),
            seriesName = $point.parent().attr('ct:series-name');
          $toolTip.html(seriesName + '<br>' + value + '%').show();
        });

        $chart.on('mouseleave', '.ct-bar', function() {
          $toolTip.hide();
        });

        $chart.on('mousemove', function(event) {
          $toolTip.css({
            left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
            top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
          });
        });

        // --- LINE CHART ---- 

        new Chartist.Line('.ct-line-graph', {
            labels: ['FY07-08','FY09','FY10','FY11','FY12','FY13','FY14','FY15'],
            series: [ [.01,.42,.75,1.87,3.31,5.87,7.13,8.00] ]          
        }, {
            low: 0,
            showArea: true,
            fullWidth: true,
            axisY: {
                onlyInteger: true,
                offset: 60,
                labelInterpolationFnc: function(value) {
                  if (value > 0) {
                    return (value) + ' M';
                  } else {
                    return value;
                  }
                },
            },
            chartPadding: {
                right: 32
            }
        });

        // --- LINE CHART ---- 
    
    }


    return exports;
})(jQuery);



// =============================================================================
// Global/init logic
// -> let's do this
// =============================================================================


jQuery(function($) {
    // make jump navs 'sticky' on scroll
    if ($(".js-sticky").length > 0) gpoba.sticky.init(".js-sticky", ".js-highlight", ".js-sticky-stop");
    gpoba.chartist.init();
});


// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}
