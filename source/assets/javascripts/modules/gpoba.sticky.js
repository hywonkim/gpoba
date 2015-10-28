//= require 'jquery'

var gpoba = window.gpoba || {};

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
        $(el).each(function() {
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
        });
    };

    function _toggleSticky(el, elH, offset, stopPos) {
        var _scrollPos = $(window).scrollTop(),
            _scrollBottom = _scrollPos + elH,
            _yPosInit = offset ? offset : 0;

        if (_yPosInit <= _scrollPos && _scrollBottom <= stopPos) {
            $(el).addClass(exports.displayClass);
            $(el).removeClass(exports.bottomClass);
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
