# Stagger.js:

A Simple Solution for Webflow Animations

## Introduction

Hey there, Webflow friend 👋

If you've been working with Webflow for a while, you might have noticed something: the more animations you add using Webflow's built-in interactions, the slower your site gets. It's because each interaction adds to the webflow.js file, and that can really bog things down.

We ran into this problem ourselves and started looking for a better way. That's how we came up with Stagger.js. It's a tool that works with Webflow to give you those nice, staggered animations without slowing down your site.

Here's the deal: Stagger.js lets you add scrolling animations to your Webflow site using just attributes. You don't need to know how to code. All you do is add some numbered attributes to your elements, like `gush-animate="1"`, `gush-animate="2"`, and so on. That's it. Stagger.js handles the rest. It's straightforward and keeps your site running smoothly.

## Features

- Lightweight: Utilizes GSAP for efficient animations without bloating your main JavaScript file.
- Easy to Use: Simple attribute-based system for marking elements to animate.
- Flexible: Supports individual elements, groups, and parent-child relationships.
- Scroll-Triggered: Animations activate as elements come into view.
- Customizable: Easy to adjust timing, easing, and other animation parameters.

## Installation

1. Include GSAP and ScrollTrigger in your `</body>` tag:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>
```

2. Add the staggerd.js script to your `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/staggerd-js@latest/stagger.js"></script>
```

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

GushAnimate was created by Michael at Studio Gushon. For more information, visit https://gushon.com
