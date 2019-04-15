//countdown section
const countdown = document.querySelector('.image');
// I wanted the time when the image appears to be 1 min after the user enters the page 
var minutes = 1;
const currentDate = new Date();
var futureDate = currentDate.getTime() + minutes*60000;
const intvl = setInterval(() => {
  // Get todays date and time (ms)
  const now = new Date().getTime();
  // Distance from now to the launch date
  const distance = futureDate - now;
  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60  * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  countdown.innerHTML = `
    <div>${days}<span>Days</span></div>
    <div>${hours}<span>Hours</span></div>
    <div>${mins}<span>Minutes</span></div>
    <div>${seconds}<span>Seconds</span></div>
  `; 
  if(distance < 0) {
    // Stop countdown
    clearInterval(intvl);
    document.getElementById("nameOfWinner").style.display = "block";
    countdown.style.display = "none";
    countdown.innerHTML = document.getElementById("nameOfWinner");
  }
}, 1000);