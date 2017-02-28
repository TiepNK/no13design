$(document).ready(function(){
  setTimeout(function(){
    $('.logo').css({
      top: $('.logo').offset().top,
      left: $('.logo').offset().left,
      position: 'fixed',
      'z-index': 1000
    }).appendTo($('#page-content .left')).animate({
      left: '50px',
      top: '30px'
    }, 500)
    $("#page-container").fadeOut('fast', function(){
      $("#page-container").remove()
    })

  }, 0)
});
