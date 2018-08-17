const yelp_url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"
const yelp_access_token = "_LAi__eFhDVZeVgsWuWyG9CwdXIcEjx50MHr-OOtRhpit59roVfsgtLQZaklHdCOv2QJ4bLI8D3CcQQNZaV-E0OmoMxpi2nCbWuzkUV8nAKTBFSqvvvD8oo5Fg7dWnYx";

const mapbox_access_token = "pk.eyJ1IjoiamNob3VyYSIsImEiOiI4dUd0bF9RIn0.gjN9GZul3zPeCXfDDIMSXA"
const mapbox_style = "mapbox://styles/jchoura/cis3mh21n001agrm8uhrg5afy"

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + yelp_access_token);

function initShops(data) {
  if (storageAvailable('localStorage')) {
    console.log("localStorage exists");
    if (!localStorage.shops) {
      localStorage.setItem("shops", JSON.stringify(data))
      console.log("localStorage.shops initialized");
    } else {
      console.log("localStorage.shops exists in localStore");
    }
  }
  else {
    console.log("No localStorage in existence");
  }
}

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

function outputUpdate(vol) {
  document.querySelector('#frenchpress-container-output').value = vol;
}

function changeFormById(id, attr, value) {
  value = Math.round(value)
  document.getElementById(id).setAttribute(attr,value);
}

function changeById(id, el) {
  document.getElementById(id).innerHTML = Math.round(el)
}

function changeByClass(html, selector, el) {
  let selectorStr = html + "." + selector
  let selectors = document.querySelectorAll(selectorStr)
  selectors.forEach(function(selectors) {
    selectors.innerHTML = Math.round(el)
  })
}

function outputAddressArray(HTMLelement, array) {
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

function innerHTMLDdataChange(HTMLelement, innerHTML, dataAttr, dataValue) {
  const element = document.getElementById(HTMLelement)
  element.innerHTML = innerHTML
  element.setAttribute(dataAttr, dataValue)
}

function getYelpShopData(data, slug) {
  console.log(data);
  loadingHandler("top", "yelp-data", "success")

  const closed_forever = passBool(data.is_closed)
  const openHoursEl = document.getElementById("open_hours")


  if (!closed_forever) {
    const openHours = data.hours ? data.hours[0].open : []
    outputAddressArray(openHoursEl, openHours)

    let isOpenNowStr = ""
    const isOpenNow = data.hours ? data.hours[0].is_open_now : false

    if (data.hours) {
      isOpenNowStr = isOpenNow ? "Open Now!" : "Not Open"
    } else {
      isOpenNowStr = "Hours Unavailable"
    }

    innerHTMLDdataChange("is_open_now", isOpenNowStr, 'data-open', isOpenNow)
    innerHTMLDdataChange("is_open_now_hero", isOpenNowStr, 'data-open', isOpenNow)

  } else if (closed_forever) {
    console.log("Closed: " + data.is_closed);
    const isOpenNowStr = "Closed Permenantly"

    innerHTMLDdataChange("is_open_now", isOpenNowStr, 'data-open', 'closed_forever')
    innerHTMLDdataChange("is_open_now_hero", isOpenNowStr, 'data-open', 'closed_forever')

    const pageHero = document.getElementById("page_hero")
    pageHero.style.background = "rgba(255,0,0,.65)"
  }

  const addressEl = document.getElementById("address")
  const phoneEl = document.getElementById("phone")

  const address1 = passString(data.location.address1)
  const address2 = passString(data.location.address2)
  const address3 = passString(data.location.address3)
  const city = passString(data.location.city)
  const state = passString(data.location.state)
  const zip_code = passString(data.location.zip_code)
  const phone = passString(data.phone)

  const addressConcat = `${address1} ${address2} ${address3}\r${city}, ${state} ${zip_code}`
  addressEl.innerHTML = addressConcat
  addressEl.href = `http://maps.google.com/?q=${addressConcat}`

  phoneEl.innerHTML = formatPhoneNumber(phone)
  phoneEl.href = `tel:${phone}`

  const heroImage = `/uploads/${slug}.jpg`
  const yelpImage = passString(data.image_url)
  const heroImageExists = imageExists(heroImage, function(exists) {
    console.log("Has Image: " + exists);
    if (!exists) {
      imageExists(yelpImage, function(exists) {
        if (exists) {
          const imageEl = document.getElementById("hero_image")
          imageEl.style.backgroundImage = `url(${yelpImage})`;
        }
      });
    }
  });
}

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
  var store = allShops
  // console.log(store);
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

    var urlQuery = getQueryVariable('query');

    if (urlQuery) {
      document.getElementById('search').setAttribute("value", urlQuery);

      var resultdiv = $('#results');
      var resultstatus = $('#resultstatus');
      var result = index.search(urlQuery);

      resultdiv.empty();

      resultstatus.replaceWith(`<div id="resultstatus" class="col xs-col-12 xs-mb4"><h3 class="bold text-secondary">Found ${result.length} result(s)</h3></div>`);
      // Loop through, match, and add results
      for (var item in result) {
        var ref = result[item].ref;
        var searchitem = `<div class="mix mix-card col xs-col-6 sm-col-4 md-col-6 xl-col-4 result"><div class="result-body"><a href="${store[ref].url}" class=""><h3 class="bold text-secondary">${store[ref].title}</h3><h6 class="bold text-primary xs-pb1">${store[ref].city}</h6></a></div></div>`;
        resultdiv.append(searchitem);
      }
    }

    $('input#search').on('keyup', function () {

      var resultdiv = $('#results');
      var resultstatus = $('#resultstatus');
      var term = $(this).val();
      var result = index.search(term);

      resultdiv.empty();

      resultstatus.replaceWith('<div id="resultstatus" class="col xs-col-12 xs-mb4"><h3 class="bold text-secondary">Found '+result.length+' result(s)</h3></div>');
      // Loop through, match, and add results
      for (var item in result) {
        var ref = result[item].ref;
        var searchitem = `<div class="mix mix-card col xs-col-6 sm-col-4 md-col-6 xl-col-4 result"><div class="result-body"><a href="${store[ref].url}" class=""><h3 class="bold text-secondary">${store[ref].title}</h3><h6 class="bold text-primary xs-pb1">${store[ref].city}</h6></a></div></div>`;
        resultdiv.append(searchitem);
      }
    });
  });
}
