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
        viewportMargin: 4,
    };

    exports.init = function(el, highlightEl, parent) {
        var _parent = parent ? parent : window; // the parent container; defaults to the window
        var _parentH = $(_parent).height;
        var _yPosInit = $(el).offset().top; // target element's offset (distance to top)
        var _$highlightEl = highlightEl ? $(highlightEl) : false; // a nav element to be highlighted on scroll

        // console.log(_$highlightEl);
        _toggleSticky(el, _yPosInit);

        $(_parent).scroll(function() {
            _toggleSticky(el, _yPosInit);

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
            _toggleSticky(el, $(el).offset().top);
        });
    };

    function _toggleSticky(el, offset) {
        var _scrollPos = $(window).scrollTop(),
            _yPosInit = offset ? offset : 0;

        if (_yPosInit <= _scrollPos) {
            $(el).addClass(exports.displayClass);
            console.log("sticky");
        } else {
            $(el).removeClass(exports.displayClass);
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


// =============================================================================
// Global/init logic
// -> let's do this
// =============================================================================


jQuery(function($) {

    // make jump navs 'sticky' on scroll
    gpoba.sticky.init(".js-sticky", ".js-highlight");
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
