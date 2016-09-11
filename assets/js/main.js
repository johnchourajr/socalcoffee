$(document.links).filter(function() {
  return this.hostname != window.location.hostname;
}).attr('target', '_blank');

$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {

    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 400);
      return false;
    }
  }
});

$('.search-nav').on('click', function(evt) {

    var body = $('body');
    var button = $('.search-nav');
    var field = $('.search-nav-field');

    // if (button.hasClass('closed')) {
    //   button.addClass('open').removeClass('closed');
    // } else {
    //   button.addClass('closed').removeClass('open');
    // }

    if (field.hasClass('closed')) {
      field.addClass('open').removeClass('closed');
      body.addClass('noscroll');
    } else {
      field.addClass('closed').removeClass('open');
      body.removeClass('noscroll');
    }
  });
