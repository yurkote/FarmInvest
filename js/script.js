$(document).ready(function () {
  var w = $(window).outerWidth();
  var h = $(window).outerHeight();
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
  }
  if (isIE()) {
    $("body").addClass("ie");
  }
  if (isMobile.any()) {
    $("body").addClass("touch");
  }
  //Adaptive functions
  $(window).resize(function (event) {
    adaptive_function();
  });
  function adaptive_header(w, h) {
    var headerMenu = $(".header-menu");
    var headerLang = $(".header-lang");
    if (w < 767.98) {
      if (!headerLang.hasClass("done")) {
        headerLang.addClass("done").appendTo(headerMenu);
      }
    } else {
      if (headerLang.hasClass("done")) {
        headerLang.removeClass("done").prependTo($(".header-top"));
      }
    }
    if (w < 767.98) {
      if (!$(".header-bottom-menu").hasClass("done")) {
        $(".header-bottom-menu").addClass("done").appendTo(headerMenu);
      }
    } else {
      if ($(".header-bottom-menu").hasClass("done")) {
        $(".header-bottom-menu")
          .removeClass("done")
          .prependTo($(".header-bottom"));
      }
    }
  }

  function adaptive_function() {
    var w = $(window).outerWidth();
    var h = $(window).outerHeight();
    adaptive_header(w, h);
  }
  adaptive_function();

  function map(n) {
    google.maps.Map.prototype.setCenterWithOffset = function (
      latlng,
      offsetX,
      offsetY
    ) {
      var map = this;
      var ov = new google.maps.OverlayView();
      ov.onAdd = function () {
        var proj = this.getProjection();
        var aPoint = proj.fromLatLngToContainerPixel(latlng);
        aPoint.x = aPoint.x + offsetX;
        aPoint.y = aPoint.y + offsetY;
        map.panTo(proj.fromContainerPixelToLatLng(aPoint));
        //map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
      };
      ov.draw = function () {};
      ov.setMap(this);
    };
    var markers = new Array();
    var infowindow = new google.maps.InfoWindow({
      //pixelOffset: new google.maps.Size(-230,250)
    });
    var locations = [[new google.maps.LatLng(53.819055, 27.8813694)]];
    var options = {
      zoom: 10,
      panControl: false,
      mapTypeControl: false,
      center: locations[0][0],
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(document.getElementById("map"), options);
    var icon = {
      url: "img/icons/map.svg",
      scaledSize: new google.maps.Size(18, 20),
      anchor: new google.maps.Point(9, 10),
    };
    for (var i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
        //icon:icon,
        position: locations[i][0],
        map: map,
      });
      markers.push(marker);
    }
  }
  if ($("#map").length > 0) {
    map();
  }
});

// $(".header-menu__icon").click(function (event) {
//   $(this).toggleClass("active");
//   $(".header-menu").toggleClass("active");
//   if ($(this).hasClass("active")) {
//     $("body").data("scroll", $(window).scrollTop());
//   }
//   $("body").toggleClass("lock");
//   if (!$(this).hasClass("active")) {
//     $("body,html").scrollTop(parseInt($("body").data("scroll")));
//   }
// });

$(".header-menu__icon").click(function (event) {
  $(this).toggleClass("active");
  $(".menu__list").toggleClass("active");
  if ($(this).hasClass("active")) {
    $("body").data("scroll", $(window).scrollTop());
  }
  $("body").toggleClass("lock");
  if (!$(this).hasClass("active")) {
    $("body,html").scrollTop(parseInt($("body").data("scroll")));
  }
});

function ibg() {
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("img").length > 0) {
      $(this).css(
        "background-image",
        'url("' + $(this).find("img").attr("src") + '")'
      );
    }
  });
}
ibg();

