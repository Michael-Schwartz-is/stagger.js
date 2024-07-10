# Stagger.js:

Lightweight Staggered Animations for Static Websites

## Introduction

In the quest for more efficient and performant web animations, we found that traditional methods, such as Webflow interactions, often lead to bloated JavaScript files and slower load times. This realization led us to explore alternatives, with GSAP (GreenSock Animation Platform) emerging as a natural choice due to its lightweight nature, quick performance, and robust feature set.

GushAnimate is born out of the need to standardize commonly used staggered animations across multiple websites. It provides a simple "stagger language" that allows developers to add numbered attributes to elements and let the script handle the rest. The goal is to add a dynamic feel to otherwise static websites with minimal effort.

## Features

- Lightweight: Utilizes GSAP for efficient animations without bloating your main JavaScript file.
- Easy to Use: Simple attribute-based system for marking elements to animate.
- Flexible: Supports individual elements, groups, and parent-child relationships.
- Scroll-Triggered: Animations activate as elements come into view.
- Customizable: Easy to adjust timing, easing, and other animation parameters.

## Installation

1. Include GSAP and ScrollTrigger in your HTML:

`````html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>

2. Add the GushAnimate script to your HTML: ````html
<script src="path/to/data-stagger.js"></script>
`````

## Usage

### Basic Usage

Add the `data-stagger` attribute to any element you want to animate:

```html
<div data-stagger="1">I'll animate first</div>
<div data-stagger="2">I'll animate second</div>
<div data-stagger="3">I'll animate third</div>
```

## Grouping Elements

Elements with the same parent will be grouped and animated together:

```html
<section>
  <h2 data-stagger="1">This heading</h2>
  <p data-stagger="2">And this paragraph</p>
  <button data-stagger="3">And this button</button>
</section>
```

## Animating Children

To animate all immediate children of an element, use `data-stagger="children"`:

```html
<section data-stagger="children">
  <h2>This heading</h2>
  <p>And this paragraph</p>
  <button>And this button</button>
</section>
```

## How It Works

- Scans the DOM for elements with the data-stagger attribute
- Groups elements based on common ancestors or handles them individually
- For `data-stagger="children"`, selects all immediate children
- Triggers animation when a group or individual element scrolls into view
- Elements animate with a fade-in and slight upward movement, staggered based on their order

## Customization

Modify the createAnimation function in the script to customize animation parameters:

```javascript
tl.from(elements, {
  opacity: 0,
  y: 50,
  duration: 0.5,
  stagger: elements.length > 1 ? 0.2 : 0,
});
```

Adjust `opacity`, `y`, `duration`, and `stagger` values to change animation style and timing. in this version it's global.

## Browser Support

Works in all modern browsers supporting GSAP and ScrollTrigger. See GSAP browser support documentation for details.

## Contributing

We welcome contributions! Feel free to submit issues, feature requests, or pull requests.

## License

GushAnimate is released under the MIT License. See the LICENSE file for details.

## Credit

GushAnimate was created by Michael at Studio Gushon. For more information, visit gushon.com.

# stagger.js

# stagger.js

# stagger.js
