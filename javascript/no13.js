$('.job').typeIt({
  strings: ["Website Templates.", "Mobile App Templates.", "Brands.", "Game characters."],
  speed: 100,
  breakLines: false,
  autoStart: false,
  loop: true
});

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
  }, 5000)
});
