//= require 'jquery'
//= require filament-tablesaw/dist/tablesaw.js

// =============================================================================
// Modules
// =============================================================================

//= require modules/gpoba.sticky
//= require modules/gpoba.chart
// require modules/gpoba.mobile_nav

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

    if ($(".js-chart").length > 0) {
        gpoba.chart.create('.ct-line-graph', '/content/overview/charts/figure03.json', 'line');
        gpoba.chart.create('.ct-figure-04', '/content/overview/charts/figure04.json');
        gpoba.chart.create('.ct-figure-05-sector', '/content/portfolio/charts/figure05_sector.json');
        gpoba.chart.create('.ct-figure-05-region', '/content/portfolio/charts/figure05_region.json');
    }

    // if ($(".js-mobile_nav").length > 0) gpoba.mobile_nav.init(".js-mobile_nav");

    // run Tablesaw for responsive tables
    $( document ).trigger( "enhance.tablesaw" );

    // mobile nav flyout behavior
    $('.js-has-flyout').click(function(event) {
        $($(this).attr("href")).toggleClass("is-visible");
        $(this).toggleClass("is-active");
        event.preventDefault();
    });
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
