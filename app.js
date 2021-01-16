var c1,c2;
var N = 150;
var n = 100;
var t = 80;
var b = 60;
var th = 0;

var back = [];
var middle = [];
var inter = [];
var front = [];
var points = [];

var planet, planet2;
var sz, msz;

var viewport;

function setup() {
  var density = displayDensity();
  pixelDensity(density);
  createCanvas(windowWidth, windowHeight);
  c1 = color("#140c35");
  c2 = color("#1dada4");
  c3 = color("#edf683");
  c4 = color("#fcfdef");

  viewport = min( windowHeight, windowWidth );

  planet = createVector(viewport/4.1, -viewport/5);

  sz = viewport/7;
  msz = sz/4;

  frameRate(60);

  init();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  viewport = min( windowHeight, windowWidth );

  planet = createVector(viewport/4.1, -viewport/5);

  sz = viewport/7;
  msz = sz/4;
}

function init() {

  for ( var i = 0; i < N; i++ ) {
    var color;
    if ( i/(N-1) < 1/3 ){
      color = lerpColor( c1, c2, i/(N/3) );
    } else if ( i/(N-1) < 2/3 ) {
      color = lerpColor( c2, c3, (i-N/3)/(N/3) );
    } else {
      color = lerpColor( c3, c4, (i-2*N/3)/(N/3-1) );
    }
    color.setAlpha( 20 + 5*i/(N-1) );
    back.push([color]);
  }

  for ( var i = 0; i < b; i++ ) {
    var color;
    if ( i/(b-1) < 1/3 ){
      color = lerpColor( c1, c2, min( i/(b/3) + random(0, 0.15), 1 ) );
    } else if ( i/(b-1) < 2/3 ) {
      color = lerpColor( c2, c3, min( (i-b/3)/(b/3) + random(0, 0.15), 1 ) );
    } else {
      color = lerpColor( c3, c4, min( (i-2*b/3)/(b/3-1) + random(0, 0.15), 1 ) );
    }

    color.setAlpha( 70 + 5*i/(b-1) );
    r = random( 5, 9 );
    k = 0;
    middle.push([]);
    for ( var j = 0; j < r; j++ ) {
      var x = random( k, k+(TWO_PI-0.01)/r/2 );
      var y = random( k+(TWO_PI-0.01)/r/2, k+(TWO_PI-0.01)/r );
      if ( y < x ) {
        tmp = x;
        x = y;
        y = x;
      }
      var dir = 1;
      if ( random(0,1) < 0.5) 
        dir *= -1;
      middle[i].push([color, x, y, dir ]);
      k += (TWO_PI-0.01)/r;
    }
  }

  for ( var i = 0; i < t; i++ ) {
    var color;
    if ( i/(t-1) < 1/3 ){
      color = lerpColor( c1, c2, max( i/(t/3) + random(0, -0.3), 0 ) );
    } else if ( i/(t-1) < 2/3 ) {
      color = lerpColor( c2, c3, max( (i-t/3)/(t/3) + random(0, -0.3), 0 ) );
    } else {
      color = lerpColor( c3, c4, max( (i-2*t/3)/(t/3-1) + random(0, -0.3), 0 ) );
    }

    color.setAlpha( 70 + 5*i/(t-1) );
    r = random( 9, 15 );
    k = 0;
    inter.push([]);
    for ( var j = 0; j < r; j++ ) {
      var x = random( k, k+(TWO_PI-0.01)/r/2 );
      var y = random( k+(TWO_PI-0.01)/r/2, k+(TWO_PI-0.01)/r );
      if ( y < x ) {
        tmp = x;
        x = y;
        y = x;
      }
      var dir = 1;
      if ( random(0,1) < 0.5) 
        dir *= -1;
      inter[i].push([color, x, y, dir ]);
      k += (TWO_PI-0.01)/r;
    }
  }

  for ( var i = 0; i < n; i++ ) {
    var color;
    if ( i/(n-1) < 1/3 ){
      color = lerpColor( c1, c2, min( i/(n/3) + random(0, 0.15), 1 ) );
    } else if ( i/(n-1) < 2/3 ) {
      color = lerpColor( c2, c3, min( (i-n/3)/(n/3) + random(0, 0.15), 1 ) );
    } else {
      color = lerpColor( c3, c4, min( (i-2*n/3)/(n/3-1) + random(0, 0.15), 1 ) );
    }

    color.setAlpha( 155 + 100*i/(n-1) );

    r = random( 3, 6 );
    k = 0;
    front.push([]);
    for ( var j = 0; j < r; j++ ) {
      var x = random( k, k+(TWO_PI-0.01)/r/2 );
      var y = random( k+(TWO_PI-0.01)/r/2, k+(TWO_PI-0.01)/r );
      if ( y < x ) {
        tmp = x;
        x = y;
        y = x;
      }
      if ( i % 4 < 1 ) continue;
      var dir = 1;
      if ( random(0,1) < 0.5) 
        dir *= -1;
      front[i].push([ color, x, y, dir ]);
      k += (TWO_PI-0.01)/r;
    }
  }

  for ( var i = 0; i < n; i++ ) {
    var color;
    if ( i/(n-1) < 1/3 ){
      color = lerpColor( c1, c2, max( min( i/(n/3) + random(-0.3, 0.3), 1 ), 0) );
    } else if ( i/(n-1) < 2/3 ) {
      color = lerpColor( c2, c3, max( min( (i-n/3)/(n/3) + random(-0.3, 0.3), 1 ), 0) );
    } else {
      color = lerpColor( c3, c4, max( min( (i-2*n/3)/(n/3-1) + random(-0.3, 0.3), 1 ), 0) );
    }

    color.setAlpha( 155 + 100*random(-1,1) );
    r = random( 8, 16 );
    k = 0;
    points.push([]);
    for ( var j = 0; j < r; j++ ) {
      var ang = random( k, k+(TWO_PI-0.01)/r );
      var dir = random(-1,1);
      points[i].push([ color, ang, dir ]);
      k += (TWO_PI-0.01)/r;
    }
  }
}

