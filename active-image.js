// Start of jQuery plugin syntax
(function ( $ ) {

    // activeImage constructor
    $.fn.activeImage = function(options) {

        // Applying to all matching dom elements
        return this.each(function() {

            $(this).css({'cursor': 'pointer'});

            // Add an event listener for clicks
            $(this).on('click', function (event) {

                event.stopPropagation();

                var imageUrl = $(this).attr("src")

                // Build the new image HTML
                var bigImage = $('<div class="active-image"></div>');

                var offset = $(this).offset();
                var offsetAdjust;

                var size = {};

                var viewPortRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;
                var imageRatio = $(this).width() / $(this).height();

                if (imageRatio >= viewPortRatio) {
                    size.scaleX = $(this).width() / document.documentElement.clientWidth;
                    size.scaleY = size.scaleX;
                    offsetAdjust = ((document.documentElement.clientHeight * size.scaleY) - $(this).height()) / 2;
                    offset.top = offset.top - offsetAdjust;
                }
                else {
                    size.scaleY = $(this).height() / document.documentElement.clientHeight;
                    size.scaleX = size.scaleY;
                    offsetAdjust = ((document.documentElement.clientWidth * size.scaleX) - $(this).width()) / 2;
                    offset.left = offset.left - offsetAdjust;
                }

                bigImage.css({
                    'transform': 'translate3d(' + offset.left + 'px, ' + offset.top + 'px, 0) scale3d(' + size.scaleX + ',' + size.scaleY + ', 1)',
                    'background': 'transparent url(' + imageUrl + ') no-repeat center center'
                });

                // Applying the dom element to the variable 'self'
                var $self = $(this);

                $('body').append(bigImage);

                $(this).css({'opacity': 0});

                $('.active-image').on('click', function () {
                    $(this).addClass('shrink');
                    $(this).bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
                        $(this).remove();
                        $self.css({'opacity': 1});
                    });

                });

            });
        });
    };

}( jQuery ));
