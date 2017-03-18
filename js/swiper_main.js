;
(function() {
    function lazyLoadImages() {
        var st = $(window).scrollTop();
        $('img.lazy').each(function() {
            var img = $(this);
            if (img.attr('src')) return;
            if (img.offset().top < $(window).height() + st) {
                img.attr('src', img.data('src'));
            }
        });
    }
    if ($('img.lazy').length > 0) {
        $(window).scroll(function() {
            lazyLoadImages();
        });
    }
    if (window.hljs) {
        hljs.configure({
            tabReplace: '    '
        });
        hljs.initHighlightingOnLoad();
    }

    /* for tracks page */
    var swiperBack2 = new Swiper('.header-swiper-back-2-tracks', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 100,
        onlyExternal: true,
        effect: 'coverflow',
        direction: 'vertical',
        speed: 600,
        coverflow: {
            slideShadows: false
        }
    });
    var swiperBack1 = new Swiper('.header-swiper-back-1-tracks', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 300,
        effect: 'coverflow',
        speed: 600,
        coverflow: {
            slideShadows: false
        }
    });
    var swiperFront = new Swiper('.header-swiper-front-tracks', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 100,
        effect: 'coverflow',
        speed: 600,
        coverflow: {
            slideShadows: false
        },
        pagination: '.header-swiper-front-tracks .swiper-pagination',
        paginationClickable: true,
        nextButton: '.header-swiper-front-tracks .swiper-button-next',
        prevButton: '.header-swiper-front-tracks .swiper-button-prev',
        control: [swiperBack1, swiperBack2],
        controlBy: 'container',
        keyboardControl: false,
        a11y: true,
        onSlideChangeStart: function(s) {
            if (s.activeIndex === $('.swiper-slide-gallery').index()) {
                $(s.container[0]).find('.swiper-pagination').hide();
            } else {
                $(s.container[0]).find('.swiper-pagination').show();
            }
        }
    });
    /* end of tracks page */

    /* for workshop */
     var swiperBack22 = new Swiper('.header-swiper-back-2-workshops', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 100,
        onlyExternal: true,
        effect: 'coverflow',
        direction: 'vertical',
        speed: 600,
        coverflow: {
            slideShadows: false
        }
    });
    var swiperBack11 = new Swiper('.header-swiper-back-1-workshops', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 300,
        effect: 'coverflow',
        speed: 600,
        coverflow: {
            slideShadows: false
        }
    });

    var swiperFront1 = new Swiper('.header-swiper-front-workshops', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 100,
        effect: 'coverflow',
        speed: 600,
        coverflow: {
            slideShadows: false
        },
        pagination: '.header-swiper-front-workshops .swiper-pagination',
        paginationClickable: true,
        nextButton: '.header-swiper-front-workshops .swiper-button-next',
        prevButton: '.header-swiper-front-workshops .swiper-button-prev',
        control: [swiperBack11, swiperBack22],
        controlBy: 'container',
        keyboardControl: false,
        a11y: true,
        onSlideChangeStart: function(s) {
            if (s.activeIndex === $('.swiper-slide-gallery').index()) {
                $(s.container[0]).find('.swiper-pagination').hide();
            } else {
                $(s.container[0]).find('.swiper-pagination').show();
            }
        }
    });
    /* end of workshop */


    var galleryTopSwiper = new Swiper('.swiper-gallery-top', {
        slidesPerView: 1,
        spaceBetween: 10,
        nested: true,
        resistanceRatio: 0,
        preloadImages: false,
        lazyLoading: true,
    });
    var galleryThumbsSwiper = new Swiper('.swiper-gallery-thumbs', {
        slidesPerView: 5,
        spaceBetween: 10,
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        nested: true,
        resistanceRatio: 0,
    });
    galleryTopSwiper.params.control = galleryThumbsSwiper;
    galleryThumbsSwiper.params.control = galleryTopSwiper;

})();