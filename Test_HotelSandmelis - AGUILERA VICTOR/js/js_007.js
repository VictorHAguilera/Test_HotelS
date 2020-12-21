/* Computer / Module / Swiper / js.js */

if (!stdSwiperInstances) {
  var stdSwiperInstances = [];
}

var Fancy_Active = $("#Fancy_Active").attr("rel");

var loop = $("#dataconfig-swiper").attr("auto");

if (loop == "1") {
  loop = true;
} else {
  loop = false;
}

$(".swiper-container-dispositivas").each(function(index, element) {
  var autoPlayOn = { delay: 5000 };
  if ($("#dataconfig-swiper").attr("speed") == 0) {
    autoPlayOn = false;
  } else if ($("#dataconfig-swiper").attr("speed")) {
    autoPlayOn = { delay: Number($("#dataconfig-swiper").attr("speed")) };
  }
  var swiperInstanceItem = new Swiper(element, {
    initialSlide: 0,
    direction: "horizontal",
    autoplay: autoPlayOn,
    loop: loop,
    paginationClickable: true,
    preloadImages: false,
    spaceBetween: 0,
    lazy: {
      loadPrevNext: true
    },
    on: {
      init: function() {
        $(stdSwiperInstances).each(function() {
          this.update();
        });
        $(".swiper-container-dispositivas")
          .find("img")
          .load(function() {
            var height = $(this).height();
            $(".swiper-container-dispositivas").css({ height: height });
          });
      }
    },
    pagination: $(element).find(".swiper-pagination-dispositivas")[0] ? $(element).find(".swiper-pagination-dispositivas")[0] : false,
    nextButton: $(element).find(".swiper-button-next-dispositivas")[0] ? $(element).find(".swiper-button-next-dispositivas")[0] : false,
    prevButton: $(element).find(".swiper-button-prev-dispositivas")[0] ? $(element).find(".swiper-button-prev-dispositivas")[0] : false,
    navigation: {
      nextEl: $(element).find(".swiper-button-next-dispositivas")[0] ? $(element).find(".swiper-button-next-dispositivas")[0] : false,
      prevEl: $(element).find(".swiper-button-prev-dispositivas")[0] ? $(element).find(".swiper-button-prev-dispositivas")[0] : false
    }
  });
  stdSwiperInstances.push(swiperInstanceItem);
});

$(window).resize(function() {
  $(stdSwiperInstances).each(function() {
    this.update();
  });
  $(".swiper-container-dispositivas").css({ height: "" });
  $(".swiper-container-dispositivas").css({
    height: $(".swiper-container-dispositivas")
      .find("img")
      .height()
  });
});

$(document).ready(function() {
  $(stdSwiperInstances).each(function() {
    this.update();
  });
  $(".swiper-container-dispositivas").css({ height: "" });
  $(".swiper-container-dispositivas").css({
    height: $(".swiper-container-dispositivas")
      .find("img")
      .height()
  });
});

var Width = $("#Fancy_Width").attr("rel");
if (Width === "") {
  Width = 800;
}
var Height = $("#Fancy_Height").attr("rel");
if (Height === "") {
  Height = 600;
}

try {
  $(".fancybox").fancybox({
    maxWidth: Width,
    maxHeight: Height,
    fitToView: false,
    width: "70%",
    height: "70%",
    autoSize: false,
    closeClick: false,
    openEffect: "none",
    closeEffect: "none"
  });
} catch (e) {
  console.log(e);
}
