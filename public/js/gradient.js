$(document).ready(function() {
  function randIdx() {
    return Math.floor(Math.random() * (colors.length - 1));
  }

  var colors = new Array( [17, 40, 76],
                          [81, 119, 15],
                          [119, 15, 15],
                          [96, 37, 46],
                          [23, 93, 109] );
  var step = 0;
  var gradientSpeed = 0.02;
  var colorIndices = [];

  for (var i = 0; i < 5; i++) {
    colorIndices.push(randIdx());
  }

  // Calculate gradient colors
  function updateGradient() {
    function assignInitTargColors() {
      initialColor1L = colors[colorIndices[0]];
      targetColor1L = colors[colorIndices[1]];
      initialColor2L = colors[colorIndices[2]];
      targetColor2L = colors[colorIndices[3]];
    }
    function currentColorLeft() {
      redLeft = calcColor(initialColor1L, targetColor1L, 0, step, counterStep);
      greenLeft = calcColor(initialColor1L, targetColor1L, 1, step, counterStep);
      blueLeft = calcColor(initialColor1L, targetColor1L, 2, step, counterStep);
      colorLeft = buildRGBString(redLeft, greenLeft, blueLeft);
    }
    function currentColorRight() {
      redRight = calcColor(initialColor2L, targetColor2L, 0, step, counterStep);
      greenRight = calcColor(initialColor2L, targetColor2L, 1, step, counterStep);
      blueRight = calcColor(initialColor2L, targetColor2L, 2, step, counterStep);
      colorRight = buildRGBString(redRight, greenRight, blueRight);
    }
    function calcCurrentColors() {
      currentColorLeft();
      currentColorRight();
    }
    function reassignColors() {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];

      colorIndices[1] = randomIndex(colorIndices[1]);
      colorIndices[3] = randomIndex(colorIndices[3]);
    }

    // UpdateGradient Logic
    if ($===undefined) return;

    var counterStep = 1 - step;
    var initialColor1L;
    var targetColor1L;
    var initialColor2L;
    var targetColor2L;

    var redLeft;
    var greenLeft;
    var blueLeft;
    var colorLeft;

    var redRight;
    var greenRight;
    var blueRight;
    var colorRight;

    assignInitTargColors();
    calcCurrentColors();

    step += gradientSpeed;

    if (step >= 1) {
      reassignColors();
    }

    return [colorLeft, colorRight];
  }

  function randomNum(prevIndex) {
    return prevIndex + Math.floor(1 + Math.random() * (colors.length - 1));
  }

  function randomIndex(prevIndex) {
    return randomNum(prevIndex) % colors.length;
  }

  function calcColor(initial, target, num, step, counterStep) {
    return Math.round(counterStep * initial[num] + step * target[num]);
  }

  function buildRGBString(red, green, blue) {
    return "rgba(" + red + "," + green + "," + blue + ", 1)";
  }

  function renderColors() {
    var colors = updateGradient();
    var colorLeft = colors[0];
    var colorRight = colors[1];


    // Add background gradient
    $('.gradient').css({ background: "-webkit-gradient(linear, left top, right top, from(" + colorLeft + "), to(" + colorRight + "))" })
                  .css({ background: "-moz-linear-gradient(left, " + colorLeft + " 0%, " + colorRight + " 100%)" });

    $('a.hover-effect').hover(function() {
      $(this).css({ background: "-webkit-gradient(linear, left top, right top, from(" + colorLeft + "), to(" + colorRight + "))" })
             .css({ background: "-moz-linear-gradient(left, " + colorLeft + " 0%, " + colorRight + " 100%)" })
             .css({ webkitBackgroundClip: 'text' })
             .css({ mozBackgroundClip: 'text'})
             .css({ webkitTextFillColor: 'transparent' });
    }, function () {
      $(this).css({ webkitBackgroundClip: '' })
             .css({ webkitTextFillColor: '' })
             .css({ mozBackgroundClip: ''})
             .css({ background: ''});
    });

    // Overlay transition and text gradient
    function overlayHeader() {
      var headerHeight = $('header').outerHeight();
      var windowTop = $(window).scrollTop();
      var scrollHeight = $(document).height();
	    var scrollPosition = $(window).height() + $(window).scrollTop();
      var contentTop = $('main').offset().top - headerHeight;

      if (windowTop > contentTop) {
          $('header').addClass('white');
          $('header .blog a').css({ background: "-webkit-gradient(linear, left top, right top, from(" + colorLeft + "), to(" + colorRight + "))" })
                             .css({ background: "-moz-linear-gradient(left, " + colorLeft + " 0%, " + colorRight + " 100%)" })
                             .css({ webkitBackgroundClip: 'text' })
                             .css({ mozBackgroundClip: 'text'})
                             .css({ webkitTextFillColor: 'transparent' });
          $('header .icon').addClass('show');
      } else {
          $('header').removeClass('white');
          $('header .blog a').css({ background: '' })
                             .css({ webkitBackgroundClip: '' })
                             .css({ mozBackgroundClip: ''})
                             .css({ webkitTextFillColor: '' });
          $('header .icon').removeClass('show');
      }
    }

    $(window).scroll(overlayHeader);
    overlayHeader();
  }


  renderColors();
  setInterval(renderColors, 500);
});
