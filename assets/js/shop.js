

function getYelpShopData(data, slug) {
  console.log(data);

  // Element Variables
  const ratingEl = document.getElementById("rating")
  const reviewCountEl = document.getElementById("review_count")
  const catEl = document.getElementById("categories")
  const imgEl = document.getElementById("photos")
  const openHoursEl = document.getElementById("open_hours")
  const addressEl = document.getElementById("address")
  const phoneEl = document.getElementById("phone")
  const imageEl = document.getElementById("hero_image")

  // Renders
  loadingHandler("top", "yelp-data", "success")
  outputOpenStatus(openHoursEl, data)
  outputAddress(addressEl, phoneEl, data)
  outputHeroImage(imageEl, data, slug)
  outputStarRating(ratingEl, data.rating)
  outputReviewCount(reviewCountEl, data.review_count, data.url)
  outputCategoryArray(catEl, data.categories)
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
}
