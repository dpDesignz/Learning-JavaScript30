let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// Display the results in the browser
function displayTimeLeft(seconds) {
  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  // Display the results
  const display = `${minutes}:${
    remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds
  }`;
  timerDisplay.textContent = display;

  // Update page title
  document.title = `Time Left: ${display}`;
}

// Display the end time in the browser
function displayEndTime(timestamp) {
  // Turn timestamp into date
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minute = end.getMinutes();

  // Display the results
  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${
    minute < 10 ? `0${minute}` : minute
  }`;
}

// Set the timer
function timer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);

  // Extract the data
  const now = Date.now();
  const then = now + seconds * 1000;

  // Run the functions
  displayTimeLeft(seconds);
  displayEndTime(then);

  // Set the interval
  countdown = setInterval(() => {
    // Check how much time is left
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // Check if 0 reached
    if (secondsLeft < 0) {
      // Clear the interval
      clearInterval(countdown);
    }
    // Display value
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// Listen to start timer
function startTimer() {
  // Get the seconds
  const seconds = parseInt(this.dataset.time);
  // Run the timer
  timer(seconds);
}

// Listen for button click
buttons.forEach(button => button.addEventListener('click', startTimer));

// Listen for form actions
document.customForm.addEventListener('submit', function(e) {
  // Stop the form submission
  e.preventDefault();

  // Get the minutes
  const mins = this.minutes.value;

  // Run the timer
  timer(mins * 60);

  // Clear the form
  this.reset();
});
