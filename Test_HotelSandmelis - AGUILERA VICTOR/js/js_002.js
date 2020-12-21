/* JavaScript Document */

var Fancy_Active = $("#Fancy_Active").attr("rel");

var autoPlayOn = { delay: 5000 };
if ($("#swiper-background-config").attr("speed") == 0) {
  autoPlayOn = false;
} else if ($("#swiper-background-config").attr("speed")) {
  autoPlayOn = {
    delay: Math.min(4000, Number($("#swiper-background-config").attr("speed")))
  };
}

$(document).ready(function(e) {
  //console.log("Loading Swiper:");
  //console.log($(".swiper-container-swiper_background"));
  var mySwiper = new Swiper(".swiper-container-swiper_background", {
    // Optional parameters
    initialSlide: 0,
    direction: "horizontal",
    autoplay: autoPlayOn,
    loop: true,
    // Navigation arrows
    nextButton: ".swiper-button-next-swiper_background",
    prevButton: ".swiper-button-prev-swiper_background",
    paginationClickable: true,
    preloadImages: false,
    // Enable lazy loading
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    pagination: ".swiper-pagination-swiper_background",
    preloadImages: false,
    lazy: {
      loadPrevNext: true
    },
    navigation: {
      nextEl: $(".swiper-button-next-swiper_background")[0],
      prevEl: $(".swiper-button-prev-swiper_background")[0]
    },
    onSlideChangeEnd: function(swiper) {
      if ($(".swiper-slide-active video source").attr("src") !== undefined) {
        $(".swiper-slide-active video").trigger("play");
      }
      if ($(".swiper-slide video source").play) {
        $(this).trigger("pause");
      }
      $("#swiper-conter").html(swiper.activeIndex);
    }

    // And if we need scrollbar
    //scrollbar: '.swiper-scrollbar',
  });
  $(mySwiper)
    .find("img")
    .load(function() {
      var height = $(this).height();
      //console.log("SwiperPhotoHeight: " + height, $(this));
      $(".swiper-container-swiper_background").css({
        height: height
      });
    });

  $(window).resize(function() {
    $(".swiper-container-swiper_background").css({
      height: ""
    });
    $(".swiper-container-swiper_background").css({
      height: $(".swiper-container-swiper_background")
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

  $(".swiper-button-next,.swiper-button-prev").click(function() {
    $(".videobackground")
      .children("source")
      .trigger("pause");
  });
});
