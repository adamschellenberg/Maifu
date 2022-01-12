





// ----------------------------------------------------------------------
// Everything below is here is the 10 minute game timer

// Sets the timer to 10 minutes when "Start Game" is clicked
function GameTimer() {
    var display = document.querySelector('#timeRemaining'),
        timer = new CountDownTimer(600);
  
    // starts the timer
    timer.onTick(format).onTick(endGame).start();
  
    // ends the game when the timer hits 00:00
    // TODO: endgame message and update screen to endgame background and ghost sprite
    function endGame() {
        if (this.expired()) {
            alert("Game over! Thanks for playing!");
        }
    }
  
    // formats the timer to 00:00
    function format(minutes, seconds) {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ':' + seconds;
    }
  }


 // countdown functionality
  function CountDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
  }
  
  CountDownTimer.prototype.start = function() {
    if (this.running) {
      return;
    }
    this.running = true;
    var start = Date.now(),
        that = this,
        diff, obj;
  
    (function timer() {
      diff = that.duration - (((Date.now() - start) / 1000) | 0);
      
      if (diff > 0) {
        setTimeout(timer, that.granularity);
      } else {
        diff = 0;
        that.running = false;
      }
  
      obj = CountDownTimer.parse(diff);
      that.tickFtns.forEach(function(ftn) {
        ftn.call(this, obj.minutes, obj.seconds);
      }, that);
    }());
  };
  

  CountDownTimer.prototype.onTick = function(ftn) {
    if (typeof ftn === 'function') {
      this.tickFtns.push(ftn);
    }
    return this;
  };
  
  // stops timer once it hits 00:00
  CountDownTimer.prototype.expired = function() {
    return !this.running;
  };
  
  // converts time remaining to minutes and seconds
  CountDownTimer.parse = function(seconds) {
    return {
      'minutes': (seconds / 60) | 0,
      'seconds': (seconds % 60) | 0
    };
  };