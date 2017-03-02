!function() {
  $('a.front-end').hover(function() {
    $('ul.front-end').addClass('active');
  }, function() {
    $('ul.front-end').removeClass('active');
  });

  $('a.back-end').hover(function() {
    $('ul.back-end').addClass('active');
  }, function() {
    $('ul.back-end').removeClass('active');
  });
}();