function draw() {
  background("#140c25");

  scale(1, -1);
  translate(0, -windowHeight);
  
  translate( windowWidth/2 , windowHeight/2 );

  noStroke();
  for ( var i = 0; i < N; i++ ) {
    item = back[i];
    fill( item[0] );
    ellipse( 0, 0, (viewport-40)*( 1-i/(N+1) ) );
  }

  noFill();
  strokeWeight( (viewport-40)/2/(b+1) );
  for ( var i = 0; i < b; i++ ) {
    group = middle[i];
    for ( var j = 0; j < group.length; j++ ) {
      item = group[j];
      
      stroke( item[0] );
      arc( 0, 0, (viewport-40)*( 1-i/(b+1) ), (viewport-40)*( 1-i/(b+1) ), item[1]+th/8*(1.5+(1 - i/(b+1)))*item[3], item[2]+th/8*(1.5+(1 - i/(b+1)))*item[3] );
    }
  }

  strokeWeight( (viewport-40)/2/(t+1) );
  for ( var i = 0; i < t; i++ ) {
    group = inter[i];
    for ( var j = 0; j < group.length; j++ ) {
      item = group[j];
      stroke( item[0] );
      arc( 0, 0, (viewport-40)*( 1-i/(t+1) ), (viewport-40)*( 1-i/(t+1) ), item[1]+th/6*(1.5+(1 - i/(t+1)))*item[3], item[2]+th/6*(1.5+(1 - i/(t+1)))*item[3] );
    }
  }

  strokeWeight( (viewport-40)/2/(n+1) );
  for ( var i = 0; i < n; i++ ) {
    group = front[i];
    for ( var j = 0; j < group.length; j++ ) {
      item = group[j];
      stroke( item[0] );
      arc( 0, 0, (viewport-40)*( 1-i/(n+1) ), (viewport-40)*( 1-i/(n+1) ), item[1] + th/2*(1.5+(1 - i/(n+1))/2)*item[3] , item[2]+th/2*(1.5+(1 - i/(n+1))/2)*item[3] );
    }
  }

  strokeWeight( (viewport-40)/(n+1)/2 );
  for ( var i = 0; i < n; i++ ) {
    group = points[i];
    for ( var j = 0; j < group.length; j++ ) {
      item = group[j];
      stroke( item[0] );
      r = (viewport)*( 1-i/(n+1) );
      arc( 0, 0, r, r, item[1] + th/2*(1.5+(1 - i/(n+1))/2)*item[2] , item[1] + th/2*(1.5+(1 - i/(n+1))/2)*item[2] + 0.0001 );
    }
  }

  push();
  noStroke();
  rotate(2*th/3);
  // planet.set( mouseX - windowWidth/2, -mouseY + windowHeight/2, 0 );
  for ( var i = 0; i < N; i++ ) {

    var j = i/(N-1);
    push();
    translate( planet.x, planet.y );
    var norm = planet.copy().normalize();
    translate( norm.x*msz*j/2+0.1, norm.y*msz*j/2+0.1 );
    rotate( planet.heading() );
    var k1 = lerpColor( c2, c3, 0.5);
    var k2 = lerpColor( c1, c2, 0.2);
    var s = map ( 1-(planet.mag()/viewport), 0, 0.999, 0, 0.5 ) ;
    var k = lerpColor( k1, k2, pow(j, s) );
    k.setAlpha( 25 );
    fill( k );
    ellipse( 0, 0, sz-msz*j, sz-msz*j*0.36 );
    pop();
  }
  pop();

  th += 0.01;

}

window.addEventListener('orientationchange', windowResized);