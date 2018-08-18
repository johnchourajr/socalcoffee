



function outputImageArray(HTMLelement, array) {
  let HTMLarray = array.map((item, i) => {
    let object = `<div><img src="${item}"/></div>`
    return object
  })

  HTMLelement.innerHTML = HTMLarray.join("")
}


function getYelpShopData(data, slug) {
  console.log(data);
  loadingHandler("top", "yelp-data", "success")


  const catEl = document.getElementById("categories")
  outputCategoryArray(catEl, data.categories)

  const imgEl = document.getElementById("photos")
  outputImageArray(imgEl, data.photos)


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


  $('.photo-gallery').slick({
    dots: true,
    infinite: true,
    speed: 300,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 5000,
  });
}
