var $ = Sizzle;
var T = 10;
var W = 1300;
var FAST = T * 0.02;
var MED = T * 0.1;
var SLOW = T * 0.2;
window.onload = function(){

  var aday = $('#aday'),
      time = $('#time'),
      line1 = $('#line1'),
      line2 = $('#line2'),
      line3 = $('#line3'),
      lawer = $('#lawer'),
      speech = $('#speech'),
      bird = $('#bird'),
      lawer = $('#lawer'),
      terminal = $('#terminal'),
      map = $('#map'),
      planArea = $('#planArea'),
      plane = $('#plane'),
      planeLine1 = $('#planeLine1'),
      planeLine2 = $('#planeLine2'),
      offToMeeting = $('#offToMeeting'),
      cloud1 = $('#cloud1'),
      cloud2 = $('#cloud2'),
      cloud3 = $('#cloud3'),
      cloud4 = $('#cloud4')
  ;
  // A Day At Maurice Blackburn 11:33am 
  var tlInfo = new TimelineMax();
  tlInfo
    .to(aday, FAST, { opacity: 1, ease:Linear.easeNone })
    .to(time, MED, { opacity: 1, ease:Linear.easeNone })
  ;


  var tl = new TimelineMax();
  //these lines must run at the same velocity
  var W1 = 1230, H1 = 271, W2 = 55;
  var SUM = W1 + H1 + W2;
  var v = SUM / T;
  //portions of time each of them will run
  var t1 = W1 / v, t2 = H1 / v, t3 = W2 / v;
  tl
    .to(line1, t1, { width: W1, ease:Linear.easeNone })
    .to(line2, t2, { height: H1, ease:Linear.easeNone })
    .to(line3, t3, { width: W2, ease:Linear.easeNone })
    .to(map, FAST, { 'background-size': '100% 100%', opacity: 1, ease: Power4.easeOut });

  tl
    .to(terminal, MED, { opacity: 1, ease: Power4.easeIn }, 35 / v);


  //plane
  var x1 = 220;
  var x2 = 280;
  var x3 = 520;
  var planeT = x3 / v; //plane starts when the dot reach it
  tl
    .to(plane, MED, {opacity: 1, ease: Power4.easeIn}, x2 / v)
    .fromTo(planArea, T/4, {left: 180, bottom: 80, rotation: 10}, {left: 290, bottom: 80, rotation: 10, ease: Linear.easeNone}, planeT)
    .to(planArea, 3*T/4, { bezier: {type: 'soft', values: [
      {left: 390, bottom: 80, rotation: 10},
      {left: 440, bottom: 110, rotation: 0}, 
      {left: 1300, bottom: 500, rotation: -10}
    ], ease:Linear.easeNone } }, planeT + T/4)
    .to(planeLine1, MED * 5, { opacity: 1 }, planeT + T*0.8/4)
    .to(planeLine2, MED * 5, { opacity: 1 }, planeT + T*0.8/4)
  ;

  var tFrame2 = planeT;
  //lawer
  tl
    .to(lawer, SLOW, { opacity: 1, ease: Power4.easeIn }, tFrame2)
  ;
  //speech bubble
  tl
    .to(speech, SLOW, { 'background-size': '100% 100%', opacity: 1, ease: Power4.easeOut }, tFrame2 + SLOW)
  ;

  //bird
  var birdT = tFrame2 + SLOW + 400 / v; //wait for the dot to go till 1/3 of the screen
  tl
    .to(bird, FAST, {opacity: 1, ease: Power4.easeIn}, birdT)
    .to(bird, (T - tFrame2) * 0.75, { bezier: {type: 'soft', values: [{left: 380, top: 190}, {left: 640, top: 190}, {left: 750, top: 250}, {left: 750, top: 340}] }, ease: Power3.easeOut }, birdT);

  tl
    .to(offToMeeting, MED, { 'background-size': '100% 100%', opacity: 1, ease: Power4.easeOut }, planeT)
  ;

  //these clouds run from left to right and loop, with the same velocity
  var cloudTl = new TimelineMax();
  var c1L = 52, c2L = 139, c3L = 569, c4L = 1123;
  var c1W = 81, c2W = 23, c3W = 53, c4W = 53;
  var ct1 = (W - c1L)*T/W, ct2 = (W - c2L)*T/W, ct3 = (W - c3L)*T/W, ct4 = (W - c4L)*T/W;
  cloudTl
    .set(cloud1, {left: c1L, width: c1W})
    .set(cloud2, {left: c2L, width: c2W})
    .set(cloud3, {left: c3L, width: c3W})
    .set(cloud4, {left: c4L, width: c4W})
    .oneTimeRepeat(cloud1, ct1, -c1W, 1.8*1.5)
    .oneTimeRepeat(cloud3, ct3, -c3W, 2*1.5)
    .oneTimeRepeat(cloud4, ct4, -c4W, 2*1.5)
    .oneTimeRepeat(cloud2, ct2, -c2W, 2.2*1.5)
  ;
};

//shortcut helper
TimelineMax.prototype.oneTimeRepeat = function(el, time, startLeft, x) {
  return this.to(el, time * x, { left: (W), ease:Linear.easeNone, repeat: 1, onRepeat: function() { repeatIt(el, startLeft, x); } }, 0);
};

function repeatIt(element, startLeft, x) {
  TweenMax.fromTo(element, T*2*x, {left: startLeft}, {left: W, repeat: -1, ease:Linear.easeNone});
}
