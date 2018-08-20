//
//
// CONFIG VARIABLES
// ********************************************************************
// ====================================================================
// ####################################################################

const yelp_url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"
const yelp_access_token = "_LAi__eFhDVZeVgsWuWyG9CwdXIcEjx50MHr-OOtRhpit59roVfsgtLQZaklHdCOv2QJ4bLI8D3CcQQNZaV-E0OmoMxpi2nCbWuzkUV8nAKTBFSqvvvD8oo5Fg7dWnYx";

const mapbox_access_token = "pk.eyJ1IjoiamNob3VyYSIsImEiOiI4dUd0bF9RIn0.gjN9GZul3zPeCXfDDIMSXA"
const mapbox_style = "mapbox://styles/jchoura/cis3mh21n001agrm8uhrg5afy"


//
//
// API INIT
// ********************************************************************
// ====================================================================
// ####################################################################

// API Header
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + yelp_access_token);

// API Init
function initStorage(key, data) {
  if (storageAvailable('localStorage')) {
    console.log("localStorage exists");
    if (!localStorage[key]) {
      localStorage.setItem(key, JSON.stringify(data))
      console.log(`localStorage[${key}] initialized`);
    } else {
      console.log(`localStorage[${key}] exists in localStore`);
    }
  }
  else {
    console.log("No localStorage in existence");
  }
}

//
//
// HELPER FUNCTIONS
// ********************************************************************
// ====================================================================
// ####################################################################

// HELPER FUNCTION
// Check if LocalStorage Exists
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

// HELPER FUNCTION
// Date Formatter
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

// HELPER FUNCTION
// Time Formatter
function formatTime(time) {
  let timeStr = time
      timeStr = timeStr.slice(0, 2) + ":" + timeStr.slice(2);
      timeStr = formatDate(timeStr)
      timeStr = timeStr.includes(":00") ? timeStr.replace(":00","") : timeStr

  return timeStr
}

// HELPER FUNCTION
// Number Formatter
function formatPhoneNumber(phone) {
  phone = phone.replace("+1", "")
  phone = phone.replace(/[^\d]/g, "");
  if (phone.length == 10) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return null;
}

// HELPER FUNCTION
// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

// HELPER FUNCTION
// Handles loading by updating the data attribute
function loadingHandler(elementId, dataAttr, dataValue) {
  const el = document.getElementById(elementId)
  el.setAttribute(dataAttr, dataValue)
}

// HELPER FUNCTION
// checks if string exists and passes it through
function passString(string) {
  return string != null && string ? `${string}` : ``
}

// HELPER FUNCTION
// checks if bool exists and passes it through
function passBool(bool) {
  return bool ? `${bool}` : false
}

// HELPER FUNCTION
// Handles the update of the frenchpress slider
function outputUpdate(selector, vol) {
  document.querySelector(selector).value = vol;
}

// HELPER FUNCTION
// Handles form updates by ID
function changeFormById(id, attr, value) {
  value = Math.round(value)
  document.getElementById(id).setAttribute(attr,value);
}

// HELPER FUNCTION
// Handles element changes by ID
function changeById(id, el) {
  document.getElementById(id).innerHTML = Math.round(el)
}

// HELPER FUNCTION
// Handles element changes by Class
function changeByClass(html, selector, el) {
  let selectorStr = html + "." + selector
  let selectors = document.querySelectorAll(selectorStr)
  selectors.forEach(function(selectors) {
    selectors.innerHTML = Math.round(el)
  })
}

// HELPER FUNCTION
// A utility to update the data insite of an element
function innerHTMLDdataChange(HTMLelement, innerHTML, dataAttr, dataValue) {
  const element = document.getElementById(HTMLelement)
  element.innerHTML = innerHTML
  element.setAttribute(dataAttr, dataValue)
}

//
//
// SHOPS TEMPLATE FUNCTIONS
// ********************************************************************
// ====================================================================
// ####################################################################


// SHOPS TEMPLATE FUNCTION
// For Shops: Outputs category array
function outputCategoryArray(HTMLelement, array) {
  let HTMLarray = array.map(item => {
    let title = item.title
    let object = `<h3 class="bold wrap text-secondary">${title}</h3>`
    return object
  })

  HTMLelement.innerHTML = HTMLarray.join("")
}

