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

  const mq1120 = window.matchMedia("(max-width: 1120px)");

  mq1120.addEventListener("change", (e) => {
    if (!e.matches) {
      removeHeaderNavTransition();
      burger.classList.remove("active");
      header_navbar.classList.remove("active");
      body.classList.remove("lock");
    } else {
      removeHeaderNavTransition();
    }
  });

  const intro_button_open = document.querySelector(".intro__button--open");
  const svg_image_open = document.querySelector(".svg-image-open");
  const blockForMouseMove = document.querySelector(".intro__main");
  let introButtonTween = null;

  if (window.innerWidth > 768) {
    introButtonTween = gsap.to(svg_image_open, {
      rotation: 360,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
    initRotation();
    initMovement(blockForMouseMove);
    initStartAnimation();
  }

  const mq768 = window.matchMedia("(max-width: 768px)");

  mq768.addEventListener("change", (e) => {
    if (e.matches) {
      // reset all button listeners
      gsap.killTweensOf("*");
      gsap.set(svg_image_open, { clearProps: "all" });
      gsap.set(intro_button_open, { clearProps: "all" });
      intro_button_open.removeEventListener(
        "mouseenter",
        accelerateRotateButton
      );
      intro_button_open.removeEventListener(
        "mouseleave",
        returnToRegularRotation
      );
      blockForMouseMove.removeEventListener("mousemove", moveElements);
    } else {
      introButtonTween = gsap.to(svg_image_open, {
        rotation: 360,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
      initRotation();
      initMovement(blockForMouseMove);
    }
  });

  // rotate intro__open--button
  function initRotation() {
    intro_button_open.addEventListener("mouseenter", accelerateRotateButton);

    intro_button_open.addEventListener("mouseleave", returnToRegularRotation);
  }

  function accelerateRotateButton() {
    gsap.to(introButtonTween, {
      timeScale: 15,
      duration: 0.3,
      ease: Power4.easeOut,
    });
    gsap.to(intro_button_open, 0.3, { scale: 1.2 });
  }

  function returnToRegularRotation() {
    gsap.to(introButtonTween, {
      timeScale: 1,
      duration: 0.3,
      ease: Power4.easeOut,
    });
    gsap.to(intro_button_open, 0.3, { scale: 1 });
  }

  // show / hide panels
  const intro__open = document.querySelector(".intro__open");
  const panelTop = document.querySelector(".intro__panel--top");
  const panelBottom = document.querySelector(".intro__panel--bottom");
  const introContent = document.querySelector(".intro__content");

  if (window.innerWidth > 576) {
    initPanelsToggle();
  }

  const mq576 = window.matchMedia("(max-width: 576px)");

  mq576.addEventListener("change", (e) => {
    if (e.matches) {
      // reset all gsap properties and listeners
      gsap.killTweensOf("*");
      gsap.set(panelTop, { clearProps: "all" });
      gsap.set(panelBottom, { clearProps: "all" });
      gsap.set(introContent, { clearProps: "all" });
      intro__open.removeEventListener("click", introOpenHandler);
      panelTop.classList.remove("active");
    } else {
      initPanelsToggle();
    }
  });

  function initPanelsToggle() {
    intro__open.addEventListener("click", introOpenHandler);
  }

  function introOpenHandler() {
    const isPanelsVisible = panelTop.classList.contains("active");
    if (!isPanelsVisible) {
      gsap
        .timeline({
          defaults: {
            duration: 0.5,
            ease: "Power3.easeOut",
          },
        })
        .to(panelTop, {
          y: 60,
        })
        .to(
          panelBottom,
          {
            y: -60,
          },
          0
        )
        .to(
          introContent,
          {
            borderBottomLeftRadius: 0,
          },
          0
        );
      panelTop.classList.add("active");
    } else {
      gsap
        .timeline({
          defaults: {
            duration: 0.5,
            ease: "Power3.easeOut",
          },
        })
        .to(panelTop, {
          y: 0,
        })
        .to(
          panelBottom,
          {
            y: 0,
          },
          0
        )
        .to(
          introContent,
          {
            borderBottomLeftRadius: 30,
          },
          0
        );
      panelTop.classList.remove("active");
    }
  }
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

  // introBg.forEach((elements, index) => {
  //   gsap.to(elements, {
  //     duration: 3,
  //     width: Math.abs(87.1 + xPos * 20 * modifier(index)) + "%",
  //     paddingTop: Math.abs(30.5 + xPos * 5 * modifier(index)) + "%",
  //     ease: "Power4.out",
  //   });
  // });

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
      duration: 3.5,
      x: Math.abs(2 - xPos * 20 * modifier(index)) + "px",
      y: Math.abs(2 - xPos * 10 * modifier(index)) + "px",
      ease: "Power3.out",
    });
  });
}

function initMovement(blockForMouseMove) {
  // move visual elements by mousemove
  blockForMouseMove.addEventListener("mousemove", moveElements);
}

function initStartAnimation() {
  const intro = document.querySelector(".intro");
  const headerItems = Array.from(document.querySelectorAll(".header__item"));
  const panelTop = document.querySelector(".intro__panel--top");
  const panelBottom = document.querySelector(".intro__panel--bottom");

  const startTL = gsap.timeline();

  startTL
    .set(panelBottom, {
      y: -60,
    })
    .set(panelTop, {
      y: 60,
    })
    .from(intro, {
      autoAlpha: 0,
      y: 200,
      delay: 0.5,
      duration: 1,
      ease: "Power3.easeOut",
    })
    .from(
      headerItems,
      {
        autoAlpha: 0,
        y: -30,
        duration: 0.5,
        ease: "Power3.easeOut",
      },
      "-=0.3"
    )
    .to(panelTop, {
      y: 0,
      duration: 0.5,
      ease: "Power3.easeOut",
    })
    .to(
      panelBottom,
      {
        y: 0,
        duration: 0.5,
        ease: "Power3.easeOut",
      },
      0
    );
}
