//= require 'jquery'
//= require filament-tablesaw/dist/tablesaw.js

// namespace for this site's custom code
var gpoba = {};

// =============================================================================
// Modules
// =============================================================================
//= require modules/gpoba.sticky
// require modules/gpoba.graph

// =============================================================================
// Global/init logic
// -> let's do this
// =============================================================================


jQuery(function($) {
    // make jump navs 'sticky' on scroll
    if ($(".js-sticky").length > 0) gpoba.sticky.init(".js-sticky", ".js-highlight", ".js-sticky-stop");
    if ($(".js-chart").length > 0) gpoba.chartist.init();
    gpoba.tables.init();
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
