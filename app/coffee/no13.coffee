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

Array::shuffle = ->
  this.sort -> 0.5 - Math.random()

window.getQueryString = ->
  _q = {}
  window.location.search.split(/[&?]/)
  .filter (el) -> el != ''
  .map (el) ->
    _q[el.split('=')[0]] = el.split('=')[1]
  _q

getProducts = (tag) ->
  $.get 'products.json', (data) ->
    $.get 'product.html', (html) ->
      products = data.products.map((product) ->
        html.template product
      )
      $('.products').append products
      changeProducts tag
      return
    return
  return

getProduct = (id) ->
  $.get 'products.json', (data) ->
    $.get 'detail.html', (html) ->
      product = data.products.filter (el) -> el.id == id
      .map (el) ->
        i = data.products.indexOf(el)
        el['next_id'] = data.products[(data.products.length + i + 1)%data.products.length].id
        el['prev_id'] = data.products[(data.products.length + i - 1)%data.products.length].id
        html.template el
      $('.details').html(product)
    $.get 'relate_product.html', (html) ->
      products = data.products.filter (el) -> el.id != id
      .shuffle().slice(0,6)
      .map (el) ->
        html.template el
      $('.relate-products .products').html(products)

  return

changeProducts = (tag) ->
  $('.products').isotope
    itemSelector: '.product'
    filter: if tag == '#all' then '*' else tag.replace('#', '.')
  return

$(document).ready ->
  window.tag = window.location.hash || '#all'
  $('.nav a[href*=\\' + tag + ']').parent().addClass 'active'
  if window.location.pathname.match(/\/index.html/)
    setTimeout (->
      $('.logo').css(
        top: $('.logo').offset().top
        left: $('.logo').offset().left
        position: 'fixed'
        'z-index': 1000).appendTo($('#page-content .left')).animate {
        left: '50px'
        top: '30px'
      }, 500, ->
        getProducts tag
        return
      $('#page-container').fadeOut 'fast', ->
        $('#page-container').remove()
        return
      return
    ), 0
  if window.location.pathname.match(/\/details.html/)
    queryString = getQueryString()
    getProduct(queryString.id)
  return
.on 'click', '.nav a', (e) ->
  return true unless window.location.pathname.match(/\/index.html$/)
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
.on 'click', '.product', ->
  window.location = $(this).data().href;

$(window).resize ->
  changeProducts(window.location.hash)
