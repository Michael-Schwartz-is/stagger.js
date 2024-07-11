# Stagger Interactions for Webflow

## Why We Need This

Webflow's built-in interactions, while powerful, can lead to bloated webflow.js files. This bloat often results in slower load times and decreased overall site performance, potentially impacting user experience and search engine rankings. Our system provides a lightweight alternative that maintains rich animation capabilities while significantly improving load times and performance.

## One Magic Attribute (To Rule Them All)

We've condensed all animation controls into a single, powerful attribute: data-stagger. This attribute allows you to specify the animation order, type, and direction in one concise instruction.

## How It Works

The `data-stagger` attribute uses the following syntax:
`data-stagger="[order].[animation-type].[direction]"`

For example:

`data-stagger="1.fade.in"` - Fades in the element, first in order

`data-stagger="2.slide.left"` - Slides the element in from the left, second in order

`data-stagger="children.zoom.in"` - Zooms in all child elements of the parent

## Implementation

Add GSAP to your project by including these scripts before the closing </body> tag:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>
```

Include our custom animation script:

```html
<script src="path/to/stagger-interactions.js"></script>
```

Start using the `data-stagger` attribute in your HTML elements.

Full List of Interaction Options

1. **Fade**

   - `fade.in`
   - `fade.left`
   - `fade.right`
   - `fade.top`
   - `fade.bottom`

2. **Slide**

   - `slide.left`
   - `slide.right`
   - `slide.top`
   - `slide.bottom`

3. **Zoom**

   - `zoom.in`
   - `zoom.out`

4. **Flip**

   - `flip.x`
   - `flip.y`

5. **Rotate**

   - `rotate.left`
   - `rotate.right`

6. **Bounce**

   - `bounce.in`
   - `bounce.left`
   - `bounce.right`

7. **Elastic**

   - `elastic.in`
   - `elastic.left`
   - `elastic.right`

8. **Blur**

   - `blur.in`

9. **Shake**

   - `shake.x`
   - `shake.y`

10. **Swing**

    - `swing.in`

11. **Spiral**

    - `spiral.in`

12. **Hinge**

    - `hinge.out`

13. **Pulsate**

    - `pulsate.in`

14. **Drop In**

    - `dropIn.top`

15. **Unfold**

    - `unfold.horizontal`
    - `unfold.vertical`

16. **Rise**

    - `rise.in`

17. **Typewriter**
    - `typewriter.in`

To use these, simply add the `data-stagger` attribute to an element. you can add it to a single element or to a parent to animate it's children. For example:

- `data-stagger="1.bounce.in"`
- `data-stagger="2.slide.left"`
- `data-stagger="children.zoom.in"`

## Inspiration from Lumos

Our approach draws inspiration from Timothy Ricks' Lumos styling system. Lumos pioneered the concept of concatenating multiple style parameters into a single class, allowing for powerful and flexible styling options. We've adapted this idea to work with animations, using a single attribute to control multiple aspects of an animation.

## Who Made This

This system was developed by Michael Schwartz at Studio Gushon, a webflow agency passionate about creating high-performance, visually appealing websites. We combined our expertise in Webflow, GSAP, and performance optimization to create this lightweight animation system.

## Want to Contribute?

We welcome contributions to improve and expand this system! If you have ideas for new animations, performance optimizations, or bug fixes, please visit our GitHub repository at [repository link]. You can submit issues, feature requests, or pull requests. Let's work together to make web animations faster and more accessible for everyone!
