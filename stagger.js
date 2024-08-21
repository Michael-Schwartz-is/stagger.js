const animationPresets = {
  fade: {
    in: { autoAlpha: 0 },
    left: { autoAlpha: 0, x: -30 },
    right: { autoAlpha: 0, x: 30 },
    top: { autoAlpha: 0, y: -30 },
    bottom: { autoAlpha: 0, y: 30 },
  },
  slide: {
    left: { x: -30, autoAlpha: 0 },
    right: { x: 30, autoAlpha: 0 },
    top: { y: -30, autoAlpha: 0 },
    bottom: { y: 30, autoAlpha: 0 },
  },
  zoom: {
    in: { scale: 0.9, autoAlpha: 0 },
    out: { scale: 1.1, autoAlpha: 0 },
  },
  flip: {
    x: { rotationX: 90, autoAlpha: 0 },
    y: { rotationY: 90, autoAlpha: 0 },
  },
  rotate: {
    left: { rotation: -90, autoAlpha: 0 },
    right: { rotation: 90, autoAlpha: 0 },
  },
  bounce: {
    in: { y: 25, autoAlpha: 0, ease: "bounce.out" },
    left: { x: -25, autoAlpha: 0, ease: "bounce.out" },
    right: { x: 25, autoAlpha: 0, ease: "bounce.out" },
  },
  elastic: {
    in: { scale: 0.5, autoAlpha: 0, ease: "elastic.out(1, 0.3)" },
    left: { x: -100, autoAlpha: 0, ease: "elastic.out(1, 0.3)" },
    right: { x: 100, autoAlpha: 0, ease: "elastic.out(1, 0.3)" },
  },
  blur: {
    in: { filter: "blur(10px)", autoAlpha: 0 },
  },
  shake: {
    x: {
      x: 40,
      autoAlpha: 0,
      ease: "rough({ strength: 8, points: 20, template: linear, taper: both })",
    },
    y: {
      y: 200,
      autoAlpha: 0,
      ease: "rough({ strength: 8, points: 20, template: linear, taper: both })",
    },
  },
  swing: {
    in: { rotation: 12, transformOrigin: "bottom left", autoAlpha: 0 },
  },
  spiral: {
    left: {
      rotation: 180,
      scale: 0,
      transformOrigin: "bottom left",
      autoAlpha: 0,
    },
    right: {
      rotation: -180,
      scale: 0,
      transformOrigin: "bottom right",
      autoAlpha: 0,
    },
  },
  hinge: {
    out: {
      rotation: 80,
      x: -300,
      y: 300,
      transformOrigin: "top left",
      autoAlpha: 0,
      ease: "power2.inOut",
    },
  },
  pulsate: {
    in: { scale: 0.5, autoAlpha: 0, ease: "elastic.out(1, 0.3)" },
  },
  dropIn: {
    top: { y: -500, autoAlpha: 0, ease: "bounce.out" },
  },
  unfold: {
    horizontal: { scaleX: 0, autoAlpha: 0 },
    vertical: { scaleY: 0, autoAlpha: 0 },
  },
  rise: {
    in: { y: 100, autoAlpha: 0, ease: "power4.out" },
  },
  typewriter: {
    in: { width: 0, autoAlpha: 1 },
  },
};

let debugMode = localStorage.getItem("debugMode") === "true" || false;
document.addEventListener("keydown", (e) => {
  if (e.key === "d") {
    debugMode = !debugMode;
    localStorage.setItem("debugMode", debugMode);
    location.reload();
  }
});

function initStaggeredAnimations() {
  const elements = document.querySelectorAll("[data-stagger]");
  debugMode && console.log("Found elements with data-stagger:", elements.length);

  ScrollTrigger.batch(elements, {
    onEnter: (batch) => {
      debugMode && console.log("Batch entered:", batch.length);
      animateElements(batch);
    },
    start: "top 80%",
    once: true,
  });
}

function parseStaggerAttribute(attr) {
  const parts = attr.split(".");

  return parts;
}

function getAnimationProps(animationParts) {
  const [animationType, direction] = animationParts;

  if (animationPresets[animationType] && animationPresets[animationType][direction]) {
    return animationPresets[animationType][direction];
  }
  console.warn(
    `Animation preset not found: ${animationType}.${direction}. Falling back to fade.in`
  );
  return animationPresets.fade.in;
}

function animateElements(elements) {
  elements.forEach((el) => {
    const parsedAttr = parseStaggerAttribute(el.getAttribute("data-stagger"));
    const [...animationParts] = parsedAttr;

    debugMode &&
      console.log(`Animating element: ${el.tagName}, animation: ${animationParts.join(".")}`);

    debugMode && console.log("Animating children:", el);
    const children = Array.from(el.children);
    debugMode && console.log("Number of children found:", children.length);

    gsap.set(el, { autoAlpha: 1 });

    gsap.from(children, {
      ...getAnimationProps(animationParts.slice(0)),
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: children[0],
        start: "top 80%",
      },
      onStart: () => debugMode && console.log("Starting children animation"),
      onComplete: () => debugMode && console.log("Completed children animation"),
    });
  });
}

window.addEventListener("load", () => {
  debugMode && console.log("Window loaded, initializing animations");
  setTimeout(initStaggeredAnimations, 100);
});
