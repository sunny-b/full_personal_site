!function () {
  function randIdx() {
    return Math.floor(Math.random() * (colors.length - 1));
  }

  var colors = new Array( [232, 100, 167],
                          [150, 51, 244],
                          [100, 149, 231],
                          [51, 224, 207],
                          [162, 215, 67],
                          [251, 77, 48],
                          [232, 100, 167] );
  var step = 0;
  var gradientSpeed = 0.005;
  var colorIndices = [];

  for (var i = 0; i < 5; i++) {
    colorIndices.push(randIdx());
  }

  function updateGradient() {
    function assignInitTargColors() {
      initialColor1L = colors[colorIndices[0]];
      targetColor1L = colors[colorIndices[1]];
      initialColor2L = colors[colorIndices[2]];
      targetColor2L = colors[colorIndices[3]];
    }
    function calcColor(initial, target, num) {
      return Math.round(counterStep * initial[num] + step * target[num]);
    }
    function buildRGBString(red, green, blue) {
      return "rgba(" + red + "," + green + "," + blue + ", .5)";
    }
    function currentColorLeft() {
      redLeft = calcColor(initialColor1L, targetColor1L, 0);
      greenLeft = calcColor(initialColor1L, targetColor1L, 1);
      blueLeft = calcColor(initialColor1L, targetColor1L, 2);
      colorLeft = buildRGBString(redLeft, greenLeft, blueLeft);
    }
    function currentColorRight() {
      redRight = calcColor(initialColor2L, targetColor2L, 0);
      greenRight = calcColor(initialColor2L, targetColor2L, 1);
      blueRight = calcColor(initialColor2L, targetColor2L, 2);
      colorRight = buildRGBString(redRight, greenRight, blueRight);
    }
    function calcCurrentColors() {
      currentColorLeft();
      currentColorRight();
    }
    function renderColors() {
      // Remove background style for links when not hovering
      $('.gradient-text a').css({ background: ''});
      // Add background gradient
      $('.gradient, .gradient-text a:hover').css({ background: "-webkit-gradient(linear, left top, right top, from(" + colorLeft + "), to(" + colorRight + "))" })
              .css({ background: "-moz-linear-gradient(left, " + colorLeft + " 0%, " + colorRight + " 100%)" });
      // Readjust background for text
      $('.gradient-text, .gradient-text a').css({ webkitBackgroundClip: 'text' })
                 .css({ webkitTextFillColor: 'transparent' });
      $('.gradient-text a:hover').css({ webkitTextFillColor: 'white' });
    // $('body').css({ background: "radial-gradient(" + colorLeft + ", " + colorRight + ")" })
    //          .css({ background: "-moz-radial-gradient(" + colorLeft + " 0%, " + colorRight + " 100%)" });

    }
    function reassignColors() {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];

      colorIndices[1] = randomIndex(colorIndices[1]);
      colorIndices[3] = randomIndex(colorIndices[3]);
    }
    function randomIndex(prevIndex) {
      return randomNum(prevIndex) % colors.length;
    }
    function randomNum(prevIndex) {
      return prevIndex + Math.floor(1 + Math.random() * (colors.length - 1));
    }

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
    renderColors();

    step += gradientSpeed;

    if (step >= 1) {
      reassignColors();
    }
  }

  setInterval(updateGradient, 50);
}();
