document.addEventListener('DOMContentLoaded', () => {
    // Function to generate a random number within a range
    const getRandom = (min, max) => Math.random() * (max - min) + min;

    // Background Elements Initialization (dynamic generation based on CSS)
    function initializeBackgroundEffects() {
        // Ensure background-elements container exists or create it
        let backgroundElements = document.querySelector('.background-elements');
        if (!backgroundElements) {
            backgroundElements = document.createElement('div');
            backgroundElements.className = 'background-elements';
            document.body.prepend(backgroundElements); // Add to the beginning of the body
        } else {
            // Clear existing elements if function is called multiple times
            backgroundElements.innerHTML = '';
        }

        // --- Stars ---
        const numStars = 150; // Increased stars for more density
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = getRandom(1, 4); // Slightly larger stars
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${getRandom(0, 100)}vw`;
            star.style.top = `${getRandom(0, 100)}vh`;
            star.style.animationDelay = `${getRandom(0, 8)}s`; // More varied delays
            star.style.setProperty('--star-drift-duration', `${getRandom(25, 50)}s`); // Longer drift durations
            star.style.setProperty('--star-drift-x', `${getRandom(-30, 30)}vw`);
            star.style.setProperty('--star-drift-y', `${getRandom(-30, 30)}vh`);
            backgroundElements.appendChild(star);
        }

        // --- Ethereal Glows ---
        const numGlows = 10; // More glows
        for (let i = 0; i < numGlows; i++) {
            const glow = document.createElement('div');
            glow.className = 'ethereal-glow';
            const size = getRandom(150, 400); // Larger glows
            glow.style.width = `${size}px`;
            glow.style.height = `${size}px`;
            glow.style.left = `${getRandom(0, 100)}vw`;
            glow.style.top = `${getRandom(0, 100)}vh`;
            glow.style.animationDelay = `${getRandom(0, 7)}s`;
            glow.style.setProperty('--glow-duration', `${getRandom(20, 40)}s`);
            glow.style.setProperty('--glow-scale', `${getRandom(0.9, 1.3)}`);
            glow.style.setProperty('--x', `${getRandom(0, 100)}`);
            glow.style.setProperty('--y', `${getRandom(0, 100)}`);
            glow.style.setProperty('--dx', `${getRandom(-40, 40)}`);
            glow.style.setProperty('--dy', `${getRandom(-40, 40)}`);
            backgroundElements.appendChild(glow);
        }

        // --- Particles ---
        const numParticles = 80; // More particles
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = getRandom(2, 6); // Slightly larger particles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.setProperty('--p-x', `${getRandom(0, 100)}vw`);
            particle.style.setProperty('--p-y', `${getRandom(0, 100)}vh`);
            particle.style.setProperty('--p-dx', `${getRandom(-70, 70)}px`); // Wider drift
            particle.style.setProperty('--p-dy', `${getRandom(-70, 70)}px`);
            particle.style.setProperty('--p-scale', `${getRandom(0.7, 1.8)}`);
            particle.style.setProperty('--p-duration', `${getRandom(7, 18)}s`); // Longer durations
            particle.style.animationDelay = `${getRandom(0, 12)}s`;
            backgroundElements.appendChild(particle);
        }

        // --- Moon ---
        const moon = document.createElement('div');
        moon.className = 'moon';
        moon.style.width = '180px'; // Slightly larger moon
        moon.style.height = '180px';
        moon.style.left = `5vw`; // Explicitly top-left corner
        moon.style.top = `5vh`;  // Explicitly top-left corner
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
        const numOrbs = 10; // More orbs
        const orbColors = ['#FF69B1', '#8A2BE2', '#FFD700', '#ADD8E6', '#e0e0e0']; // Added white/light
        for (let i = 0; i < numOrbs; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            const size = getRandom(100, 250); // Larger orbs
            orb.style.width = `${size}px`;
            orb.style.height = `${size}px`;
            orb.style.left = `${getRandom(0, 100)}vw`;
            orb.style.top = `${getRandom(0, 100)}vh`;
            orb.style.animationDelay = `${getRandom(0, 9)}s`;
            orb.style.setProperty('--orb-color', orbColors[Math.floor(getRandom(0, orbColors.length))]);
            orb.style.setProperty('--orb-blur', `${getRandom(40, 80)}px`); // Stronger blur
            orb.style.setProperty('--orb-opacity', `${getRandom(0.15, 0.5)}`); // More visible
            orb.style.setProperty('--orb-duration', `${getRandom(25, 50)}s`);
            orb.style.setProperty('--orb-pulse-duration', `${getRandom(4, 8)}s`);
            orb.style.setProperty('--orb-x', `${getRandom(0, 100)}`);
            orb.style.setProperty('--orb-y', `${getRandom(0, 100)}`);
            orb.style.setProperty('--orb-dx', `${getRandom(-50, 50)}`);
            orb.style.setProperty('--orb-dy', `${getRandom(-50, 50)}`);
            orb.style.setProperty('--orb-scale', `${getRandom(0.9, 1.5)}`);
            backgroundElements.appendChild(orb);
        }

        // --- Nebula Clouds ---
        const numClouds = 7; // More clouds
        const cloudColors = ['rgba(138,43,226,0.7)', 'rgba(255,105,180,0.7)', 'rgba(255,215,0,0.7)', 'rgba(173,216,230,0.7)']; // Brighter, added light blue
        for (let i = 0; i < numClouds; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'nebula-cloud';
            const size = getRandom(300, 600); // Larger clouds
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size * 0.7}px`; // More elliptical
            cloud.style.left = `${getRandom(0, 100)}vw`;
            cloud.style.top = `${getRandom(0, 100)}vh`;
            cloud.style.animationDelay = `${getRandom(0, 12)}s`;
            cloud.style.setProperty('--cloud-color', cloudColors[Math.floor(getRandom(0, cloudColors.length))]);
            cloud.style.setProperty('--cloud-blur', `${getRandom(100, 200)}px`); // Stronger blur
            cloud.style.setProperty('--cloud-opacity', `${getRandom(0.2, 0.4)}`); // More visible
            cloud.style.setProperty('--cloud-duration', `${getRandom(40, 80)}s`);
            cloud.style.setProperty('--cloud-x', `${getRandom(-70, 70)}vw`);
            cloud.style.setProperty('--cloud-y', `${getRandom(-70, 70)}vh`);
            cloud.style.setProperty('--cloud-dx', `${getRandom(-120, 120)}vw`);
            cloud.style.setProperty('--cloud-dy', `${getRandom(-120, 120)}vh`);
            cloud.style.setProperty('--cloud-scale', `${getRandom(1, 1.8)}`);
            backgroundElements.appendChild(cloud);
        }

        // --- Wind Gusts ---
        const numGusts = 8; // More gusts
        for (let i = 0; i < numGusts; i++) {
            const gust = document.createElement('div');
            gust.className = 'wind-gust';
            gust.style.top = `${getRandom(0, 100)}vh`;
            gust.style.animationDelay = `${getRandom(0, 18)}s`;
            gust.style.setProperty('--gust-opacity', `${getRandom(0.1, 0.3)}`); // More visible
            gust.style.setProperty('--gust-height', `${getRandom(2, 4)}px`); // Thicker gusts
            gust.style.setProperty('--gust-width', `${getRandom(300, 700)}px`); // Longer gusts
            gust.style.setProperty('--gust-blur', `${getRandom(1, 3)}px`);
            gust.style.setProperty('--gust-duration', `${getRandom(15, 30)}s`);
            backgroundElements.appendChild(gust);
        }

        // --- Flying Wings ---
        const numWings = 10; // More wings
        const wingColors = ['#fff', '#FFD1DC', '#FFB6C1']; // White, Light Pink, Hot Pink
        for (let i = 0; i < numWings; i++) {
            const wing = document.createElement('div');
            wing.className = 'flying-wing';
            const size = getRandom(30, 70); // Larger wings
            wing.style.width = `${size}px`;
            wing.style.height = `${size * 0.6}px`;
            wing.style.animationDelay = `${getRandom(0, 25)}s`;
            wing.style.setProperty('--wing-color', wingColors[Math.floor(getRandom(0, wingColors.length))]);
            wing.style.setProperty('--wing-opacity', `${getRandom(0.3, 0.7)}`); // More visible
            wing.style.setProperty('--wing-duration', `${getRandom(20, 40)}s`);
            wing.style.setProperty('--wing-scale', `${getRandom(0.9, 1.5)}`);
            wing.style.setProperty('--wing-rotation', `${getRandom(0, 360)}deg`);
            wing.style.setProperty('--wing-x', `${getRandom(0, 100)}vw`);
            wing.style.setProperty('--wing-y', `${getRandom(0, 100)}vh`);
            wing.style.setProperty('--wing-dx', `${getRandom(-100, 100)}vw`);
            wing.style.setProperty('--wing-dy', `${getRandom(-100, 100)}vh`);
            backgroundElements.appendChild(wing);
        }

        // --- Shooting Stars ---
        const numShootingStars = 5; // More shooting stars
        for (let i = 0; i < numShootingStars; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.animationDelay = `${getRandom(0, 25)}s`;
            shootingStar.style.setProperty('--shoot-duration', `${getRandom(3, 6)}s`); // Longer duration
            shootingStar.style.setProperty('--start-x', `${getRandom(10, 90)}vw`);
            shootingStar.style.setProperty('--start-y', `${getRandom(10, 90)}vh`);
            shootingStar.style.setProperty('--shoot-angle', `${getRandom(-60, 60)}deg`); // Wider angle
            shootingStar.style.setProperty('--end-x', `${getRandom(-30, 130)}vw`);
            shootingStar.style.setProperty('--end-y', `${getRandom(-30, 130)}vh`);
            backgroundElements.appendChild(shootingStar);
        }
    }

    // Preloader and Content Reveal Logic
    const preloader = document.getElementById('preloader');
    const mainContainer = document.querySelector('.container');
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');
    const preloaderMessage = document.querySelector('.preloader-message');

    let loadProgress = 0;
    // const totalLoadSteps = 100; // Represents 100%

    // Function to update the preloader progress bar
    function updateProgressBar() {
        if (indexProgressBar && indexProgressText) {
            loadProgress += getRandom(2, 7); // Simulate loading faster
            if (loadProgress > 100) loadProgress = 100;
            indexProgressBar.style.width = `${loadProgress}%`;
            indexProgressText.textContent = `${Math.floor(loadProgress)}%`;

            if (loadProgress < 100) {
                requestAnimationFrame(updateProgressBar);
            } else {
                // Once loading is complete, reveal content
                setTimeout(revealContent, 500); // Small delay after 100%
            }
        } else {
            // If preloader elements are not found, reveal content immediately
            revealContent();
        }
    }

    // Function to animate preloader message words
    function animatePreloaderMessage() {
        if (!preloaderMessage) return;

        const text = preloaderMessage.textContent;
        preloaderMessage.innerHTML = ''; // Clear original text

        // Split text into words and wrap them in spans
        text.split(' ').forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word + ' '; // Add space back
            wordSpan.classList.add('word-animated');
            wordSpan.style.animationDelay = `${0.2 + wordIndex * 0.1}s`; // Stagger words
            preloaderMessage.appendChild(wordSpan);
        });

        // Make the container visible after words are added
        preloaderMessage.style.opacity = 1;
        // Trigger reflow for animation to apply
        void preloaderMessage.offsetWidth;
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
                // Ensure elements are initially hidden by CSS, then animate in
                // If they are already hidden by default CSS, no need to set inline style
                el.style.animation = 'none'; // Reset animation
                void el.offsetWidth; // Trigger reflow

                // Apply fadeIn or fadeInSlideUp with a staggered delay
                const delay = 0.8 + index * 0.18; // Increased initial delay and stagger for smoother reveal
                
                if (el.tagName === 'H1' || el.tagName === 'H2') {
                    el.style.animation = `fadeInSlideUp 1s ease-out forwards ${delay}s`;
                } else if (el.classList.contains('confession-main')) {
                    el.style.animation = `fadeIn 1s ease-out forwards ${delay}s, pulseGlow 3s ease-in-out infinite alternate ${delay + 1}s`;
                } else {
                    el.style.animation = `fadeIn 1s ease-out forwards ${delay}s`;
                }
            });
        }
    }

    // Start the preloader and background effects when content is loaded
    initializeBackgroundEffects(); // Generate background elements immediately
    animatePreloaderMessage(); // Start preloader message animation
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

    // Removed the button evasion logic as requested.
});
