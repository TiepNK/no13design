(function() {
  var changeProducts, getProducts;

  getProducts = function(tag) {
    $.get('products.json', function(data) {
      $.get('product.html', function(template) {
        var products;
        products = data.products.map(function(product) {
          return template.template(product);
        });
        $('.products').append(products);
        changeProducts(tag);
      });
    });
  };

  changeProducts = function(tag) {
    $('.products').isotope({
      itemSelector: '.product',
      filter: tag === '#all' ? '*' : tag.replace('#', '.')
    });
  };

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

  $(document).ready(function() {
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
        $('.nav ul').slideDown();
        window.tag = location.hash || '#all';
        $('.nav a[href=\\' + tag + ']').parent().addClass('active');
        getProducts(tag);
      });
      $('#page-container').fadeOut('fast', function() {
        $('#page-container').remove();
      });
    }), 0);
  }).on('click', '.nav a', function(e) {
    e.preventDefault();
    window.history.pushState(null, $(this).html(), this.href);
    $(this).parent().parent().children('.active').removeClass('active');
    $(this).parent().addClass('active');
    changeProducts(window.location.hash);
    return false;
  });

}).call(this);
