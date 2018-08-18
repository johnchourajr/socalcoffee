function outpurReviewCount(HTMLelement, value, url) {
  // let HTMLobject = `<h3 class="bold wrap text-secondary">${value}</h3>`

  HTMLelement.innerHTML = `${value} Reviews`
  HTMLelement.href = url
}

function getYelpShopData(data, slug) {
  console.log(data);
  loadingHandler("top", "yelp-data", "success")

  // Rating Data
  const ratingEl = document.getElementById("rating")
  ratingEl.innerHTML = getStars(data.rating);

  // Review Data Count
  const reviewCountEl = document.getElementById("review_count")
  outpurReviewCount(reviewCountEl, data.review_count, data.url)

  // Categories Data Array
  const catEl = document.getElementById("categories")
  outputCategoryArray(catEl, data.categories)

  // Image Data Array
  const imgEl = document.getElementById("photos")
  outputImageArray(imgEl, data.photos)

  // Slick Image Carousel Init
  $('.photo-gallery').slick({
    dots: true,
    infinite: true,
    speed: 500,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  // Open Hours Variables
  const closed_forever = passBool(data.is_closed)
  const openHoursEl = document.getElementById("open_hours")

  // This statement determines whether the shop has been closed forever, or if its still open
  if (!closed_forever) {

    // Open Hours Array
    const openHours = data.hours ? data.hours[0].open : []
    outputHoursArray(openHoursEl, openHours)

    // For determining whether the shop is currently open
    let isOpenNowStr = ""
    const isOpenNow = data.hours ? data.hours[0].is_open_now : false

    // A condition that passes a string stating whether the shop is open
    if (data.hours) {
      isOpenNowStr = isOpenNow ? "Open Now!" : "Not Open"
    } else {
      isOpenNowStr = "Hours Unavailable"
    }

    // Those strings are passed to the DOM
    innerHTMLDdataChange("is_open_now", isOpenNowStr, 'data-open', isOpenNow)
    innerHTMLDdataChange("is_open_now_hero", isOpenNowStr, 'data-open', isOpenNow)

  } else if (closed_forever) {

    // if the shop is cloesd Permenantly these are the conditions
    console.log("Closed: " + data.is_closed);
    const isOpenNowStr = "Closed Permenantly"

    // Passed to the DOM
    innerHTMLDdataChange("is_open_now", isOpenNowStr, 'data-open', 'closed_forever')
    innerHTMLDdataChange("is_open_now_hero", isOpenNowStr, 'data-open', 'closed_forever')

    const pageHero = document.getElementById("page_hero")
    pageHero.style.background = "rgba(255,0,0,.65)"
  }

  // Address and Contact Variables
  const addressEl = document.getElementById("address")
  const phoneEl = document.getElementById("phone")

  // Getting the strings captures before concatenating
  const address1 = passString(data.location.address1)
  const address2 = passString(data.location.address2)
  const address3 = passString(data.location.address3)
  const city = passString(data.location.city)
  const state = passString(data.location.state)
  const zip_code = passString(data.location.zip_code)
  const phone = passString(data.phone)

  // Concating the strings into a sentence
  const addressConcat = `${address1} ${address2} ${address3}\r${city}, ${state} ${zip_code}`
  addressEl.innerHTML = addressConcat
  addressEl.href = `http://maps.google.com/?q=${addressConcat}`

  // Concating the string for the phone
  phoneEl.innerHTML = formatPhoneNumber(phone)
  phoneEl.href = `tel:${phone}`

  // Some shops have an asset, for those that do not we fall back to the yelp API featured image
  const imageEl = document.getElementById("hero_image")
  // This variable is for our image
  const heroImage = `/uploads/${slug}.jpg`
  // This is the Yelp image
  const yelpImage = passString(data.image_url)

  // This function checks if our image exists
  const heroImageExists = imageExists(heroImage, function(exists) {
    console.log("Has Image: " + exists);
    // Add Hero Image
    imageEl.style.backgroundImage = `url(${heroImage})`;
    // if our image does not exist, we check if a Yelp image exists
    if (!exists) {
      // remove the image from the background
      imageExists(yelpImage, function(exists) {
        if (exists) {
          // Assign new background image from yelp
          imageEl.style.backgroundImage = `url(${yelpImage})`;
        }
      });
    }
  });



}
