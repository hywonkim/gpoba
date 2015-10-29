//= require 'jquery'

var gpoba = window.gpoba || {};

// Sticky module
// -> make an element "sticky" (fixed position) depending on scroll position
// -> can't get this to work right now -- commenting out and will come back to it later
// -----------------------------------------------------------------------------
gpoba.mobile_nav = (function($) {
    'use strict';

    var exports = {
        displayClass: "is-fixed",
        captureEl: ".js-capture_nav",
        paginationEl: ".js-hide-pagination",
        flyoutBtnEl: ".js-has-flyout",
    };

    exports.init = function(el) {
        $(el).each(function() {
            var _captureElPos = $(exports.captureEl).offset().top;
            var _windowH = $(window).height();
            var _elH = $(el.height);

            console.log(_windowH);

            _toggleFixed(el, _captureElPos);

            $(window).scroll(function() {
                _toggleFixed(el, _captureElPos);
            });

            $(window).resize(function() {
                var _captureElPosNew = $(exports.captureEl).offset.top;
                var _windowHNew = $(window).height();
                _toggleFixed(el, _captureElPosNew + _windowHNew);
            });
        });
    }

    function _toggleFixed(el, capturePos) {
        var _scrollPos = $(window).scrollTop() + $(window).height();
        console.log(_scrollPos + " | " + capturePos);

        if (_scrollPos <= capturePos) {
            $(el).addClass(exports.displayClass);
        } else {
            $(el).removeClass(exports.displayClass);
        }
    }

    return exports;
})(jQuery);
