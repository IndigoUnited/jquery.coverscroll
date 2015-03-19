(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
} (this, function ($) {

    'use strict';

    function CoverScroll(element, options) {
        this._element = $(element);
        this._options = $.extend({
            delay: 100
        }, options);

        // Setup the cover element
        this._coverElement = $('<div data-coverscroll></div>');
        this._coverElement.css({
            //background: 'red',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            transform: 'scale(0)',
            zIndex: 999999999
        });

        // Window usage
        if (this._element[0] === window || this._element[0] === document.body) {
            this._coverElement.css('position', 'fixed');
            this._coverElement.prependTo(document.body);

            // Listen to scroll
            this._scrollElement = $(window);
            this._scrollElement.on('scroll.coverscroll', this._onScroll.bind(this));
        // Element (with overflow)
        } else {
            // Ensure the element is not static
            if (this._element.css('position') === 'static') {
                this._element.css('position', 'relative');
                this._element.data('_coverscroll_restore', true);
            }

            this._coverElement.prependTo(this._element);

            // Listen to scroll
            this._scrollElement = this._element;
            this._scrollElement.on('scroll.coverscroll', this._onScrollWithPos.bind(this));

            // Destroy event, see: https://github.com/IndigoUnited/jquery.destroy-event
            this._scrollElement.on('destroy.coverscroll', this.destroy.bind(this));
        }
    }

    CoverScroll.prototype.destroy = function () {
        // Remove cover
        this._coverElement.remove();

        // Clear events & timers
        this._scrollElement.off('.coverscroll');
        this._resetTimeout && clearTimeout(this._resetTimeout);

        this._element.removeData('_coverscroll');
        this._element = this._coverElement = this._scrollElement = null;
    };

    // ------------------------------------

    CoverScroll.prototype._onScroll = function (e) {
        var that = this;

        this._coverElement.css('transform', 'scale(1)');

        this._resetTimeout && clearTimeout(this._resetTimeout);
        this._resetTimeout = setTimeout(function () {
            that._resetTimeout = null;
            that._coverElement.css('transform', 'scale(0)');
        }, this._options.delay);
    };

    CoverScroll.prototype._onScrollWithPos = function (e) {
        var that = this,
            scrollTop,
            scrollLeft;

        // Read scroll values.. this prevent reflows
        // if some of the handlers modify the DOM.. which we do
        if (e.$scrollTop == null) {
            e.$scrollTop = this._scrollElement.scrollTop();
        }

        if (e.$scrollLeft == null) {
            e.$scrollLeft = this._scrollElement.scrollLeft();
        }

        scrollTop = e.$scrollTop;
        scrollLeft = e.$scrollLeft;

        this._coverElement.css('transform', 'translate(' + this._element.scrollLeft() + 'px, ' + this._element.scrollTop() + 'px) scale(1)');

        this._resetTimeout && clearTimeout(this._resetTimeout);
        this._resetTimeout = setTimeout(function () {
            that._resetTimeout = null;
            that._coverElement.css('transform', 'scale(0)');
        }, this._options.delay);
    };

    // ------------------------------------

    $.fn.coverscroll = function (options) {
        return this.each(function () {
            var $this = $(this),
                data  = $this.data('_coverscroll');

            if (typeof options === 'string') {
                if (!data) {
                    return;
                }

                data[options]();
            } else {
                if (!data) {
                    $this.data('_coverscroll', (data = new CoverScroll(this, options)));
                }
            }
        });
    };

    $.fn.coverscroll.Constructor = CoverScroll;

    return $;
}));
