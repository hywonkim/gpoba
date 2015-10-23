//= require 'jquery'
//= require filament-tablesaw/dist/tablesaw.js

// =============================================================================
// Modules
// =============================================================================

//= require modules/gpoba.sticky
//= require modules/gpoba.graph

// initialize the global namespace object if it doesn't already exist
var gpoba = window.gpoba || {};

// =============================================================================
// Global/init logic
// -> let's do this
// =============================================================================

jQuery(function($) {
    // make jump navs 'sticky' on scroll
    // -> if there is a jump nav on this page
    if ($(".js-sticky").length > 0) gpoba.sticky.init(".js-sticky", ".js-highlight", ".js-sticky-stop");
    // if ($(".js-chart").length > 0) gpoba.chartist.init();

    // gpoba.graph.create('.ct-figure-03', '/content/overview/graphs/figure03.json', 'line');
    gpoba.chart.create('.ct-figure-04', '/content/overview/graphs/figure04.json');

    // run Tablesaw for responsive tables
    $( document ).trigger( "enhance.tablesaw" );
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
