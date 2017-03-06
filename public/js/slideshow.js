!function() {
  $('a.full-stack').hover(function() {
    $('ul.full-stack').addClass('active');
  }, function() {
    $('ul.full-stack').removeClass('active');
  });
}();
