const textAnimation = gsap.timeline({ repeat: -1, yoyo: true }); 

textAnimation
   .to(".odd", { x: 400, duration: 5, ease: "back" })
   .to(".even", { x: -400, duration: 5, ease: "back" }, 0); // Start at the same time


const loader = document.getElementById('loader');
const oddElements = document.querySelectorAll('.odd');
const evenElements = document.querySelectorAll('.even');
const textHolder = document.querySelector('.text-holder');

loader.addEventListener('click', () => {
    gsap.to(oddElements, { x: '-100%', duration: 1 });
    gsap.to(evenElements, { x: '100%', duration: 1 });
    gsap.to(textHolder, { y: '-100%', duration: 1, delay:0.3});
    

    textAnimation.pause();
});
