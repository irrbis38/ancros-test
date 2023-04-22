document.addEventListener("DOMContentLoaded", function (event) {
  // toggle burger menu
  const burger = document.querySelector(".header__burger");
  const header_navbar = document.querySelector(".header__navbar");
  const body = document.body;
  const header_links = document.querySelectorAll(".header__link");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    header_navbar.classList.toggle("active");
    body.classList.toggle("lock");
  });

  header_links.forEach((el) =>
    el.addEventListener("click", () => {
      burger.classList.remove("active");
      header_navbar.classList.remove("active");
      body.classList.remove("lock");
    })
  );

  // hide burger menu by window resize

  const mq = window.matchMedia("(max-width: 1120px)");

  mq.addEventListener("change", (e) => {
    if (!e.matches) {
      removeHeaderNavTransition();
      burger.classList.remove("active");
      header_navbar.classList.remove("active");
      body.classList.remove("lock");
    } else {
      removeHeaderNavTransition();
    }
  });

  // rotate intro__open--button
  const svg_image_open = document.querySelector(".svg-image-open");
  const intro_button_open = document.querySelector(".intro__button--open");

  const introButtonTween = gsap.to(svg_image_open, {
    rotation: 360,
    ease: "none",
    duration: 20,
    repeat: -1,
  });

  intro_button_open.addEventListener("mouseenter", function () {
    gsap.to(introButtonTween, {
      timeScale: 15,
      duration: 0.3,
      ease: Power4.easeOut,
    });
    gsap.to(intro_button_open, 0.3, { scale: 1.2 });
  });

  intro_button_open.addEventListener("mouseleave", function () {
    gsap.to(introButtonTween, {
      timeScale: 1,
      duration: 0.3,
      ease: Power4.easeOut,
    });
    gsap.to(intro_button_open, 0.3, { scale: 1 });
  });

  // tilt visual elements
  document
    .querySelector(".intro__main")
    .addEventListener("mouseenter", moveElements);
});

// functions definitions

// remove elements to fix first transition of hide / show mobile menu
function removeHeaderNavTransition() {
  return gsap
    .timeline()
    .set(".header__navbar", { display: "none" })
    .set(".header__navbar", { clearProps: "all" }, "+=0.2");
}

// move visual elements
function moveElements(e) {
  const { target, offsetX, offsetY } = e;
  const { clientWidth, clientHeight } = target;

  // get 0 0 in the center

  const xPos = offsetX / clientWidth - 0.5;
  const yPos = offsetY / clientHeight - 0.5;

  const introBg = gsap.utils.toArray([".intro__bg--left", ".intro__bg--right"]);
  const orangeBall = gsap.utils.toArray(".intro__orange");
  const purpleBall = gsap.utils.toArray(".intro__purple");

  const modifier = (index) => index * 1.2 + 0.5;

  introBg.forEach((elements, index) => {
    gsap.to(elements, {
      duration: 1.5,
      width: Math.abs(87.1 + xPos * 20 * modifier(index)) + "%",
      paddingTop: Math.abs(30.5 + xPos * 5 * modifier(index)) + "%",
      ease: "Power4.out",
    });
  });

  orangeBall.forEach((elements, index) => {
    gsap.to(elements, {
      duration: 1.8,
      x: Math.abs(8 + xPos * 20 * modifier(index)) + "px",
      y: Math.abs(4 + xPos * 5 * modifier(index)) + "px",
      ease: "Power3.out",
    });
  });

  purpleBall.forEach((elements, index) => {
    gsap.to(elements, {
      duration: 2.5,
      x: Math.abs(2 - xPos * 20 * modifier(index)) + "px",
      y: Math.abs(2 - xPos * 10 * modifier(index)) + "px",
      ease: "Power3.out",
    });
  });
}
