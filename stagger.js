function initStaggeredAnimations() {
  const animatedElements = document.querySelectorAll("[data-stagger]");
  const groups = {};
  let singleElements = [];

  animatedElements.forEach((el) => {
    const animateValue = el.getAttribute("data-stagger");

    if (animateValue === "children") {
      // Handle "children" option
      const children = Array.from(el.children);
      createAnimation(children, el);
    } else {
      let ancestor = el.parentElement;
      while (ancestor && !hasMultipleAnimatedChildren(ancestor)) {
        ancestor = ancestor.parentElement;
      }

      if (ancestor) {
        if (!groups[ancestor.id]) {
          ancestor.id = ancestor.id || "stagger-group-" + Object.keys(groups).length;
          groups[ancestor.id] = [];
        }
        groups[ancestor.id].push(el);
      } else {
        singleElements.push(el);
      }
    }
  });

  Object.values(groups).forEach((group) => createAnimation(group));
  singleElements.forEach((el) => createAnimation([el]));
}

function createAnimation(elements, trigger = null) {
  if (elements.length === 0) return;

  elements.sort((a, b) => {
    const aValue = a.getAttribute("data-stagger");
    const bValue = b.getAttribute("data-stagger");
    return aValue && bValue ? parseInt(aValue) - parseInt(bValue) : 0;
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger || elements[0],
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  tl.from(elements, {
    autoAlpha: 0,
    ease: "power2.inOut",
    duration: 1,
    stagger: elements.length > 1 ? 0.2 : 0,
  });
}

function hasMultipleAnimatedChildren(element) {
  const animatedChildren = element.querySelectorAll("[data-stagger]");
  return animatedChildren.length > 1;
}

document.addEventListener("DOMContentLoaded", initStaggeredAnimations);