// SHOPS TEMPLATE FUNCTION
// For Shops: Outputs image gallery array
function outputImageArray(HTMLelement, array) {
  let HTMLarray = array.map((item, i) => {
    let object = `<div><img src="${item}"/></div>`
    return object
  })

  HTMLelement.innerHTML = HTMLarray.join("")
}

// SHOPS TEMPLATE FUNCTION
// For Shops: Outputs hours of operation array
function outputHoursArray(HTMLelement, array) {
  let HTMLarray = array.map(item => {
    let start = formatTime(item.start)
    let end = formatTime(item.end)
    let hours = `${start}–${end}`
    let day = item.day === 0 ? 'Monday' : item.day === 1 ? 'Tuesday' : item.day === 2 ? 'Wednesday' : item.day === 3 ? 'Thursday' : item.day === 4 ? 'Friday' : item.day === 5 ? 'Saturday' : item.day === 6 ? 'Sunday' : ''
    let object = `<tr><td>${day}</td><td>${hours}</td></tr>`
    return object
  })

  HTMLelement.innerHTML = HTMLarray.join("")
}

// SHOPS TEMPLATE FUNCTION
// For Shops: Outputs the start rating
function outputStarRating(HTMLelement, rating) {
  rating = Math.round(rating * 2) / 2;
  let output = [];

  for (var i = rating; i >= 1; i--)
    output.push('<img class="star" src="/assets/images/star-whole.svg" />&nbsp;');

  if (i == .5) output.push('<img class="star" src="/assets/images/star-half.svg" />&nbsp;');

  for (let i = (5 - rating); i >= 1; i--)
    output.push('<img class="star" src="/assets/images/star-empty.svg" />&nbsp;');

  HTMLelement.innerHTML = output.join('');
}

// SHOPS TEMPLATE FUNCTION
// For Shops: Outputs the number of reviews with a link to yelp
function outputReviewCount(HTMLelement, value, url) {
  HTMLelement.innerHTML = `${value} Reviews`
  HTMLelement.href = url
}

// SHOPS TEMPLATE FUNCTION
// For Shops: Outputs the hero image if it exists on local server or yelp API
function outputHeroImage(HTMLelement, data, slug) {
  // Data Variables
  const heroImage = `/uploads/${slug}.jpg`
  const yelpImage = passString(data.image_url)

  // This function checks if our image exists
  const heroImageExists = imageExists(heroImage, function(exists) {
    console.log("Has Image: " + exists);
    // Add Hero Image
    HTMLelement.style.backgroundImage = `url(${heroImage})`;
    // if our image does not exist, we check if a Yelp image exists
    if (!exists) {
      // remove the image from the background
      imageExists(yelpImage, function(exists) {
        if (exists) {
          // Assign new background image from yelp
          HTMLelement.style.backgroundImage = `url(${yelpImage})`;
        }
      });
    }
  });
}

// SHOPS TEMPLATE FUNCTION
// For Shops: Outputs whether the shop is open, closed, or permenantly closed
function outputOpenStatus(HTMLelement, data) {
  const pageHero = document.getElementById("page_hero")
  const closed_forever = passBool(data.is_closed)
  const isOpenNow = data.hours ? data.hours[0].is_open_now : false
  // const closed_forever = false
  // const isOpenNow = false
  const unknown = {
    image: ``,
    text: `Hours Unavailable`
  }
  const open = {
    image: `<img src="/assets/images/open.svg" />`,
    text: `Open Now`
  }
  const closed = {
    image: `<img src="/assets/images/closed.svg" />`,
    text: `Closed Now`
  }
  const closedForever = {
    image: `<img src="/assets/images/closed-forever.svg" />`,
    text: `Cloesd Permenantly`
  }

  // This statement determines whether the shop has been closed forever, or if its still open
  if (!closed_forever) {

    // Open Hours Array
    const openHours = data.hours ? data.hours[0].open : []
    outputHoursArray(HTMLelement, openHours)

    // For determining whether the shop is currently open
    let isOpenNowStr = ""

    // A condition that passes a string stating whether the shop is open
    if (data.hours) {
      isOpenNowStr = isOpenNow ? open : closed
    } else {
      isOpenNowStr = unknown
    }

    // Those strings are passed to the DOM
    innerHTMLDdataChange("is_open_now", isOpenNowStr.text, 'data-open', isOpenNow)
    innerHTMLDdataChange("is_open_now_hero", isOpenNowStr.image, 'data-open', isOpenNow)

  } else if (closed_forever) {

    // if the shop is cloesd Permenantly these are the conditions
    console.log("Closed: " + data.is_closed);
    const isOpenNowStr = closedForever

    // Passed to the DOM
    innerHTMLDdataChange("is_open_now", isOpenNowStr.text, 'data-open', 'closed_forever')
    innerHTMLDdataChange("is_open_now_hero", isOpenNowStr.image, 'data-open', 'closed_forever')

    pageHero.style.background = "rgba(255,0,0,.65)"
  }
}

