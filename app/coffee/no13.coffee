getProducts = (tag) ->
  $.get 'products.json', (data) ->
    $.get 'product.html', (template) ->
      products = data.products.map((product) ->
        template.template product
      )
      $('.products').append products
      changeProducts tag
      return
    return
  return

changeProducts = (tag) ->
  $('.products').isotope
    itemSelector: '.product'
    filter: if tag == '#all' then '*' else tag.replace('#', '.')
  return

String::template = (params) ->
  self = this
  switch typeof self
    when 'string'
      return
    when 'object'
      for key of params
        self = self.replace(eval('/{{' + key + '}}/g'), params[key])
      return self
  return

$(document).ready ->
  setTimeout (->
    $('.logo').css(
      top: $('.logo').offset().top
      left: $('.logo').offset().left
      position: 'fixed'
      'z-index': 1000).appendTo($('#page-content .left')).animate {
      left: '50px'
      top: '30px'
    }, 500, ->
      window.tag = location.hash or '#all'
      $('.nav a[href=\\' + tag + ']').parent().addClass 'active'
      getProducts tag
      return
    $('#page-container').fadeOut 'fast', ->
      $('#page-container').remove()
      return
    return
  ), 0
  return
.on 'click', '.nav a', (e) ->
  e.preventDefault()
  window.history.pushState null, $(this).html(), @href
  $(this).parent().parent().children('.active').removeClass 'active'
  $(this).parent().addClass 'active'
  changeProducts window.location.hash
  false
.on 'click', '.btnMenu', ->
  $(this).prev('ul').toggleClass('open')
  $(this).toggleClass('cross')
.on 'click', '.open a', ->
  $('.btnMenu').click()


$(window).resize ->
  changeProducts(window.location.hash)
