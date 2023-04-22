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
});

// functions definitions

function removeHeaderNavTransition() {
  return gsap
    .timeline()
    .set(".header__navbar", { display: "none" })
    .set(".header__navbar", { clearProps: "all" }, "+=0.2");
}