// SHOPS TEMPLATE FUNCTION
// For Shops: Outputs the address and phone number content
function outputAddress(HTMLaddressElement, HTMLphoneElement, data) {
  const address1 = passString(data.location.address1)
  const address2 = passString(data.location.address2)
  const address3 = passString(data.location.address3)
  const city = passString(data.location.city)
  const state = passString(data.location.state)
  const zip_code = passString(data.location.zip_code)
  const phone = passString(data.phone)

  // Concating the strings into a sentence
  const addressConcat = `${address1} ${address2} ${address3}\r${city}, ${state} ${zip_code}`
  HTMLaddressElement.innerHTML = addressConcat
  HTMLaddressElement.href = `http://maps.google.com/?q=${addressConcat}`

  // Phone Render
  HTMLphoneElement.innerHTML = formatPhoneNumber(phone)
  HTMLphoneElement.href = `tel:${phone}`
}

// SHOPS TEMPLATE FUNCTION
// For Shops: Inits the map
function mapInit(yelpId, pageMap, shopName) {
  const getData = async () => fetch(`${yelp_url}${yelpId}`, {
    headers: myHeaders
  }).then(response => response.json()).catch((error) => {
    console.log(error)
  });

  const mapFunction = async () => {
    const data = await getData();
    let has_coord = false
    let coord = ("null,null").split(",")

    if (pageMap) {
      has_coord = true
      coord = pageMap.split(",")
    }

    var latitude = has_coord ? coord[0] : data.coordinates.latitude
    var longitude = has_coord ? coord[1] : data.coordinates.longitude

    mapboxgl.accessToken = mapbox_access_token;
    var map = new mapboxgl.Map({
      container: 'map',
      style: mapbox_style,
      center: [longitude, latitude], // starting position
      zoom: 14, // starting zoom
      pitch: 45, // pitch in degrees
      interactive: false
    });

    map.on('load', function () {
      map.addSource("points", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [
            {
              type: 'Feature',
              properties: {
                title: shopName,
                icon: 'circle'
              },
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              }
            },
          ]
        }
      });

      map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": "points",
        "layout": {
          "icon-image": "{icon}-15"
        }
      });
    });

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mousemove', function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (!features.length) {
        popup.remove();
        return;
      }

      var feature = features[0];

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.title)
        .addTo(map);
    });

    // Disable drag and zoom handlers.
    map.scrollZoom.disable();
    map.doubleClickZoom.disable();
    map.addControl(new mapboxgl.Navigation());

  }
  mapFunction()
}

//
//
// MISC FUNCTIONS
// ********************************************************************
// ====================================================================
// ####################################################################

