document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const backgroundElementsContainer = document.createElement('div');
    backgroundElementsContainer.classList.add('background-elements');
    body.prepend(backgroundElementsContainer); // Add as first child of body

    // --- Dynamic Background Elements ---

    // Function to create a star
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = star.style.height = `${Math.random() * 3 + 1}px`; // 1 to 4px
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 4}s`; // Stagger animation
        star.style.setProperty('--star-drift-duration', `${Math.random() * 30 + 20}s`);
        star.style.setProperty('--star-drift-x', `${(Math.random() - 0.5) * 40}vw`);
        star.style.setProperty('--star-drift-y', `${(Math.random() - 0.5) * 40}vh`);
        backgroundElementsContainer.appendChild(star);
    }
    // Create multiple stars
    for (let i = 0; i < 70; i++) {
        createStar();
    }

    // Function to create an ethereal glow
    function createEtherealGlow() {
        const glow = document.createElement('div');
        glow.classList.add('ethereal-glow');
        const size = Math.random() * 150 + 100; // 100px to 250px
        glow.style.width = glow.style.height = `${size}px`;
        glow.style.left = `${Math.random() * 100}vw`;
        glow.style.top = `${Math.random() * 100}vh`;
        glow.style.animationDelay = `${Math.random() * 10}s`;
        glow.style.setProperty('--glow-duration', `${Math.random() * 20 + 15}s`);
        glow.style.setProperty('--x', `${Math.random() * 100}`);
        glow.style.setProperty('--y', `${Math.random() * 100}`);
        glow.style.setProperty('--dx', `${(Math.random() - 0.5) * 20}`);
        glow.style.setProperty('--dy', `${(Math.random() - 0.5) * 20}`);
        glow.style.setProperty('--glow-scale', `${Math.random() * 0.5 + 0.8}`); // 0.8 to 1.3
        backgroundElementsContainer.appendChild(glow);
    }
    // Create multiple glows
    for (let i = 0; i < 5; i++) {
        createEtherealGlow();
    }

    // Function to create a particle
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 2 + 1; // 1 to 3px
        particle.style.width = particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.setProperty('--p-duration', `${Math.random() * 10 + 5}s`);
        particle.style.setProperty('--p-x', `${Math.random() * 100}vw`);
        particle.style.setProperty('--p-y', `${Math.random() * 100}vh`);
        particle.style.setProperty('--p-dx', `${(Math.random() - 0.5) * 50}vw`);
        particle.style.setProperty('--p-dy', `${(Math.random() - 0.5) * 50}vh`);
        particle.style.setProperty('--p-scale', `${Math.random() * 0.5 + 0.5}`); // 0.5 to 1.0
        backgroundElementsContainer.appendChild(particle);
    }
    // Create multiple particles
    for (let i = 0; i < 30; i++) {
        createParticle();
    }

    // Add Moon (if not already in HTML)
    let moon = document.querySelector('.moon');
    if (!moon) {
        moon = document.createElement('div');
        moon.classList.add('moon');
        moon.style.width = moon.style.height = '150px';
        moon.style.left = '85vw';
        moon.style.top = '10vh';
        backgroundElementsContainer.appendChild(moon);
    }

    // Add Distant Scenery (if not already in HTML)
    let scenery = document.querySelector('.distant-scenery');
    if (!scenery) {
        scenery = document.createElement('div');
        scenery.classList.add('distant-scenery');
        backgroundElementsContainer.appendChild(scenery);
    }

    // Add Water Shimmer (if not already in HTML)
    let water = document.querySelector('.water-shimmer');
    if (!water) {
        water = document.createElement('div');
        water.classList.add('water-shimmer');
        backgroundElementsContainer.appendChild(water);
    }

    // Function to create a floating orb
    function createFloatingOrb() {
        const orb = document.createElement('div');
        orb.classList.add('floating-orb');
        const size = Math.random() * 80 + 20; // 20px to 100px
        orb.style.width = orb.style.height = `${size}px`;
        orb.style.left = `${Math.random() * 100}vw`;
        orb.style.top = `${Math.random() * 100}vh`;
        orb.style.animationDelay = `${Math.random() * 7}s`;
        orb.style.setProperty('--orb-color', `hsla(${Math.random() * 360}, 100%, 70%, 0.7)`);
        orb.style.setProperty('--orb-blur', `${Math.random() * 20 + 10}px`);
        orb.style.setProperty('--orb-opacity', `${Math.random() * 0.3 + 0.2}`);
        orb.style.setProperty('--orb-duration', `${Math.random() * 20 + 10}s`);
        orb.style.setProperty('--orb-pulse-duration', `${Math.random() * 5 + 3}s`);
        orb.style.setProperty('--orb-x', `${Math.random() * 100}`);
        orb.style.setProperty('--orb-y', `${Math.random() * 100}`);
        orb.style.setProperty('--orb-dx', `${(Math.random() - 0.5) * 30}`);
        orb.style.setProperty('--orb-dy', `${(Math.random() - 0.5) * 30}`);
        orb.style.setProperty('--orb-scale', `${Math.random() * 0.6 + 0.7}`);
        backgroundElementsContainer.appendChild(orb);
    }
    // Create multiple orbs
    for (let i = 0; i < 7; i++) {
        createFloatingOrb();
    }

    // Function to create a nebula cloud
    function createNebulaCloud() {
        const cloud = document.createElement('div');
        cloud.classList.add('nebula-cloud');
        const size = Math.random() * 200 + 100; // 100px to 300px
        cloud.style.width = cloud.style.height = `${size}px`;
        cloud.style.left = `${Math.random() * 100}vw`;
        cloud.style.top = `${Math.random() * 100}vh`;
        cloud.style.animationDelay = `${Math.random() * 15}s`;
        cloud.style.setProperty('--cloud-color', `hsla(${Math.random() * 360}, 80%, 60%, 0.5)`);
        cloud.style.setProperty('--cloud-blur', `${Math.random() * 30 + 20}px`);
        cloud.style.setProperty('--cloud-opacity', `${Math.random() * 0.3 + 0.1}`);
        cloud.style.setProperty('--cloud-duration', `${Math.random() * 40 + 20}s`);
        cloud.style.setProperty('--cloud-x', `${Math.random() * 100}vw`);
        cloud.style.setProperty('--cloud-y', `${Math.random() * 100}vh`);
        cloud.style.setProperty('--cloud-dx', `${(Math.random() - 0.5) * 60}vw`);
        cloud.style.setProperty('--cloud-dy', `${(Math.random() - 0.5) * 60}vh`);
        cloud.style.setProperty('--cloud-scale', `${Math.random() * 0.8 + 0.8}`);
        backgroundElementsContainer.appendChild(cloud);
    }
    // Create multiple clouds
    for (let i = 0; i < 4; i++) {
        createNebulaCloud();
    }

    // Function to create a wind gust
    function createWindGust() {
        const gust = document.createElement('div');
        gust.classList.add('wind-gust');
        gust.style.top = `${Math.random() * 100}vh`;
        gust.style.animationDelay = `${Math.random() * 10}s`;
        gust.style.setProperty('--gust-opacity', `${Math.random() * 0.2 + 0.1}`);
        gust.style.setProperty('--gust-height', `${Math.random() * 5 + 1}px`);
        gust.style.setProperty('--gust-width', `${Math.random() * 200 + 100}px`);
        gust.style.setProperty('--gust-blur', `${Math.random() * 5 + 2}px`);
        gust.style.setProperty('--gust-duration', `${Math.random() * 10 + 5}s`);
        backgroundElementsContainer.appendChild(gust);
    }
    // Create multiple gusts
    for (let i = 0; i < 10; i++) {
        createWindGust();
    }

    // Function to create a flying wing
    function createFlyingWing() {
        const wing = document.createElement('div');
        wing.classList.add('flying-wing');
        const size = Math.random() * 60 + 20; // 20px to 80px
        wing.style.width = `${size}px`;
        wing.style.height = `${size * 0.6}px`; // Maintain aspect ratio
        wing.style.left = `${Math.random() * 100}vw`;
        wing.style.top = `${Math.random() * 100}vh`;
        wing.style.animationDelay = `${Math.random() * 12}s`;
        wing.style.setProperty('--wing-color', `hsla(${Math.random() * 360}, 70%, 80%, 0.6)`);
        wing.style.setProperty('--wing-opacity', `${Math.random() * 0.4 + 0.2}`);
        wing.style.setProperty('--wing-duration', `${Math.random() * 30 + 15}s`);
        wing.style.setProperty('--wing-x', `${Math.random() * 100}vw`);
        wing.style.setProperty('--wing-y', `${Math.random() * 100}vh`);
        wing.style.setProperty('--wing-dx', `${(Math.random() - 0.5) * 80}vw`);
        wing.style.setProperty('--wing-dy', `${(Math.random() - 0.5) * 80}vh`);
        wing.style.setProperty('--wing-scale', `${Math.random() * 0.7 + 0.5}`);
        wing.style.setProperty('--wing-rotation', `${Math.random() * 360}deg`);
        backgroundElementsContainer.appendChild(wing);
    }
    // Create multiple wings
    for (let i = 0; i < 6; i++) {
        createFlyingWing();
    }

    // Function to create a shooting star
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        const startX = Math.random() * 100;
        const startY = Math.random() * 50; // Top half of the screen
        const angle = Math.random() * 90 - 45; // -45deg to 45deg for varied directions
        const duration = Math.random() * 3 + 2; // 2 to 5 seconds
        const endX = startX + (Math.random() * 50 + 50) * Math.cos(angle * Math.PI / 180); // Ensure it moves significantly
        const endY = startY + (Math.random() * 50 + 50) * Math.sin(angle * Math.PI / 180);

        shootingStar.style.setProperty('--start-x', `${startX}vw`);
        shootingStar.style.setProperty('--start-y', `${startY}vh`);
        shootingStar.style.setProperty('--end-x', `${endX}vw`);
        shootingStar.style.setProperty('--end-y', `${endY}vh`);
        shootingStar.style.setProperty('--shoot-angle', `${angle}deg`);
        shootingStar.style.setProperty('--shoot-duration', `${duration}s`);
        shootingStar.style.animationDelay = `${Math.random() * 15}s`; // Stagger animation
        backgroundElementsContainer.appendChild(shootingStar);
    }
    // Create multiple shooting stars
    for (let i = 0; i < 3; i++) { // A few shooting stars
        createShootingStar();
    }


    // --- Heart Element ---
    const heartWrapper = document.createElement('div');
    heartWrapper.classList.add('heart-animation-wrapper'); // Wrapper for heart animations if needed
    
    const cssHeart = document.createElement('div');
    cssHeart.classList.add('css-heart');
    cssHeart.classList.add('beating-heart'); // Apply heartbeat animation

    // The actual heart shape is created by CSS ::before and ::after pseudo-elements
    // so we don't need to append heartBefore and heartAfter as direct children of cssHeart.
    // The cssHeart itself should be appended and the ::before and ::after will be drawn by CSS.
    
    heartWrapper.appendChild(cssHeart);
    // Find a suitable place to append the heart, e.g., inside the main container or body
    // For now, I'll append it to the body for visibility.
    // However, it might be intended to be part of a preloader or a specific content section.
    // Based on the CSS, it seems like a standalone element.
    // Let's place it temporarily at the top of the body, before the main container.
    const mainContainer = document.querySelector('.container');
    if (mainContainer) {
        body.insertBefore(heartWrapper, mainContainer);
    } else {
        body.appendChild(heartWrapper);
    }


    // --- Preloader Logic ---
    const preloader = document.getElementById('preloader');
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');
    const preloaderMessage = document.querySelector('.preloader-message');

    let currentProgress = 0;
    const totalSteps = 100;
    const intervalTime = 20; // milliseconds for each step

    function updatePreloader() {
        if (currentProgress < totalSteps) {
            currentProgress++;
            if (indexProgressBar) {
                indexProgressBar.style.width = `${currentProgress}%`;
            }
            if (indexProgressText) {
                indexProgressText.textContent = `${currentProgress}%`;
            }
            setTimeout(updatePreloader, intervalTime);
        } else {
            // Preloader complete, fade out and reveal content
            if (preloader) {
                preloader.classList.add('hidden');
                preloader.addEventListener('transitionend', () => {
                    preloader.remove(); // Remove preloader from DOM after fade out
                }, { once: true });
            }
            // Reveal main content after preloader fades
            const container = document.querySelector('.container');
            if (container) {
                container.classList.add('visible-content');
            }
            // Animate words in preloader message (if still visible)
            if (preloaderMessage) {
                const words = preloaderMessage.textContent.split(' ');
                preloaderMessage.innerHTML = '';
                words.forEach((word, index) => {
                    const span = document.createElement('span');
                    span.textContent = word + (index < words.length - 1 ? ' ' : '');
                    span.classList.add('word-animated');
                    preloaderMessage.appendChild(span);
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'scale(1)';
                    }, index * 100); // Stagger animation for each word
                });
            }

            // Stagger animation for paragraphs and section breaks
            const paragraphs = document.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.style.opacity = '1';
                }, 1500 + (index * 200)); // Delay after preloader fades
            });

            const sectionBreaks = document.querySelectorAll('.section-break');
            sectionBreaks.forEach((sb, index) => {
                setTimeout(() => {
                    sb.style.opacity = '1';
                }, 1800 + (index * 200)); // Delay after paragraphs
            });
        }
    }

    // Start preloader if it exists
    if (preloader && indexProgressBar && indexProgressText) {
        updatePreloader();
    } else {
        // If no preloader, just reveal content
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('visible-content');
        }
    }

    // Music Playback (example, actual audio handling not included here)
    const musicButton = document.getElementById('music-play-button');
    if (musicButton) {
        let isPlaying = false;
        // In a real scenario, you'd integrate Web Audio API or a simple <audio> tag
        // For demonstration, just toggle icon and class
        musicButton.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                musicButton.innerHTML = '&#9616;&#9616;'; // Pause icon
                musicButton.classList.add('playing');
                console.log('Music playing...');
            } else {
                musicButton.innerHTML = '&#9654;'; // Play icon
                musicButton.classList.remove('playing');
                console.log('Music paused.');
            }
        });
    }
});
