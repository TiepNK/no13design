(function() {
  var changeProducts, getProduct, getProducts;

  String.prototype.template = function(params) {
    var key, self;
    self = this;
    switch (typeof self) {
      case 'string':
        return;
      case 'object':
        for (key in params) {
          self = self.replace(eval('/{{' + key + '}}/g'), params[key]);
        }
        return self;
    }
  };

  Array.prototype.shuffle = function() {
    return this.sort(function() {
      return 0.5 - Math.random();
    });
  };

  window.getQueryString = function() {
    var _q;
    _q = {};
    window.location.search.split(/[&?]/).filter(function(el) {
      return el !== '';
    }).map(function(el) {
      return _q[el.split('=')[0]] = el.split('=')[1];
    });
    return _q;
  };

  getProducts = function(tag) {
    $.get('products.json', function(data) {
      $.get('product.html', function(html) {
        var products;
        products = data.products.map(function(product) {
          return html.template(product);
        });
        $('.products').append(products);
        changeProducts(tag);
      });
    });
  };

  getProduct = function(id) {
    $.get('products.json', function(data) {
      $.get('detail.html', function(html) {
        var product;
        product = data.products.filter(function(el) {
          return el.id === id;
        }).map(function(el) {
          var i;
          i = data.products.indexOf(el);
          el['next_id'] = data.products[(data.products.length + i + 1) % data.products.length].id;
          el['prev_id'] = data.products[(data.products.length + i - 1) % data.products.length].id;
          return html.template(el);
        });
        return $('.details').html(product);
      });
      return $.get('relate_product.html', function(html) {
        var products;
        products = data.products.filter(function(el) {
          return el.id !== id;
        }).shuffle().slice(0, 6).map(function(el) {
          return html.template(el);
        });
        return $('.relate-products .products').html(products);
      });
    });
  };

  changeProducts = function(tag) {
    $('.products').isotope({
      itemSelector: '.product',
      filter: tag === '#all' ? '*' : tag.replace('#', '.')
    });
  };

  $(document).ready(function() {
    var queryString;
    window.tag = window.location.hash || '#all';
    $('.nav a[href*=\\' + tag + ']').parent().addClass('active');
    if (window.location.pathname.match(/\/index.html/)) {
      setTimeout((function() {
        $('.logo').css({
          top: $('.logo').offset().top,
          left: $('.logo').offset().left,
          position: 'fixed',
          'z-index': 1000
        }).appendTo($('#page-content .left')).animate({
          left: '50px',
          top: '30px'
        }, 500, function() {
          getProducts(tag);
        });
        $('#page-container').fadeOut('fast', function() {
          $('#page-container').remove();
        });
      }), 0);
    }
    if (window.location.pathname.match(/\/details.html/)) {
      queryString = getQueryString();
      getProduct(queryString.id);
    }
  }).on('click', '.nav a', function(e) {
    if (!window.location.pathname.match(/\/index.html$/)) {
      return true;
    }
    e.preventDefault();
    window.history.pushState(null, $(this).html(), this.href);
    $(this).parent().parent().children('.active').removeClass('active');
    $(this).parent().addClass('active');
    changeProducts(window.location.hash);
    return false;
  }).on('click', '.btnMenu', function() {
    $(this).prev('ul').toggleClass('open');
    return $(this).toggleClass('cross');
  }).on('click', '.open a', function() {
    return $('.btnMenu').click();
  }).on('click', '.product', function() {
    return window.location = $(this).data().href;
  });

  $(window).resize(function() {
    return changeProducts(window.location.hash);
  });

}).call(this);
