
// THROTTLING ATTACKS OF THE TOWERS
$(document).ready(function(){
  var tower1 = document.getElementById('tower');
  $(tower1).on('click', throttle(function(){
    attack1();
    var $this = $(this).toggleClass("enlarged");
    setTimeout(function () {
      $this.toggleClass("enlarged");
    }, 3000);
    // $(this).removeClass('enlarged', 3000);
    // console.log("It works");
  }, 3000));

  var tower_1 = document.getElementById('tower-1');
  $(tower_1).on('click', throttle(function(){
    attack1();
    var $this = $(this).toggleClass("enlarged");
    setTimeout(function () {
      $this.toggleClass("enlarged");
    }, 3000);
    // console.log("It works here too");
  }, 3000));
  var tower2 = document.getElementById('tower2');
  $(tower2).on('click', throttle(function(){
    attack2();
    var $this = $(this).toggleClass("enlarged-2");
    setTimeout(function () {
      $this.toggleClass("enlarged-2");
    }, 6000);
     console.log("It works freezing");
  }, 6000));
  // var tower20 = document.getElementById('tower20');
  // $(tower20).on('click', throttle(function(){
  //   attack2();
  //    console.log("It works freezing here too");
  // }, 6000));
  var tower3 = document.getElementById('tower3');
  $(tower3).on('click', throttle(function(){
    attack3();
    var $this = $(this).toggleClass("enlarged-3");
    setTimeout(function () {
      $this.toggleClass("enlarged-3");
    }, 10000);
     console.log("TRUMP");
  }, 10000));

  });
//-----------------------------------
// FINDING THE POSITION OF ELEMENT
// -------------------------------------

// Drawing the canvas
var canvas  = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width= 700;
canvas.height = 520;
canvas.style.background = "url(css/background-mexico.png)";
document.body.appendChild(canvas, id= "canvas") ;

ctx.lineWidth=2;
// Used to track time
var lastTime = false;

// Immigrant constructor function
function Immigrant (health,speed, path, pathLength, image_id) {
     this.x = 0;
     this.y = 0;
     this.health = health;
     this.speed = speed ;
     this.path  = path  ;
     this.image_id = image_id;
     this.pathLength = pathLength;
     this.pathIndex = 0 ;
     this.ratio = 0     ;
     console.log(this);

}


Immigrant.prototype = {
    draw : function() {
           var width = 2;
           var image = document.getElementById(this.image_id);
           ctx.save();
          //  ctx.translate(this.x, this.y);
           ctx.drawImage (image,this.x, this.y);
           ctx.strokeRect(- width, -width, 5*width, 5* width);
           ctx.restore();
 },
    move : function(dt) {
           // distance to travel
           var distance = Math.abs( dt * this.speed );
           // speed sign
           var sign     = (this.speed > 0) ? 2 : -2 ;
           var segLength=0, remainingSegLength=0;
           while (distance >0) {
           // current segment length
           segLength = this.pathLength[this.pathIndex >> 1];
          // remaining segment length : depends on speed sign
             if (sign >0) {
                 if (this.ratio == 0)  remainingSegLength=segLength;
                   else remainingSegLength = (1-this.ratio) * segLength;
               } else {
                 if (this.ratio == 1) remainingSegLength=segLength;
                   else remainingSegLength = this.ratio * segLength;
             }

             if (remainingSegLength < distance) {
                // if this segment cannot eat up the distance, skip to next.
                distance -= remainingSegLength; // eat
                this.ratio = (sign >0) ? 0 : 1; // new ratio within segment
                // loop if encounter the end of the path
                   if ( (sign<0 && this.pathIndex == 0) ||
                        (sign>0 && this.pathIndex == this.path.length-4))  {

                          // REACHING THE END OF THE PATH
                          // console.log("IT HAPPENING");
                          alert ("HE SUCCESFULLY IMMIGRATED GAME IS OVER");
                          setTimeout(location.reload(), 4000);
                          // throw new Error("FINITO");
                          // endDialogue();
                          // this.speed = -this.speed;
                          // this.ratio= (this.speed >0) ? 0 : 1;
                          // break;
             }
                      // iterating through array
                      this.pathIndex +=sign;
                      } else {

                      var ratio = distance / segLength ;
                      this.ratio += (sign>0) ? ratio : -ratio;
                      break;
                      }
              }
      // Computing new x and y for animation
       this.x = this.path[this.pathIndex] +
            this.ratio *(this.path[this.pathIndex+2] - this.path[this.pathIndex]) ;
       this.y = this.path[this.pathIndex+1] +
            this.ratio *(this.path[this.pathIndex+3] - this.path[this.pathIndex+1]);
      }
 };


//Drawing the path
 function drawPath(path) {
    ctx.beginPath();
    ctx.moveTo(path[0],path[1]);
     for (var i=2; i<path.length; i+=2) {
         ctx.lineTo(path[i], path[i+1]);
     }
    ctx.stroke();
    ctx.strokeStyle = "rgba(236, 232, 217, 0)";
 }

 function buildSegLength(path) {
    var segLength = [];
    for (var i=0 ; i<=path.length-4; i+=2) {
       segLength.push(Math.sqrt (
                           sq(path[i+2] - path[i]) + sq(path[i+3] - path[i+1]) ));
     }
     return segLength;
}
function sq(x) { return x*x }
// creating path
 var simplePath = [10,175, 30,175 , 30,60, 135,60 , 135,410, 230,410 , 230,300, 340,300, 340, 420, 440, 420,440, 170,240, 170, 240, 60, 630, 60, 630, 160, 535,160, 535, 515 ];

