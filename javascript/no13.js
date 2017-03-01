class Template {
  constructor(url, data) {
    this.template = $.get(url, data)
  }

}

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
    }, 500, function(){
      $('.nav ul').slideDown()
      $('.nav a[href=\\'+location.hash+']').parent().addClass('active')
    })
    $("#page-container").fadeOut('fast', function(){
      $("#page-container").remove()
    })
  }, 0)

  $(document).on('click', '.nav a', function(e){
    e.preventDefault()
    window.history.pushState(null, $(this).html(), this.href)
    $(this).parent().parent().children('.active').removeClass('active')
    $(this).parent().addClass('active')
    return false
  })
});
