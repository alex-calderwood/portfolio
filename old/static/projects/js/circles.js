$( document ).ready(function() {

    // Animate through all possible intersection combinations of circles on a grid

    // Select the SVG div with the id drawing
    var s = Snap("#circles");

    // Create some circles
    var circle1 = s.circle(60, 100, 40);
    var circle2 = s.circle(150, 100, 40);
    var circle3 = s.circle(240, 100, 40);

    circle1.attr({
      fill: "none",
      stroke: "black",
      strokeWidth: 0.25,
    });

    circle2.attr({
      fill: "none",
      stroke: "black",
      strokeWidth: 0.25,
    });

    circle3.attr({
      fill: "none",
      stroke: "black",
      strokeWidth: 0.25,
    });

    function sleep(miliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {}
    }

    var anim1 = function() {
        //sleep(1000)
        circle1.animate({cx: 60, cy: 100, r: 40}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 240, cy: 100, r: 40}, 2000, mina.easeinout(), anim2)
    }

    var anim2 = function() {
        //sleep(1000)
        circle1.animate({cx: 60, cy: 100, r: 40}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 190, cy: 100, r: 40}, 2000, mina.easeinout(), anim3)
    }

    var anim3 = function() {
        //sleep(1000)
        circle1.animate({cx: 170, cy: 100, r: 10}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 190, cy: 100, r: 40}, 2000, mina.easeinout(), anim4)
    }

    var anim4 = function() {
        //sleep(1000)
        circle1.animate({cx: 170, cy: 140, r: 40}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 190, cy: 100, r: 40}, 2000, mina.easeinout(), anim5)
    }

    var anim5 = function() {
        //sleep(1000)
        circle1.animate({cx: 150, cy: 100, r: 20}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 240, cy: 100, r: 40}, 2000, mina.easeinout(), anim6)
    }

    var anim6 = function() {
        //sleep(1000)
        circle1.animate({cx: 150, cy: 100, r: 20}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 190, cy: 100, r: 40}, 2000, mina.easeinout(), anim7)
    }

    var anim7 = function() {
        //sleep(1000)
        circle1.animate({cx: 150, cy: 100, r: 20}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 150, cy: 100, r: 30}, 2000, mina.easeinout(), anim8)
    }

    var anim8 = function() {
        //sleep(1000)
        circle1.animate({cx: 170, cy: 100, r: 30}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 190, cy: 100, r: 40}, 2000, mina.easeinout(), anim9)
    }

    var anim9 = function() {
        //sleep(1000)
        circle1.animate({cx: 150, cy: 100, r: 20}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 217, cy: 100, r: 40}, 2000, mina.easeinout(), anim10)
    }

    var anim10 = function() {
        //sleep(1000)
        circle1.animate({cx: 183.5, cy: 190, r: 60}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 217.5, cy: 100, r: 40}, 2000, mina.easeinout(), anim11)
    }

     var anim11 = function() {
        //sleep(1000)
        circle1.animate({cx: 140, cy: 100, r: 20}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 160, cy: 100, r: 20}, 2000, mina.easeinout(), anim12)
    }

     var anim12= function() {
        //sleep(1000)
        circle1.animate({cx: 125, cy: 100, r: 20}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 60}, 2000, mina.easeinout())
        circle3.animate({cx: 175, cy: 100, r: 20}, 2000, mina.easeinout(), anim13)
    }

     var anim13 = function() {
        //sleep(1000)
        circle1.animate({cx: 130, cy: 100, r: 40}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 170, cy: 100, r: 40}, 2000, mina.easeinout(), anim14)
    }

     var anim14 = function() {
        //sleep(1000)
        circle1.animate({cx: 83, cy: 100, r: 40}, 2000, mina.easeinout())
        circle2.animate({cx: 150, cy: 100, r: 40}, 2000, mina.easeinout())
        circle3.animate({cx: 217, cy: 100, r: 40}, 2000, mina.easeinout(), anim1)
    }

    anim1()

    // TODO
    // Just use a loop
    // Look at this course https://css-tricks.com/lodge/svg/01-intro-course/
    // Here is a cheatsheet https://learn-the-web.algonquindesign.ca/topics/svg-cheat-sheet/

})
