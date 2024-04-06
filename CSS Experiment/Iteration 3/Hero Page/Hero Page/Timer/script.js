// gsap.set(".hero", {y: 400});
gsap.fromTo(".hero",{y:400,opacity:0},{y:0,opacity:1,duration:3});

document.addEventListener('DOMContentLoaded', function() {
        var menuTrigger = document.querySelector('.menu-trigger');
        
        // Add click event listener
        menuTrigger.addEventListener('click', function() {
            // Animate button to move 200px to the left
            gsap.to(".menu", { x: "-=120", duration: 0.5 });

        });
    });
