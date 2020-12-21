if (!swiperInstances) {
  var swiperInstances = [];
}

$(".swiper-socialproof-initializer").each(function() {
  var swiperid = $(this).attr("swiperid");
  var slides = Number($(this).attr("slides"));

  if (swiperid) {
    var swiper = $("#" + swiperid);
    if (swiper) {
      console.log(swiper);
      var swiperInstanceItem = new Swiper("#" + swiperid, {
        slidesPerView: 1.5,
        loop: true,
        autoplay: true,
        spaceBetween: 1,
        centeredSlides: true,
        on: {
          init: function() {
            $(swiperInstances).each(function() {
              this.update();
            });
          }
        },
        navigation: {
          nextEl: "#" + swiperid + " .swiper-next",
          prevEl: "#" + swiperid + " .swiper-prev"
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1.5
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2.5
          },
          // when window width is >= 640px
          800: {
            slidesPerView: slides,
            centeredSlides: false
          }
        }
      });
      console.log("--DBUG-- Swiper Initialized:", swiperInstanceItem);
      swiperInstances.push(swiperInstanceItem);
    }
  }
});

console.log("--DBUG-- Swiper Instances:", swiperInstances);
$(swiperInstances).each(function() {
  this.update();
});
console.log("--DBUG-- Swiper Fully Executed");