function headerScroll() {
  // let addWindowScrollEvent = true;
  const header = document.querySelector("header.header");
  const headerShow = header.hasAttribute("data-scroll-show");
  const headerShowTimer = header.dataset.scrollShow
    ? header.dataset.scrollShow
    : 500;
  const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
  let scrollDirection = 0;
  let timer;
  document.addEventListener("scroll", function (e) {
    const scrollTop = window.scrollY;
    clearTimeout(timer);
    if (scrollTop >= startPoint) {
      !header.classList.contains("_header-scroll")
        ? header.classList.add("_header-scroll")
        : null;
      // console.log(`scrollTop: ${scrollTop} > scrollDirection: ${scrollDirection}`);
      if (headerShow) {
        if (scrollTop > scrollDirection) {
          // downscroll code
          header.classList.contains("_header-show")
            ? header.classList.remove("_header-show")
            : null;
        } else {
          // upscroll code
          !header.classList.contains("_header-show")
            ? header.classList.add("_header-show")
            : null;
        }
        timer = setTimeout(() => {
          !header.classList.contains("_header-show")
            ? header.classList.add("_header-show")
            : null;
        }, headerShowTimer);
      }
    } else {
      header.classList.contains("_header-scroll")
        ? header.classList.remove("_header-scroll")
        : null;
      if (headerShow) {
        header.classList.contains("_header-show")
          ? header.classList.remove("_header-show")
          : null;
      }
    }
    scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
  });
}
headerScroll();

class MousePRLX {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
    };
    this.config = Object.assign(defaultConfig, props);
    if (this.config.init) {
      const paralaxMouse = document.querySelectorAll("[data-prlx-mouse]");
      if (paralaxMouse.length) {
        this.paralaxMouseInit(paralaxMouse);
      }
    }
  }
  paralaxMouseInit(paralaxMouse) {
    paralaxMouse.forEach((el) => {
      const paralaxMouseWrapper = el.closest("[data-prlx-mouse-wrapper]");

      // Коэф. X
      const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
      // Коэф. У
      const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
      // Напр. Х
      const directionX = el.hasAttribute("data-prlx-dxr") ? -1 : 1;
      // Напр. У
      const directionY = el.hasAttribute("data-prlx-dyr") ? -1 : 1;
      // Скорость анимации
      const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;

      // Объявление переменных
      let positionX = 0,
        positionY = 0;
      let coordXprocent = 0,
        coordYprocent = 0;

      setMouseParallaxStyle();

      // Проверяю на наличие родителя, в котором будет считываться положение мыши
      if (paralaxMouseWrapper) {
        mouseMoveParalax(paralaxMouseWrapper);
      } else {
        mouseMoveParalax();
      }

      function setMouseParallaxStyle() {
        const distX = coordXprocent - positionX;
        const distY = coordYprocent - positionY;
        positionX = positionX + (distX * paramAnimation) / 1000;
        positionY = positionY + (distY * paramAnimation) / 1000;
        el.style.cssText = `transform: translate3D(${
          (directionX * positionX) / (paramСoefficientX / 10)
        }%,${(directionY * positionY) / (paramСoefficientY / 10)}%,0);`;
        requestAnimationFrame(setMouseParallaxStyle);
      }
      function mouseMoveParalax(wrapper = window) {
        wrapper.addEventListener("mousemove", function (e) {
          const offsetTop = el.getBoundingClientRect().top + window.scrollY;
          if (
            offsetTop >= window.scrollY ||
            offsetTop + el.offsetHeight >= window.scrollY
          ) {
            // Получение ширины и высоты блока
            const parallaxWidth = window.innerWidth;
            const parallaxHeight = window.innerHeight;
            // Ноль по середине
            const coordX = e.clientX - parallaxWidth / 2;
            const coordY = e.clientY - parallaxHeight / 2;
            // Получаем проценты
            coordXprocent = (coordX / parallaxWidth) * 100;
            coordYprocent = (coordY / parallaxHeight) * 100;
          }
        });
      }
    });
  }
}
// Запускаем и добавляем в объект модулей
let mousePrlx = new MousePRLX({});
