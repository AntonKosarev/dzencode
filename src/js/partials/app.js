//плавный переход по якорям
$(document).ready(function() {
  $('a[href*=#]').bind("click", function(e) {
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top
    }, 1000);
    e.preventDefault();
  });
  return false;
});

$(document).ready(function() {
  $('.slider_items').bxSlider();
});
