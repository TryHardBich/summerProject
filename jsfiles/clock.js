function update() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day = date.toLocaleString('en-US', { weekday: 'long' });
  let month = date.toLocaleString('en-US', { month: 'long' });
  let dayOfMonth = date.getDate();
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  time.textContent = `${hours}:${minutes}:${seconds}`;
  dateDisplay.textContent = `${day}, ${month} ${dayOfMonth}`;
}
setInterval(update, 1000);
