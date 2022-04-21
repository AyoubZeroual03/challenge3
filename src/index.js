/*first thing we create to arrays
 to store months and week days
*/
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var enddateparagraph = document.querySelector(".enddateparagraph");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

/* create a temporary date equals to today's date */
var tempDate = new Date();
var tempYear = tempDate.getFullYear();
var tempMonth = tempDate.getMonth();
var tempDay = tempDate.getDate();

// create future date based on temp date
var futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

var year = futureDate.getFullYear();
var hours = futureDate.getHours();
var minutes = futureDate.getMinutes();
var month = futureDate.getMonth();

var endMonth = months[month];
var weekDay = weekdays[futureDate.getDay()];
var date = futureDate.getDate();
enddateparagraph.textContent =
  "Registrations ends on " +
  weekDay +
  "," +
  date +
  " " +
  endMonth +
  " " +
  year +
  "," +
  hours +
  ":" +
  minutes +
  "am";

/**
 * here starts the timer
 */

var futureTime = futureDate.getTime();
function getRemaindingTime() {
  var today = new Date().getTime();

  var t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds
  var oneDay = 24 * 60 * 60 * 1000;
  var oneHour = 60 * 60 * 1000;
  var oneMinute = 60 * 1000;
  // calculate all values
  var days = t / oneDay;
  days = Math.floor(days);
  var hours = Math.floor((t % oneDay) / oneHour);
  var minutes = Math.floor((t % oneHour) / oneMinute);
  var seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  var values = [days, hours, minutes, seconds];
  function format(item) {
    if (item < 10) {
      return (item = "0" + item);
    }
    return item;
  }

  for (var i = 0; i < items.length; i++) {
    items[i].innerHTML = format(values[i]);
  }

  if (t < 0) {
    // if the timer reach 0 we stop the
    // countdown by clearinterval function
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}

// set a countdown to call the function
// every one second
let countdown = setInterval(getRemaindingTime, 1000);
// call the function for the first time
getRemaindingTime();