// creating immigrants.

var bigMexican2 = new  Immigrant( 20,0.13, simplePath, buildSegLength(simplePath), 'attacker1');
// var bigMexican = new Immigrant(20,0.08, simplePath, buildSegLength(simplePath), 'attacker1');
//
var mexicanKid = new Immigrant(10,0.15, simplePath,  buildSegLength(simplePath), 'attacker2');
// var mexicanKid2 = new Immigrant(15,0.09, simplePath, buildSegLength(simplePath), "attacker2");
// var coyote = new Immigrant(15,0.2, simplePath, buildSegLength(simplePath), 'attacker2');
//
//
 var mariarchi = new Immigrant(15,0.09, simplePath, buildSegLength(simplePath), "attacker3");
// var one = new Immigrant(15,0.25, simplePath, buildSegLength(simplePath), "attacker3" );
 // var two =new Immigrant(0.15, simplePath, buildSegLength(simplePath));
 // var three =new Immigrant(0.025, simplePath, buildSegLength(simplePath));
 // var four=new Immigrant(0.18, simplePath, buildSegLength(simplePath));
 // var five =new Immigrant(0.05, simplePath, buildSegLength(simplePath));
// -------------------------------------
// STARTING THE GAME
// -------------------------------------
function endDialogue() {
  if (confirm("WOULD YOU LIKE TO TRY ONE MORE TIME?!") == true) {
       location.reload();
    } else {
        alert ("THINK TWICE BEFORE LEAVING");
    }
}
function invade() {
  if (!lastTime) {
    lastTime  = Date.now();
  }
  // compute time elapsed
  var now = Date.now();
  var delta = now - lastTime;
  lastTime = now;
  // ERASE!!!!!!!!!
   ctx.clearRect(0,0,800,800);
  // draw
  drawPath(simplePath);
  // -----------------------------------------------------------------
  // HEALTH BARS
  // -----------------------------------------------------------------
      var health = document.getElementById("health-of-mexican");
             health.value = bigMexican2.health;
      var healthkid = document.getElementById("health-of-kid");
             healthkid.value = mexicanKid.health;
      var healthmariachi = document.getElementById("health-of-mariarchi");
             healthmariachi.value = mariarchi.health;
  // Drawing immigrants
  if (mexicanKid.health>=0) {
    mexicanKid.draw();
    mexicanKid.move(delta);

  }
  if (bigMexican2.health>=0) {
     bigMexican2.draw();
     bigMexican2.move(delta);
  }
  if (mariarchi.health>=0) {
     mariarchi.draw();
     mariarchi.move(delta);
  }
  if (bigMexican2.health<=0   &&
      mariarchi.health<=0     &&
      mexicanKid.health<=0) {
        if (confirm("TRUMP IS PROUD OF YOU! WOULD YOU LIKE TO TRY ONE MORE TIME?!") == true) {
             location.reload();
          } else {
              alert ("THINK TWICE BEFORE LEAVING");
          }

    }
  //  mexicanKid2.draw();
  //  coyote.draw();
  //  one.draw();
  //  four.draw();
  //  five.draw();

  // Update every frame

  //  bigMexican.move(delta);


  //  mexicanKid2.move(delta);
  //  coyote.move(delta);
  //  one.move(delta);
    //  four.move(delta);
  //  five.move(delta);
// animate


          // console.log("Kid's health:"+mexicanKid.health);
          // console.log("TACO HEALTH:"+bigMexican2.health);
          // console.log("MARIACHI:"+mariarchi.health);

   requestAnimationFrame(invade);

 }
// STOPING ANIMATION ON THE END OF GAME

 // --------------------------------------------------
 // Placing towers onto canvas
 // --------------------------------------------------

 function allowDrop(ev) {
     ev.preventDefault();
 }

 function drag(ev) {
     ev.dataTransfer.setData("text", ev.target.id);

 }

 function drop(ev) {
     ev.preventDefault();
     var data = ev.dataTransfer.getData("text");
     ev.target.appendChild(document.getElementById(data));
 }
// ---------------------------------------------------------
// ATTACK FUNCTION FOR TOWERS
// ---------------------------------------------------------
var throttle = function(fn, delay) {
     delay || (delay = 100);
     var throttle = false;
     return function(){
         if (throttle) { return; }
         throttle = setTimeout(function(){ throttle = false; }, delay);
         fn.apply(this, arguments);
     };
 };



function attack1() {
        bigMexican2.health = bigMexican2.health-1;
        mexicanKid.health--;
        mariarchi.health--;

        console.log("I attack once in 3 seconds");

    }

function attack2() {
          mexicanKid.speed = mexicanKid.speed - 0.02;
          bigMexican2.speed = bigMexican2.speed-0.02;
          mariarchi.speed = mariarchi.speed - 0.02;

  console.log("I'm freezing people around me");
}

function attack3 () {
         bigMexican2.health=bigMexican2.health/2;
         mexicanKid.health = mexicanKid.health*0.75;
         mariarchi.health = mariarchi.health/2;

  console.log("I'm taking half of the life");
}
