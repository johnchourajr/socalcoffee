// Google Analtyics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-83996999-1', 'auto');
ga('send', 'pageview');

// Opens a blank page for external links
$(document.links).filter(function() {
  return this.hostname != window.location.hostname;
}).attr('target', '_blank');

// Scrolls to anchor links on a page
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

// Search Nav Opener
$('.search-nav').on('click', function(evt) {
  var body = $('body');
  var button = $('.search-nav');
  var drawer = $('.search-nav-drawer');
  var field = $('.search-box-focus');
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

// Mobile Nav Opener
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

// Mobile Nav Opener
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

var searchinput = $("#search");
var reset = $(".reset");
var help = $(".search-help")

$(".reset").click(function() {
  searchinput.attr('value','');
  searchinput.val('');
  searchinput.focus();
  reset.removeClass('show');
  reset.addClass('hide');
});

$('#search').on('keyup', function () {
  reset.removeClass('hide');
  reset.addClass('show');
});
