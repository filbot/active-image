// Start of jQuery plugin syntax
(function ( $ ) {

    // activeImage constructor
    $.fn.activeImage = function(options) {

        // Applying to all matching dom elements
        return this.each(function() {

            // Applying the dom element to the variable 'self'
            var $self = $(this);

            $self.css({'cursor': 'pointer'});

            // Add an event listener for clicks
            $self.on('click', function (event) {

                event.stopPropagation();

                var imageUrl = $self.attr('src');

                // Build the new image HTML
                var bigImage = document.createElement('div');
                bigImage.className =  'active-image';

                var offset = $(this).offset();
                var offsetAdjust;

                var size = {
                    'scaleX': undefined,
                    'scaleY': undefined
                };

                var imageWidth = $self.width();
                var imageHeight = $self.height();

                var viewportWidth = document.documentElement.clientWidth;
                var viewportHeight = document.documentElement.clientHeight;


                var viewPortRatio = viewportWidth / viewportHeight;
                var imageRatio = imageWidth / imageHeight;

                if (imageRatio >= viewPortRatio) {
                    size.scaleX = imageWidth / viewportWidth;
                    size.scaleY = size.scaleX;
                    offsetAdjust = ((viewportHeight * size.scaleY) - imageHeight) / 2;
                    offset.top = offset.top - offsetAdjust;
                }
                else {
                    size.scaleY = imageHeight / viewportHeight;
                    size.scaleX = size.scaleY;
                    offsetAdjust = ((viewportWidth * size.scaleX) - imageWidth) / 2;
                    offset.left = offset.left - offsetAdjust;
                }

                $(bigImage).css({
                    'transform': 'translate3d(' + offset.left + 'px, ' + offset.top + 'px, 0) scale3d(' + size.scaleX + ',' + size.scaleY + ', 1)',
                    'background': 'transparent url(' + imageUrl + ') no-repeat center center'
                });

                $self.css({'opacity': 0});

                $('body')[0].appendChild(bigImage);


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
