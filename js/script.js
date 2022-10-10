let menuIcon = document.querySelector(".header-menu__icon");
let menuList = document.querySelector(".menu__list");

menuIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
  menuIcon.classList.toggle("active");
  menuList.classList.toggle("active");
}

function headerScroll() {
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

window.addEventListener("load", windowLoad);

function windowLoad() {
  // HTML
  const htmlBlock = document.documentElement;

  // Отримуємо збережену тему
  const saveUserTheme = localStorage.getItem("user-theme");

  // Робота з системними налаштуваннями
  let userTheme;
  if (window.matchMedia) {
    userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      !saveUserTheme ? changeTheme() : null;
    });

  // Зміна теми по кліку
  const themeButton = document.querySelector(".theme__button");
  const resetButton = document.querySelector(".page__reset");
  if (themeButton) {
    themeButton.addEventListener("click", function (e) {
      resetButton.classList.add("active");
      changeTheme(true);
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function (e) {
      resetButton.classList.remove("active");
      localStorage.setItem("user-theme", "");
    });
  }

  // Функція додавання класу теми
  function setThemeClass() {
    if (saveUserTheme) {
      htmlBlock.classList.add(saveUserTheme);
      resetButton.classList.add("active");
    } else {
      htmlBlock.classList.add(userTheme);
    }
  }
  // Додаємо клас теми
  setThemeClass();

  // Функція зміни теми
  function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains("light") ? "light" : "dark";
    let newTheme;

    if (currentTheme === "light") {
      newTheme = "dark";
    } else if (currentTheme === "dark") {
      newTheme = "light";
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem("user-theme", newTheme) : null;
  }
}
let btnUp = document.querySelector(".btnUp");
let links = document.querySelectorAll(".menu__item a");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", linkClicked);
}

function linkClicked(e) {
  e.preventDefault();
  scrollToId(this.hash);
}

if (location.hash !== "") {
  scrollToId(location.hash, false);
}

btnUp.addEventListener("click", function () {
  scrollToY(0);
});

window.addEventListener("scroll", function (e) {
  let pos = window.pageYOffset;

  if (pos > window.innerHeight) {
    btnUp.classList.add("btnUp-open");
  } else {
    btnUp.classList.remove("btnUp-open");
  }

  for (let i = links.length - 1; i >= 0; i--) {
    let link = links[i];
    let target = document.querySelector(link.hash);

    if (pos > target.offsetTop - window.innerHeight / 2) {
      let activeLink = document.querySelector(".menu a.active");
      activeLink.classList.remove("active");
      link.classList.add("active");
      break;
    }
  }
});

function scrollToId(id, animated = true) {
  let target = document.querySelector(id);
  let pos = target.offsetTop - 120;
  scrollToY(pos, animated);
}

function scrollToY(pos, animated = true) {
  if (animated && "scrollBehavior" in document.body.style) {
    window.scrollTo({
      top: pos,
      behavior: "smooth",
    });
  } else {
    window.scrollTo(0, pos);
  }
}
