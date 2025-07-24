document.addEventListener('DOMContentLoaded', () => {
    // Function to generate a random number within a range
    const getRandom = (min, max) => Math.random() * (max - min) + min;

    // Background Elements Initialization (dynamic generation based on CSS)
    function initializeBackgroundEffects() {
        const backgroundElements = document.createElement('div');
        backgroundElements.className = 'background-elements';
        document.body.prepend(backgroundElements); // Add to the beginning of the body

        // --- Stars ---
        const numStars = 100;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = getRandom(1, 3);
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${getRandom(0, 100)}vw`;
            star.style.top = `${getRandom(0, 100)}vh`;
            star.style.animationDelay = `${getRandom(0, 5)}s`;
            star.style.setProperty('--star-drift-duration', `${getRandom(20, 40)}s`);
            star.style.setProperty('--star-drift-x', `${getRandom(-20, 20)}vw`);
            star.style.setProperty('--star-drift-y', `${getRandom(-20, 20)}vh`);
            backgroundElements.appendChild(star);
        }

        // --- Ethereal Glows ---
        const numGlows = 8;
        for (let i = 0; i < numGlows; i++) {
            const glow = document.createElement('div');
            glow.className = 'ethereal-glow';
            const size = getRandom(100, 300);
            glow.style.width = `${size}px`;
            glow.style.height = `${size}px`;
            glow.style.left = `${getRandom(0, 100)}vw`;
            glow.style.top = `${getRandom(0, 100)}vh`;
            glow.style.animationDelay = `${getRandom(0, 5)}s`;
            glow.style.setProperty('--glow-duration', `${getRandom(15, 30)}s`);
            glow.style.setProperty('--glow-scale', `${getRandom(0.8, 1.2)}`);
            glow.style.setProperty('--x', `${getRandom(0, 100)}`);
            glow.style.setProperty('--y', `${getRandom(0, 100)}`);
            glow.style.setProperty('--dx', `${getRandom(-30, 30)}`);
            glow.style.setProperty('--dy', `${getRandom(-30, 30)}`);
            backgroundElements.appendChild(glow);
        }

        // --- Particles ---
        const numParticles = 50;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = getRandom(2, 5);
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.setProperty('--p-x', `${getRandom(0, 100)}vw`);
            particle.style.setProperty('--p-y', `${getRandom(0, 100)}vh`);
            particle.style.setProperty('--p-dx', `${getRandom(-50, 50)}px`);
            particle.style.setProperty('--p-dy', `${getRandom(-50, 50)}px`);
            particle.style.setProperty('--p-scale', `${getRandom(0.5, 1.5)}`);
            particle.style.setProperty('--p-duration', `${getRandom(5, 15)}s`);
            particle.style.animationDelay = `${getRandom(0, 10)}s`;
            backgroundElements.appendChild(particle);
        }

        // --- Moon ---
        const moon = document.createElement('div');
        moon.className = 'moon';
        moon.style.width = '200px';
        moon.style.height = '200px';
        moon.style.left = `${getRandom(10, 80)}vw`;
        moon.style.top = `${getRandom(5, 40)}vh`;
        backgroundElements.appendChild(moon);

        // --- Distant Scenery ---
        const scenery = document.createElement('div');
        scenery.className = 'distant-scenery';
        backgroundElements.appendChild(scenery);

        // --- Water Shimmer ---
        const waterShimmer = document.createElement('div');
        waterShimmer.className = 'water-shimmer';
        backgroundElements.appendChild(waterShimmer);

        // --- Floating Orbs ---
        const numOrbs = 7;
        const orbColors = ['#FF69B1', '#8A2BE2', '#FFD700', '#ADD8E6']; // Pink, Purple, Gold, Light Blue
        for (let i = 0; i < numOrbs; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            const size = getRandom(80, 200);
            orb.style.width = `${size}px`;
            orb.style.height = `${size}px`;
            orb.style.left = `${getRandom(0, 100)}vw`;
            orb.style.top = `${getRandom(0, 100)}vh`;
            orb.style.animationDelay = `${getRandom(0, 7)}s`;
            orb.style.setProperty('--orb-color', orbColors[Math.floor(getRandom(0, orbColors.length))]);
            orb.style.setProperty('--orb-blur', `${getRandom(30, 60)}px`);
            orb.style.setProperty('--orb-opacity', `${getRandom(0.1, 0.4)}`);
            orb.style.setProperty('--orb-duration', `${getRandom(20, 40)}s`);
            orb.style.setProperty('--orb-pulse-duration', `${getRandom(3, 7)}s`);
            orb.style.setProperty('--orb-x', `${getRandom(0, 100)}`);
            orb.style.setProperty('--orb-y', `${getRandom(0, 100)}`);
            orb.style.setProperty('--orb-dx', `${getRandom(-40, 40)}`);
            orb.style.setProperty('--orb-dy', `${getRandom(-40, 40)}`);
            orb.style.setProperty('--orb-scale', `${getRandom(0.7, 1.3)}`);
            backgroundElements.appendChild(orb);
        }

        // --- Nebula Clouds ---
        const numClouds = 5;
        const cloudColors = ['rgba(138,43,226,0.6)', 'rgba(255,105,180,0.6)', 'rgba(255,215,0,0.6)']; // Purple, Pink, Gold
        for (let i = 0; i < numClouds; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'nebula-cloud';
            const size = getRandom(200, 500);
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size * 0.7}px`; // More elliptical
            cloud.style.left = `${getRandom(0, 100)}vw`;
            cloud.style.top = `${getRandom(0, 100)}vh`;
            cloud.style.animationDelay = `${getRandom(0, 10)}s`;
            cloud.style.setProperty('--cloud-color', cloudColors[Math.floor(getRandom(0, cloudColors.length))]);
            cloud.style.setProperty('--cloud-blur', `${getRandom(80, 150)}px`);
            cloud.style.setProperty('--cloud-opacity', `${getRandom(0.1, 0.3)}`);
            cloud.style.setProperty('--cloud-duration', `${getRandom(30, 60)}s`);
            cloud.style.setProperty('--cloud-x', `${getRandom(-50, 50)}vw`);
            cloud.style.setProperty('--cloud-y', `${getRandom(-50, 50)}vh`);
            cloud.style.setProperty('--cloud-dx', `${getRandom(-100, 100)}vw`);
            cloud.style.setProperty('--cloud-dy', `${getRandom(-100, 100)}vh`);
            cloud.style.setProperty('--cloud-scale', `${getRandom(0.8, 1.5)}`);
            backgroundElements.appendChild(cloud);
        }

        // --- Wind Gusts ---
        const numGusts = 5;
        for (let i = 0; i < numGusts; i++) {
            const gust = document.createElement('div');
            gust.className = 'wind-gust';
            gust.style.top = `${getRandom(0, 100)}vh`;
            gust.style.animationDelay = `${getRandom(0, 15)}s`;
            gust.style.setProperty('--gust-opacity', `${getRandom(0.05, 0.2)}`);
            gust.style.setProperty('--gust-height', `${getRandom(1, 3)}px`);
            gust.style.setProperty('--gust-width', `${getRandom(200, 500)}px`);
            gust.style.setProperty('--gust-blur', `${getRandom(0, 2)}px`);
            gust.style.setProperty('--gust-duration', `${getRandom(10, 25)}s`);
            backgroundElements.appendChild(gust);
        }

        // --- Flying Wings ---
        const numWings = 6;
        const wingColors = ['#fff', '#FFD1DC']; // White, Light Pink
        for (let i = 0; i < numWings; i++) {
            const wing = document.createElement('div');
            wing.className = 'flying-wing';
            const size = getRandom(20, 50);
            wing.style.width = `${size}px`;
            wing.style.height = `${size * 0.6}px`; // Wing aspect ratio
            wing.style.animationDelay = `${getRandom(0, 20)}s`;
            wing.style.setProperty('--wing-color', wingColors[Math.floor(getRandom(0, wingColors.length))]);
            wing.style.setProperty('--wing-opacity', `${getRandom(0.2, 0.6)}`);
            wing.style.setProperty('--wing-duration', `${getRandom(15, 30)}s`);
            wing.style.setProperty('--wing-scale', `${getRandom(0.8, 1.2)}`);
            wing.style.setProperty('--wing-rotation', `${getRandom(0, 360)}deg`);
            wing.style.setProperty('--wing-x', `${getRandom(0, 100)}vw`);
            wing.style.setProperty('--wing-y', `${getRandom(0, 100)}vh`);
            wing.style.setProperty('--wing-dx', `${getRandom(-80, 80)}vw`);
            wing.style.setProperty('--wing-dy', `${getRandom(-80, 80)}vh`);
            backgroundElements.appendChild(wing);
        }

        // --- Shooting Stars ---
        const numShootingStars = 3;
        for (let i = 0; i < numShootingStars; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.animationDelay = `${getRandom(0, 20)}s`;
            shootingStar.style.setProperty('--shoot-duration', `${getRandom(2, 5)}s`);
            shootingStar.style.setProperty('--start-x', `${getRandom(10, 90)}vw`);
            shootingStar.style.setProperty('--start-y', `${getRandom(10, 90)}vh`);
            shootingStar.style.setProperty('--shoot-angle', `${getRandom(-45, 45)}deg`); // Angle of fall
            shootingStar.style.setProperty('--end-x', `${getRandom(-20, 120)}vw`);
            shootingStar.style.setProperty('--end-y', `${getRandom(-20, 120)}vh`);
            backgroundElements.appendChild(shootingStar);
        }
    }

    // Preloader and Content Reveal Logic
    const preloader = document.getElementById('preloader');
    const mainContainer = document.querySelector('.container');
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');
    let loadProgress = 0;
    const totalLoadSteps = 100; // Represents 100%

    // Function to update the preloader progress bar
    function updateProgressBar() {
        if (indexProgressBar && indexProgressText) {
            loadProgress += getRandom(1, 5); // Simulate loading
            if (loadProgress > 100) loadProgress = 100;
            indexProgressBar.style.width = `${loadProgress}%`;
            indexProgressText.textContent = `${Math.floor(loadProgress)}%`;
            if (loadProgress < 100) {
                requestAnimationFrame(updateProgressBar);
            } else {
                // Once loading is complete, reveal content
                revealContent();
            }
        } else {
            // If preloader elements are not found, reveal content immediately
            revealContent();
        }
    }

    // Function to reveal main content and handle text animations
    function revealContent() {
        if (preloader) {
            // Stop any ongoing progress bar animation
            if (indexProgressBar) {
                indexProgressBar.style.transition = 'none'; // Stop transition for immediate width set
                indexProgressBar.style.width = '100%';
            }
            if (indexProgressText) {
                indexProgressText.textContent = '100%';
            }

            preloader.classList.add('hidden');
            // Remove preloader from DOM after transition for performance
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
                document.body.style.overflow = ''; // Restore scroll if it was hidden
            }, { once: true });
        }

        if (mainContainer) {
            mainContainer.classList.add('visible-content');

            // === STAGGERED TEXT REVEAL FOR ALL PAGES ===
            // Target specific text and button elements for staggered animation.
            // This selector covers elements on both index.html and page3.html
            const contentElements = mainContainer.querySelectorAll('h1, h2, p, .confession-prelude, .confession-main, .section-break, .button-container .button');

            contentElements.forEach((el, index) => {
                // Remove any existing inline opacity or animation for clean re-application
                el.style.opacity = '';
                el.style.animation = 'none';
                // Trigger reflow to apply 'none' before applying new animation
                void el.offsetWidth; 

                // Apply fadeIn animation with a staggered delay
                // The 0.5s initial delay ensures the preloader fade-out starts first
                const delay = 0.5 + index * 0.15; // Staggered delay for each element
                
                if (el.classList.contains('confession-main')) {
                    // For the main confession, apply fadeIn and then the pulseGlow
                    el.style.animation = `fadeIn 0.8s ease-out forwards ${delay}s, pulseGlow 3s ease-in-out infinite alternate ${delay + 0.8}s`;
                } else {
                    el.style.animation = `fadeIn 0.8s ease-out forwards ${delay}s`;
                }
            });
        }
    }

    // Start the preloader progress when content is loaded
    initializeBackgroundEffects(); // Generate background elements immediately
    updateProgressBar(); // Start preloader animation

    // Music Play/Pause Button Logic
    const musicPlayButton = document.getElementById('music-play-button');
    if (musicPlayButton) {
        // You would typically link an audio element here
        // const backgroundMusic = document.getElementById('background-music-audio'); 
        musicPlayButton.addEventListener('click', () => {
            // Placeholder for music toggle logic
            // if (backgroundMusic.paused) {
            //     backgroundMusic.play();
            //     musicPlayButton.textContent = '❚❚'; // Pause icon
            // } else {
            //     backgroundMusic.pause();
            //     musicPlayButton.textContent = '▶'; // Play icon
            // }
            musicPlayButton.classList.toggle('playing'); // Visual indicator
            console.log("Music play/pause toggled!"); // For demonstration
        });
    }

    // Button Evasion Logic (if you have buttons with .button-container class)
    const buttonContainers = document.querySelectorAll('.button-container');
    buttonContainers.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const buttons = container.querySelectorAll('.button');
            buttons.forEach(button => {
                const rect = button.getBoundingClientRect();
                const btnCenterX = rect.left + rect.width / 2;
                const btnCenterY = rect.top + rect.height / 2;

                const deltaX = e.clientX - btnCenterX;
                const deltaY = e.clientY - btnCenterY;

                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                const evadeRadius = 150; // Distance from button to start evading
                const moveStrength = 20; // How much the button moves

                if (distance < evadeRadius) {
                    const angle = Math.atan2(deltaY, deltaX);
                    const evadeX = -Math.cos(angle) * (evadeRadius - distance) / evadeRadius * moveStrength;
                    const evadeY = -Math.sin(angle) * (evadeRadius - distance) / evadeRadius * moveStrength;

                    button.style.transform = `translate(${evadeX}px, ${evadeY}px)`;
                } else {
                    button.style.transform = 'translate(0, 0)';
                }
            });
        });

        container.addEventListener('mouseleave', () => {
            const buttons = container.querySelectorAll('.button');
            buttons.forEach(button => {
                button.style.transform = 'translate(0, 0)'; // Reset position on mouse leave
            });
        });
    });

});
