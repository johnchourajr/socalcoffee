const yelp_access_token = "_LAi__eFhDVZeVgsWuWyG9CwdXIcEjx50MHr-OOtRhpit59roVfsgtLQZaklHdCOv2QJ4bLI8D3CcQQNZaV-E0OmoMxpi2nCbWuzkUV8nAKTBFSqvvvD8oo5Fg7dWnYx";

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + yelp_access_token);

function storageAvailable(type) {
  try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          e.code === 22 ||
          e.code === 1014 ||
          e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          storage.length !== 0;
  }
}

function formatDate(time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'a' : 'p'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

function formatTime(time) {
  let timeStr = time
      timeStr = timeStr.slice(0, 2) + ":" + timeStr.slice(2);
      timeStr = formatDate(timeStr)
      timeStr = timeStr.includes(":00") ? timeStr.replace(":00","") : timeStr

  return timeStr
}

function formatPhoneNumber(phone) {
  phone = phone.replace("+1", "")
  phone = phone.replace(/[^\d]/g, "");
  if (phone.length == 10) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return null;
}

// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

function loadingHandler(elementId, dataAttr, dataValue) {
  const el = document.getElementById(elementId)
  el.setAttribute(dataAttr, dataValue)
}

function passString(string) {
  return string != null && string ? `${string}` : ``
}

function passBool(bool) {
  return bool ? `${bool}` : false
}
