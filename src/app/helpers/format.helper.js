export function formatDateTime(date) {
  
  const datePrev = new Date(date);
  
  const dateToday = new Date();
  
  let seconds = (dateToday-datePrev) / 1000;
  
  const time = {
    seconds: Math.floor(seconds),
    minutes: Math.floor(seconds / 60),
    hours: Math.floor(seconds / 60 / 60),
    days: Math.floor(seconds / 60 / 60 / 24),
    months: Math.floor(seconds / 60 / 60 / 24 / 30),
    years: Math.floor(seconds / 60 / 60 / 24 / 30 / 12),
  };
  if (time.seconds < 60) {
    return Math.abs(time.seconds) + "s";
  } else if (time.minutes < 60) {
    return Math.abs(time.minutes) + "m";
  } else if (time.hours < 24) {
    return Math.abs(time.hours) + "h";
  } else if (time.days < 30) {
    return Math.abs(time.days) + "d";
  } else {
    return Math.abs(time.years) + "y";
  }
}
export function formatUpvotes(upvotes) {
  if (upvotes > 999) {
    return (upvotes / 1000).toFixed(1) + "k";
  } else {
    return upvotes;
  }
}
