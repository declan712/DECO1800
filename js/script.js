jQuery.expr[':'].contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

$(document).ready(function() {

    $("#main-nav h1").click(function(event) {
        event.preventDefault();
        $("#main-nav ul").toggleClass("collapsed");
        $("#player-nav").toggleClass("collapsed");
    });

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#main-nav').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('#main-nav').removeClass('nav-down').addClass('nav-up');
        $('#player-nav').removeClass('nav-down').addClass('nav-up');
        $("#main-nav ul").addClass("collapsed");
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#main-nav').removeClass('nav-up').addClass('nav-down');
            $('#player-nav').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

});


