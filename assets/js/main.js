$(document).ready(function() {
    $window = $(window);
    //Captura cada elemento section com o data-type "background"
    $('.slider_009 > #myCarousel ').each(function(i) {
        var $scroll = $(this);
        var $img = $('> .carousel-inner > .item ', this).find('img');
        $img.each(function() {
            var imgSrc = $(this).attr('src');
            $(this).parent().css({ 'background-image': 'url(' + imgSrc + ')' });
            $(this).parent().addClass('parent');
        });

    });
});