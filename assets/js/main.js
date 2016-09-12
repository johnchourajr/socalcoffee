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
  var drawer = $('.search-nav-drawer');
  var field = $('.search-box');
  var icn = $('.search-nav-icn');

  if (drawer.hasClass('closed')) {
    drawer.addClass('open').removeClass('closed');
    field.focus();
    icn.attr('src','/assets/images/x.svg');

  } else {
    drawer.addClass('closed').removeClass('open');
    icn.attr('src','/assets/images/search.svg');

  }
});

$('.menu-nav').on('click', function(evt) {

  var body = $('body');
  var button = $('.menu-nav');
  var drawer = $('.menu-nav-drawer');
  var icn = $('.menu-nav-icn');

  if (drawer.hasClass('closed')) {
    drawer.addClass('open').removeClass('closed');
    icn.attr('src','/assets/images/x.svg');

  } else {
    drawer.addClass('closed').removeClass('open');
    icn.attr('src','/assets/images/menu.svg');

  }
});
