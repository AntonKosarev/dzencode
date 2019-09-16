//плавный переход по якорям
console.log($(".menu"));

function slowScrol(el) {
  $(el).on("click", "a", function(event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
}
  $(document).ready(
    slowScrol($('#left_menu'));
    slowScrol($('#right_menu'));
  );


//слайдер
$(document).ready(function() {
  $('.slider').bxSlider({
    pager: false,
    nextText: '<span></span>',
    prevText: '<span></span>',
  });
});
