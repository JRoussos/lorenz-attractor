# Lorenz Attractor
[![](preview.gif "Live Preview")](https://lorenz-attractor-visualization.netlify.app/)

[Live Preview](https://lorenz-attractor-visualization.netlify.app/)

So I have been reading [this book](https://www.goodreads.com/book/show/486658.Chaos "Chaos, The amazing science of the unpredictable") lately by James Gleick, about Chaos theory and the science of unpredictable events, and thus far it is a really good read. In it there is a chapter that describes the story of Edward Lorenz and his discovery of the butterfly effect (it is very interesting, [read here](https://www.aps.org/publications/apsnews/200301/history.cfm)), reading that inspired me to make my version of the famous lorenz attractor.

Lorenz found that if you have a system with some initial values that are basically the same but only having the tiniest deviation from one another, as time passes those tiny differences scale up and that after a few iterations the values end up completely unrelated and with their own trajectory. And the cool part is that the system will never repeat itself and so the points will never intersect.

The equations Lorenz used are a simplified mathematical model for atmospheric convection. The model is a system of those three ordinary differential equations:

    dx/dt = σ * (y - x),
    dy/dt = x * (ρ - z) - y,
    dz/dt = x * y - β * z

To make the system behave chaotic he used the values σ = 10, β = 8/3 and ρ = 28.

### Overcoming Problems
- I wanted to have a bloom effect around the lines and so I added some post processing action but due to performance limitations of most devices, I had to disabled it by default. If you want you can enable it by using the '/?post=1' parameter at the end of the URL, or just click [here](https://lorenz-attractor-visualization.netlify.app/?post=1 )


### Run
- Install `npm install`
- Run `npm start`
- Build `npm run build`

### Libraries

- [Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) - The WebGL library behind all the animations
- [R3f](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) - A React renderer for three.js
- [gsap](https://greensock.com/gsap/) - A JavaScript animation library 

