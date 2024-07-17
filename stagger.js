const animationPresets = {
  fade: {
    in: { autoAlpha: 0 },
    left: { autoAlpha: 0, x: -50 },
    right: { autoAlpha: 0, x: 50 },
    top: { autoAlpha: 0, y: -50 },
    bottom: { autoAlpha: 0, y: 50 },
  },
  slide: {
    left: { x: -100, autoAlpha: 0 },
    right: { x: 100, autoAlpha: 0 },
    top: { y: -100, autoAlpha: 0 },
    bottom: { y: 100, autoAlpha: 0 },
  },
  zoom: {
    in: { scale: 0.5, autoAlpha: 0 },
    out: { scale: 1.5, autoAlpha: 0 },
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
    in: { y: -50, autoAlpha: 0, ease: "bounce.out" },
    left: { x: -50, autoAlpha: 0, ease: "bounce.out" },
    right: { x: 50, autoAlpha: 0, ease: "bounce.out" },
  },
  elastic: {
    in: { scale: 0.5, autoAlpha: 0, ease: "elastic.out(1, 0.3)" },
    left: { x: -100, autoAlpha: 0, ease: "elastic.out(1, 0.3)" },
    right: { x: 100, autoAlpha: 0, ease: "elastic.out(1, 0.3)" },
  },
  blur: {
    in: { filter: "blur(20px)", autoAlpha: 0 },
  },
  shake: {
    x: {
      x: 20,
      autoAlpha: 0,
      ease: "rough({ strength: 8, points: 20, template: linear, taper: both })",
    },
    y: {
      y: 20,
      autoAlpha: 0,
      ease: "rough({ strength: 8, points: 20, template: linear, taper: both })",
    },
  },
  swing: {
    in: { rotation: 45, transformOrigin: "top left", autoAlpha: 0 },
  },
  spiral: {
    in: { rotation: 360, scale: 0, autoAlpha: 0 },
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
  });
}

function parseStaggerAttribute(attr) {
  const parts = attr.split(".");

  if (parts[0] === "children") {
    return [0, "children", ...parts.slice(1)];
  } else {
    return [parseInt(parts[0]) || 0, ...parts.slice(1)];
  }
}

function getAnimationProps(animationParts) {
  const [animationType, direction = "in"] = animationParts;

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
    const isChildren = parsedAttr[1] === "children";
    const [order, ...animationParts] = parsedAttr;

    debugMode &&
      console.log(`Animating element: ${el.tagName}, animation: ${animationParts.join(".")}`);

    if (isChildren) {
      debugMode && console.log("Animating element with children:", el);
      const children = Array.from(el.children);
      debugMode && console.log("Number of children found:", children.length);

      gsap.set(el, { autoAlpha: 1 });

      gsap.from(children, {
        ...getAnimationProps(animationParts.slice(1)),
        duration: 1,
        stagger: 0.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        onStart: () => debugMode && console.log("Starting children animation"),
        onComplete: () => debugMode && console.log("Completed children animation"),
      });
    } else {
      debugMode && console.log("Animating single element:", el);
      gsap.from(el, {
        ...getAnimationProps(animationParts),
        duration: 1,
        ease: "power2.inOut",
        delay: order * 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    }
  });
}

// Run initStaggeredAnimations after a short delay to ensure all elements are in the DOM
window.addEventListener("load", () => {
  debugMode && console.log("Window loaded, initializing animations");
  setTimeout(initStaggeredAnimations, 100);
});
