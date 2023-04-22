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
});

function removeHeaderNavTransition() {
  return gsap
    .timeline()
    .set(".header__navbar", { display: "none" })
    .set(".header__navbar", { clearProps: "all" }, "+=0.2");
}