// SEARCH FUNCTION
// For Search: Inits search
function handleSearch(array) {
  // builds lunr
  var index = lunr(function () {
    this.field('title', {boost: 10})
    this.field('tags')
    this.field('city')
    this.field('type')
    this.field('coffee')
    this.field('county')
    this.ref('id')

    array.forEach(function (item) {
      this.add(item)
    }, this)
  });

  // builds reference data
  var store = allShopsJSON

  // builds search
  $(document).ready(function() {

    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        if (pair[0] === variable) {
          return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
        }
      }
    }

    function searchQuery(store, resultdiv, resultstatus, result) {
      resultdiv.empty();

      resultstatus.replaceWith('<div id="resultstatus" class="col xs-col-12 xs-mb4"><h3 class="bold text-secondary">Found '+result.length+' result(s)</h3></div>');

      // Loop through, match, and add results
      for (var item in result) {
        var ref = result[item].ref
        var title = passString(store[ref].title)
        var url = passString(store[ref].url)
        var city = passString(store[ref].city)
        var searchitem = `<div class="mix mix-card col xs-col-6 sm-col-4 md-col-6 xl-col-4 result"><div class="result-body"><a href="${url}" class=""><h3 class="bold text-secondary">${title}</h3><h6 class="bold text-primary xs-pb1">${city}</h6></a></div></div>`;
        resultdiv.append(searchitem);
      }
    }

    var urlQuery = getQueryVariable('query');
    var resultdiv = $('#results');

    if (urlQuery) {
      document.getElementById('search').setAttribute("value", urlQuery);
      var result = index.search(urlQuery);
      var resultstatus = $('#resultstatus');

      searchQuery(store, resultdiv, resultstatus, result)
    }

    $('input#search').on('keyup', function () {
      var term = $(this).val();
      var result = index.search(term);
      var resultstatus = $('#resultstatus');

      searchQuery(store, resultdiv, resultstatus, result)
    });
  });
}

// LOCALSTORAGE CACHE EXPIRATION
// Prototype for expiring localstorage
Storage.prototype.setExpire = function (arrObj) {
    var date,
        now,
        days,
        deletes,
        items,
        fa, ta,
        newItems = [],
        storage = localStorage.getItem('limitStorage');
    items = JSON.parse(storage || "[]");
    date = new Date();
    date = date.toString().split(' ');
    date = Number(date[2]);
    for (var key in arrObj) {
        for (i = 0; i < items.length; i++) {
            if (items[i].value == key) {
                if (typeof (items[i].days) == "number") {
                    if (items[i].date !== date) {
                        days = (date - items[i].date);
                    } else {
                        days = items[i].days;
                    }
                }
            }
        }
        ta = {
            value: key,
            limit: arrObj[key],
            date: date,
            days: days !== undefined ? days : 0
        };
        if (ta.days >= ta.limit) {
            localStorage.removeItem(ta.value);
        }
        if(localStorage.getItem(ta.value) !== null) newItems.push(ta);
    }
    localStorage.setItem('limitStorage', JSON.stringify(newItems));
};

// FOR MAP
// When hovering list items, it navigates to the items on a map
function showMapboxPopupOnHover(popup, HTMLelement) {
  $(HTMLelement).hover(
    // MOUSE OVER
    (e) => {
      let coordinates = e.currentTarget.dataset.coordinates ? e.currentTarget.dataset.coordinates : "0,0"
      let lngLat = latLngStringToLngLat(coordinates)
      let desc = e.currentTarget.childNodes[1].children[0].innerText

      popup.setLngLat(lngLat)
          .setHTML(desc)
          .addTo(map);

      flyTo(coordinates, lngLat)
    },
    // MOUSE OUT
    (e) => {
      let coordinates = e.currentTarget.dataset.countycoord ? e.currentTarget.dataset.countycoord : "0,0"
      let lngLat = lngLatStringToLngLat(coordinates)

      popup.remove();

      flyTo(coordinates, lngLat)
    }
  )
}

function flyTo(coordinates, lngLat) {
  if (coordinates !== "0,0") {
    map.flyTo({
      center: lngLat,
      bearing: 0,
      pitch: 45,
      speed: 1,
      curve: 1,

      easing: function (t) {
        return t;
      }
    });
  }
}

function lngLatStringToLngLat(coord) {
  let coordArr = coord.split(',')
  let lat = coordArr[0]
  let lng = coordArr[1]
  return [lat, lng]
}

function latLngStringToLngLat(coord) {
  let coordArr = coord.split(',')
  let lat = coordArr[0]
  let lng = coordArr[1]
  return [lng, lat]
}
