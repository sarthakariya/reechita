// Ensure showTransitionPreloader is globally accessible immediately
window.showTransitionPreloader = function(targetPage) {
    const preloaderDiv = document.createElement('div');
    preloaderDiv.id = 'dynamic-transition-preloader'; // Use a unique ID to avoid conflict with static HTML element
    preloaderDiv.classList.add('transition-preloader');
    preloaderDiv.innerHTML = `
        <div class="preloader-dual-hearts">
            <div class="heart heart-left"></div>
            <div class="heart heart-right"></div>
        </div>
        <div class="transition-preloader-message">Transitioning...</div>
    `;
    document.body.appendChild(preloaderDiv);

    preloaderDiv.offsetWidth; // Force reflow to apply initial styles before transition

    // Call the function to animate the dual hearts
    createDualHearts(preloaderDiv.querySelector('.preloader-dual-hearts'));

    preloaderDiv.classList.add('active'); // Activate CSS transition

    // Redirect after the preloader animation has had time to play
    setTimeout(() => {
        window.location.href = targetPage;
    }, 4700); // This delay is crucial for the heart animation to complete!
};

// NEW Function: Create and Animate Dual Hearts for Transition Preloader
function createDualHearts(container) {
    const leftHeart = container.querySelector('.heart-left');
    const rightHeart = container.querySelector('.heart-right');

    // Initial positions for animation, includes the -45deg rotation from CSS
    leftHeart.style.transform = 'translateX(0) rotate(-45deg)'; // Starting position for the animation defined in CSS
    rightHeart.style.transform = 'translateX(0) rotate(-45deg)'; // Starting position for the animation defined in CSS
    leftHeart.style.opacity = '0';
    rightHeart.style.opacity = '0';

    // Animate them into view (fade in and slight initial movement if needed)
    setTimeout(() => {
        leftHeart.style.transition = 'opacity 0.8s ease-out';
        rightHeart.style.transition = 'opacity 0.8s ease-out';
        leftHeart.style.opacity = '1';
        rightHeart.style.opacity = '1';
    }, 50);

    // Apply the main "come closer" animation defined in style3.css (assuming style.css now)
    // The animation property should trigger the keyframes directly
    leftHeart.style.animation = 'heartComeCloserLeft 4.5s ease-in-out forwards';
    rightHeart.style.animation = 'heartComeCloserRight 4.5s ease-in-out forwards';

    // Add subtle pulse animations if desired, *after* the initial come-closer animation
    // These will loop indefinitely once the primary animation completes
    setTimeout(() => {
        leftHeart.style.animation += ', heartPulse 1.5s infinite alternate ease-in-out';
        rightHeart.style.animation += ', heartPulse 1.5s infinite alternate ease-in-out 0.2s';
    }, 4500); // Start pulse after come-closer animation finishes
}


document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.container');
    const backgroundElementsContainer = document.querySelector('.background-elements');
    const paragraphsAndHeadings = document.querySelectorAll('.container p, .container h1, .container h2, .container .question-text, .container .confession-prelude, .container .confession-main');
    const sections = document.querySelectorAll('.section-break, .button-container, .choice-buttons');
    const musicPlayButton = document.getElementById('music-play-button');
    const backgroundAudio = document.getElementById('backgroundMusic'); // Correctly reference the HTML audio element

    // Determine if it's the confession page to control text animation
    const isConfessionPage = window.location.pathname.includes('confession.html');

    // Ensure backgroundAudio exists before setting properties
    if (backgroundAudio) {
        backgroundAudio.loop = true;
        backgroundAudio.volume = 0.5;
    }


    // --- Dynamic Background Elements Initialization ---
    // Ensure the background container exists
    if (backgroundElementsContainer) {
        createStars(backgroundElementsContainer);
        createEtherealGlows(backgroundElementsContainer);
        createParticles(backgroundElementsContainer);
        createAuraGlows(backgroundElementsContainer);
        createStreaks(backgroundElementsContainer);
        createFloatingOrbs(backgroundElementsContainer);
        createNebulaClouds(backgroundElementsContainer);
        createWindGusts(backgroundElementsContainer);
        createFlyingWings(backgroundElementsContainer);
        createShootingStars(backgroundElementsContainer); // NEW: Shooting Stars
        createMoonAndScenery(backgroundElementsContainer); // NEW: Dynamic Moon and Scenery
        createCosmicDust(backgroundElementsContainer); // NEW: Cosmic Dust
        createFlickeringMotes(backgroundElementsContainer); // NEW: Flickering Motes
        createSwirlingWisps(backgroundElementsContainer); // NEW: Swirling Wisps
        createGentleFlares(backgroundElementsContainer); // NEW: Gentle Flares
    }

    // --- Music Playback Logic ---
    if (musicPlayButton && backgroundAudio) { // Only proceed if both elements exist
        const savedTime = localStorage.getItem('musicCurrentTime');
        let isPlaying = localStorage.getItem('musicIsPlaying') === 'true';

        if (savedTime) {
            backgroundAudio.currentTime = parseFloat(savedTime);
        }

        const playMusic = () => {
            backgroundAudio.play().catch(e => console.error("Autoplay prevented:", e));
            musicPlayButton.classList.add('playing');
            localStorage.setItem('musicIsPlaying', 'true');
            isPlaying = true;
        };

        const pauseMusic = () => {
            backgroundAudio.pause();
            musicPlayButton.classList.remove('playing');
            localStorage.setItem('musicIsPlaying', 'false');
            isPlaying = false;
        };

        if (isPlaying) {
            playMusic();
        }

        musicPlayButton.addEventListener('click', () => {
            if (backgroundAudio.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicCurrentTime', backgroundAudio.currentTime);
            localStorage.setItem('musicIsPlaying', isPlaying);
        });
    }


    // --- Preloader & Main Content Visibility (for index.html) ---
    const preloader = document.getElementById('preloader');
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');
    const preloaderMessageElement = document.getElementById('animatedPreloaderMessage');
    const preloaderHeart = document.querySelector('#preloader .preloader-single-heart');
    const originalPreloaderMessage = "Loading words directly from Sarthak's Heart... ✨💗";


    if (preloader) {
        // Initial state for entrance animation
        if (preloaderMessageElement) preloaderMessageElement.style.opacity = '0';
        if (indexProgressBar) indexProgressBar.parentNode.style.opacity = '0';
        if (preloaderHeart) preloaderHeart.style.opacity = '0';

        // Animate preloader elements in
        setTimeout(() => {
            if (preloaderHeart) {
                preloaderHeart.style.transition = 'opacity 0.8s ease-out';
                preloaderHeart.style.opacity = '1';
            }

            if (preloaderMessageElement) {
                preloaderMessageElement.textContent = '';
                preloaderMessageElement.style.opacity = '1';
                const words = originalPreloaderMessage.split(' ');
                let wordIndex = 0;
                const animateMessageInterval = setInterval(() => {
                    if (wordIndex < words.length) {
                        const span = document.createElement('span');
                        span.textContent = words[wordIndex] + (wordIndex < words.length - 1 ? ' ' : '');
                        span.classList.add('word-animated');
                        preloaderMessageElement.appendChild(span);
                        span.offsetWidth; // Trigger reflow
                        span.style.opacity = '1';
                        span.style.transform = 'scale(1)';
                        wordIndex++;
                    } else {
                        clearInterval(animateMessageInterval);
                    }
                }, 150);
            }

            if (indexProgressBar) {
                indexProgressBar.parentNode.style.transition = 'opacity 1s ease-out 0.4s';
                indexProgressBar.parentNode.style.opacity = '1';
            }
        }, 100);


        let loadProgress = 0;
        const totalLoadDuration = 5000; // 5 seconds in milliseconds
        const intervalTime = 50;
        const progressIncrement = 100 / (totalLoadDuration / intervalTime);

        const interval = setInterval(() => {
            loadProgress += progressIncrement;
            if (loadProgress > 100) loadProgress = 100;

            if (indexProgressBar) indexProgressBar.style.width = loadProgress + '%';
            if (indexProgressText) indexProgressText.textContent = `${Math.floor(loadProgress)}%`;

            if (loadProgress >= 100) {
                clearInterval(interval);
                preloader.classList.add('hidden');
                preloader.addEventListener('transitionend', () => preloader.remove());
                if (mainContainer) {
                    mainContainer.classList.add('visible-content');
                    staggerAnimations(); // Full stagger for index page
                }
            }
        }, intervalTime);
    } else if (mainContainer) {
        // If no preloader (e.g., on page2.html, page3.html, acknowledgement.html)
        mainContainer.classList.add('visible-content');
        if (isConfessionPage) {
            staggerSectionsAnimations(); // Only buttons/sections animate on confession page
        } else {
            staggerAnimations(); // Full stagger for other content pages
        }
    }

    // --- Staggered Paragraph and Section Animations (for various pages) ---
    // Make this function globally accessible for consistency
    window.staggerAnimations = function() {
        // Reset opacity/transform to allow re-animation if needed, or ensure initial hidden state
        paragraphsAndHeadings.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(10px)'; // Reset to initial state
            el.style.animation = 'none'; // Clear any previous animation
        });
        sections.forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'scale(0.8)'; // Reset for buttons
            section.style.animation = 'none';
        });

        if (paragraphsAndHeadings.length > 0) {
            paragraphsAndHeadings.forEach((el, index) => {
                el.style.animation = `fadeInSlideUp 0.8s ease-out forwards ${0.5 + index * 0.15}s`;
            });
        }

        if (sections.length > 0) {
            sections.forEach((section, index) => {
                const isButtonSection = section.classList.contains('button-container') || section.classList.contains('choice-buttons');
                const baseDelay = paragraphsAndHeadings.length > 0 ? 0.5 + paragraphsAndHeadings.length * 0.15 : 0.5;
                if (isButtonSection) {
                    section.style.animation = `buttonPopIn 1s ease-out forwards ${baseDelay + index * 0.2}s`;
                } else {
                    section.style.animation = `fadeInSlideUp 0.8s ease-out forwards ${baseDelay + index * 0.15}s`;
                }
            });
        }
    }

    // NEW FUNCTION: Staggered Section Animations (for pages like confession.html that don't need text animation)
    window.staggerSectionsAnimations = function() {
        // Reset styles for sections only
        sections.forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'scale(0.8)'; // Reset for buttons
            section.style.animation = 'none';
        });

        if (sections.length > 0) {
            sections.forEach((section, index) => {
                const isButtonSection = section.classList.contains('button-container') || section.classList.contains('choice-buttons');
                const baseDelay = 0.5; // Start delay from 0.5s as there's no preceding text animation
                if (isButtonSection) {
                    section.style.animation = `buttonPopIn 1s ease-out forwards ${baseDelay + index * 0.2}s`;
                } else {
                    // For other sections that might not be buttons but still exist on the page
                    section.style.animation = `fadeInSlideUp 0.8s ease-out forwards ${baseDelay + index * 0.15}s`;
                }
            });
        }
    }


    // --- page3.html (Confession Page) Specific Logic ---
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    // Helper function to move the no button away from the mouse
    function moveNoButton(buttonElement, containerElement, mouseEvent) {
        const moveDistance = 150; // How far to push the button away from the mouse pointer
        const containerRect = containerElement ? containerElement.getBoundingClientRect() : document.body.getBoundingClientRect();
        const buttonRect = buttonElement.getBoundingClientRect();

        let newX, newY;

        // Calculate direction vector from button center to mouse pointer
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        const deltaX = mouseEvent.clientX - buttonCenterX;
        const deltaY = mouseEvent.clientY - buttonCenterY;

        // Normalize the vector (make its length 1)
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        // Avoid division by zero if mouse is exactly at button center
        const normalizedDeltaX = distance === 0 ? 0 : deltaX / distance;
        const normalizedDeltaY = distance === 0 ? 0 : deltaY / distance;

        // Move in the *opposite* direction of the mouse
        newX = buttonRect.left - normalizedDeltaX * moveDistance;
        newY = buttonRect.top - normalizedDeltaY * moveDistance;

        // Boundary checks to keep button within container (or a reasonable area)
        const padding = 20; // Keep button 20px from container edges
        newX = Math.max(containerRect.left + padding, Math.min(newX, containerRect.right - buttonRect.width - padding));
        newY = Math.max(containerRect.top + padding, Math.min(newY, containerRect.bottom - buttonRect.height - padding));

        // Get current transform values to apply relative movement
        const currentTransform = getComputedStyle(buttonElement).transform;
        let currentTx = 0, currentTy = 0;
        if (currentTransform && currentTransform !== 'none') {
            const matrix = currentTransform.match(/matrix.*\((.+)\)/);
            if (matrix) {
                const values = matrix[1].split(', ').map(Number);
                currentTx = values[4];
                currentTy = values[5];
            }
        }

        // Calculate the translation needed from its current rendered position to the new desired position
        // This makes sure it moves relative to where it *currently* is, not just its original HTML position
        const transformX = (newX - buttonRect.left) + currentTx;
        const transformY = (newY - buttonRect.top) + currentTy;

        buttonElement.style.transition = 'transform 0.3s ease-out';
        buttonElement.style.transform = `translate(${transformX}px, ${transformY}px)`;
    }

    if (yesButton && noButton) {
        yesButton.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.add('success-theme');
            createFallingHearts();
            createFallingChocolates();
            setTimeout(() => {
                window.location.href = 'acknowledgement.html?response=yes'; // Redirect to acknowledgement.html
            }, 1000); // Small delay for animations
        });

        // Event listeners for "No" button
        noButton.addEventListener('click', (event) => {
            event.preventDefault();
            moveNoButton(noButton, mainContainer, event);
        });

        noButton.addEventListener('mouseover', (event) => {
            moveNoButton(noButton, mainContainer, event);
        });

        noButton.addEventListener('mouseout', () => {
            // Button stays in new position after mouse leaves.
            // You could add a slight bounce back here if desired, but "running away" implies it stays away.
        });
    }
}); // End DOMContentLoaded for main script

// --- Function for falling hearts animation ---
function createFallingHearts() {
    const heartCount = 40;
    const heartEmojis = ['💖', '✨', '❤️', '💕', '💫', '🧡', '💜', '💙'];

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.classList.add('falling-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const startX = Math.random() * 100;
        const startY = - (Math.random() * 200);
        const endX = startX + (Math.random() - 0.5) * 60;
        const rotateDeg = (Math.random() - 0.5) * 720;
        const size = Math.random() * 1.5 + 1;
        const duration = Math.random() * 8 + 5;
        const delay = Math.random() * 5;

        heart.style.cssText = `
            font-size: ${size}em;
            left: ${startX}vw;
            top: ${startY}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --start-x: 0vw;
            --end-x: ${endX - startX}vw;
            --rotate-deg: ${rotateDeg}deg;
        `;
        document.body.appendChild(heart);
    }
}

// NEW FUNCTION: Create Falling Chocolates
function createFallingChocolates() {
    const chocolateCount = 20;
    const chocolateEmojis = ['🍫', '🍬', '🍭', '🍪'];

    for (let i = 0; i < chocolateCount; i++) {
        const chocolate = document.createElement('span');
        chocolate.classList.add('falling-chocolate');
        chocolate.textContent = chocolateEmojis[Math.floor(Math.random() * chocolateEmojis.length)];

        const startX = Math.random() * 100;
        const startY = -(Math.random() * 100 + 50);
        const endX = startX + (Math.random() - 0.5) * 80;
        const rotateDeg = (Math.random() - 0.5) * 1080;
        const size = Math.random() * 1.5 + 1;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 3;

        chocolate.style.cssText = `
            font-size: ${size}em;
            left: ${startX}vw;
            top: ${startY}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --start-x: 0vw;
            --end-x: ${endX - startX}vw;
            --rotate-deg: ${rotateDeg}deg;
        `;
        document.body.appendChild(chocolate);
    }
}


// --- Functions to create dynamic background elements (FULL IMPLEMENTATION) ---

function createStars(container) {
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 0.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.setProperty('--star-drift-duration', `${Math.random() * 60 + 30}s`);
        star.style.setProperty('--star-drift-x', `${(Math.random() - 0.5) * 20}vw`);
        star.style.setProperty('--star-drift-y', `${(Math.random() - 0.5) * 20}vh`);
        container.appendChild(star);
    }
}

function createEtherealGlows(container) {
    const numGlows = 8;
    for (let i = 0; i < numGlows; i++) {
        const glow = document.createElement('div');
        glow.classList.add('ethereal-glow');
        const size = Math.random() * 150 + 100;
        glow.style.width = `${size}px`;
        glow.style.height = `${size}px`;
        glow.style.left = `${Math.random() * 100}vw`;
        glow.style.top = `${Math.random() * 100}vh`;
        glow.style.animationDelay = `${Math.random() * 10}s`;
        glow.style.setProperty('--glow-duration', `${Math.random() * 20 + 10}s`);
        glow.style.setProperty('--x', `${Math.random() * 100}`);
        glow.style.setProperty('--y', `${Math.random() * 100}`);
        glow.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}`);
        glow.style.setProperty('--dy', `${(Math.random() - 0.5) * 30}`);
        glow.style.setProperty('--glow-scale', `${Math.random() * 0.5 + 0.8}`);
        container.appendChild(glow);
    }
}

function createParticles(container) {
    const numParticles = 80;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.setProperty('--p-duration', `${Math.random() * 15 + 5}s`);
        particle.style.setProperty('--p-x', `${Math.random() * 100}vw`);
        particle.style.setProperty('--p-y', `${Math.random() * 100}vh`);
        particle.style.setProperty('--p-dx', `${(Math.random() - 0.5) * 50}vw`);
        particle.style.setProperty('--p-dy', `${(Math.random() - 0.5) * 50}vh`);
        particle.style.setProperty('--p-scale', `${Math.random() * 0.5 + 0.7}`);
        container.appendChild(particle);
    }
}

// NEW FUNCTION: Cosmic Dust (as per previous discussion)
function createCosmicDust(container) {
    const numDust = 50;
    for (let i = 0; i < numDust; i++) {
        const dust = document.createElement('div');
        dust.classList.add('cosmic-dust');
        const size = Math.random() * 2 + 0.5;
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        dust.style.left = `${Math.random() * 100}vw`;
        dust.style.top = `${Math.random() * 100}vh`;
        dust.style.animationDelay = `${Math.random() * 15}s`;
        dust.style.setProperty('--dust-dx', `${(Math.random() - 0.5) * 200}px`);
        dust.style.setProperty('--dust-dy', `${(Math.random() - 0.5) * 200}px`);
        container.appendChild(dust);
    }
}


function createAuraGlows(container) {
    const numAuras = 5;
    for (let i = 0; i < numAuras; i++) {
        const aura = document.createElement('div');
        aura.classList.add('aura-glow');
        const size = Math.random() * 200 + 250;
        aura.style.width = `${size}px`;
        aura.style.height = `${size}px`;
        aura.style.left = `${Math.random() * 100}vw`;
        aura.style.top = `${Math.random() * 100}vh`;
        aura.style.animationDelay = `${Math.random() * 15}s`;
        aura.style.setProperty('--aura-drift-duration', `${Math.random() * 30 + 20}s`);
        aura.style.setProperty('--adx', `${(Math.random() - 0.5) * 40}vw`);
        aura.style.setProperty('--ady', `${(Math.random() - 0.5) * 40}vh`);
        container.appendChild(aura);
    }
}

function createStreaks(container) {
    const numStreaks = 10;
    for (let i = 0; i < numStreaks; i++) {
        const streak = document.createElement('div');
        streak.classList.add('streak');
        streak.style.left = `${-20 - Math.random() * 80}vw`;
        streak.style.top = `${Math.random() * 100}vh`;
        streak.style.animationDelay = `${Math.random() * 10}s`;
        streak.style.setProperty('--streak-duration', `${Math.random() * 10 + 5}s`);
        container.appendChild(streak);
    }
}

function createFloatingOrbs(container) {
    const numOrbs = 15;
    const colors = ['#FFD1DC', '#ADD8E6', '#DA70D6', '#98FB98'];
    for (let i = 0; i < numOrbs; i++) {
        const orb = document.createElement('div');
        orb.classList.add('floating-orb');
        const size = Math.random() * 30 + 10;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.left = `${Math.random() * 100}vw`;
        orb.style.top = `${Math.random() * 100}vh`;
        orb.style.animationDelay = `${Math.random() * 7}s`;
        orb.style.setProperty('--orb-color', colors[Math.floor(Math.random() * colors.length)]);
        orb.style.setProperty('--orb-blur', `${Math.random() * 10 + 5}px`);
        orb.style.setProperty('--orb-opacity', `${Math.random() * 0.4 + 0.3}`);
        orb.style.setProperty('--orb-duration', `${Math.random() * 15 + 10}s`);
        orb.style.setProperty('--orb-pulse-duration', `${Math.random() * 5 + 3}s`);
        orb.style.setProperty('--orb-x', `${Math.random() * 100}vw`);
        orb.style.setProperty('--orb-y', `${Math.random() * 100}vh`);
        orb.style.setProperty('--orb-dx', `${(Math.random() - 0.5) * 20}vw`);
        orb.style.setProperty('--orb-dy', `${(Math.random() - 0.5) * 20}vh`);
        orb.style.setProperty('--orb-scale', `${Math.random() * 0.5 + 0.8}`);
        container.appendChild(orb);
    }
}

function createNebulaClouds(container) {
    const numClouds = 5;
    const cloudColors = ['rgba(138, 43, 226, 0.2)', 'rgba(255, 105, 180, 0.2)', 'rgba(255, 215, 0, 0.15)'];
    for (let i = 0; i < numClouds; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('nebula-cloud');
        const size = Math.random() * 300 + 400;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size}px`;
        cloud.style.left = `${Math.random() * 100}vw`;
        cloud.style.top = `${Math.random() * 100}vh`;
        cloud.style.animationDelay = `${Math.random() * 20}s`;
        cloud.style.setProperty('--cloud-color', cloudColors[Math.floor(Math.random() * cloudColors.length)]);
        cloud.style.setProperty('--cloud-blur', `${Math.random() * 80 + 50}px`);
        cloud.style.setProperty('--cloud-opacity', `${Math.random() * 0.2 + 0.1}`);
        cloud.style.setProperty('--cloud-duration', `${Math.random() * 40 + 30}s`);
        cloud.style.setProperty('--cloud-x', `${Math.random() * 100}vw`);
        cloud.style.setProperty('--cloud-y', `${Math.random() * 100}vh`);
        cloud.style.setProperty('--cloud-dx', `${(Math.random() - 0.5) * 50}vw`);
        cloud.style.setProperty('--cloud-dy', `${(Math.random() - 0.5) * 50}vh`);
        cloud.style.setProperty('--cloud-scale', `${Math.random() * 0.5 + 0.8}`);
        container.appendChild(cloud);
    }
}

function createWindGusts(container) {
    const numGusts = 7;
    for (let i = 0; i < numGusts; i++) {
        const gust = document.createElement('div');
        gust.classList.add('wind-gust');
        gust.style.left = `${-20 - Math.random() * 80}vw`;
        gust.style.top = `${Math.random() * 100}vh`;
        gust.style.animationDelay = `${Math.random() * 8}s`;
        gust.style.setProperty('--gust-opacity', `${Math.random() * 0.2 + 0.1}`);
        gust.style.setProperty('--gust-height', `${Math.random() * 3 + 1}px`);
        gust.style.setProperty('--gust-width', `${Math.random() * 300 + 200}px`);
        gust.style.setProperty('--gust-blur', `${Math.random() * 3 + 1}px`);
        gust.style.setProperty('--gust-duration', `${Math.random() * 10 + 5}s`);
        container.appendChild(gust);
    }
}

function createFlyingWings(container) {
    const numWings = 8;
    const wingColors = ['rgba(255,255,255,0.1)', 'rgba(255,215,0,0.1)', 'rgba(255,105,180,0.1)'];
    for (let i = 0; i < numWings; i++) {
        const wing = document.createElement('div');
        wing.classList.add('flying-wing');
        const size = Math.random() * 40 + 30;
        wing.style.width = `${size}px`;
        wing.style.height = `${size}px`;
        wing.style.left = `${Math.random() * 100}vw`;
        wing.style.top = `${Math.random() * 100}vh`;
        wing.style.animationDelay = `${Math.random() * 10}s`;
        wing.style.setProperty('--wing-color', wingColors[Math.floor(Math.random() * wingColors.length)]);
        wing.style.setProperty('--wing-opacity', `${Math.random() * 0.2 + 0.05}`);
        wing.style.setProperty('--wing-duration', `${Math.random() * 20 + 15}s`);
        wing.style.setProperty('--wing-x', `${Math.random() * 100}vw`);
        wing.style.setProperty('--wing-y', `${Math.random() * 100}vh`);
        wing.style.setProperty('--wing-dx', `${(Math.random() - 0.5) * 60}vw`);
        wing.style.setProperty('--wing-dy', `${(Math.random() - 0.5) * 60}vh`);
        wing.style.setProperty('--wing-scale', `${Math.random() * 0.5 + 0.7}`);
        wing.style.setProperty('--wing-rotation', `${Math.random() * 360}deg`);
        container.appendChild(wing);
    }
}

function createShootingStars(container) {
    const numShootingStars = 5;
    for (let i = 0; i < numShootingStars; i++) {
        const star = document.createElement('div');
        star.classList.add('shooting-star');

        const startX = Math.random() * 120 - 20;
        const startY = Math.random() * 100;
        const angle = Math.random() * 45 + 15;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 15 + 5;

        const distance = duration * 400;
        const endX = startX + distance * Math.cos(angle * Math.PI / 180);
        const endY = startY + distance * Math.sin(angle * Math.PI / 180);

        star.style.setProperty('--start-x', `${startX}vw`);
        star.style.setProperty('--start-y', `${startY}vh`);
        star.style.setProperty('--end-x', `${endX}vw`);
        star.style.setProperty('--end-y', `${endY}vh`);
        star.style.setProperty('--shoot-angle', `${angle}deg`);
        star.style.setProperty('--shoot-duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;
        container.appendChild(star);
    }
}

function createMoonAndScenery(container) {
    const moon = document.createElement('div');
    moon.classList.add('moon');
    const moonSize = Math.random() * 100 + 150;
    moon.style.width = `${moonSize}px`;
    moon.style.height = `${moonSize}px`;
    moon.style.left = `${Math.random() * 20 + 5}vw`;
    moon.style.top = `${Math.random() * 15 + 5}vh`;
    container.appendChild(moon);

    const scenery = document.createElement('div');
    scenery.classList.add('distant-scenery');
    container.appendChild(scenery);

    const water = document.createElement('div');
    water.classList.add('water-shimmer');
    container.appendChild(water);
}

// NEW FUNCTION: Flickering Motes
function createFlickeringMotes(container) {
    const numMotes = 150;
    for (let i = 0; i < numMotes; i++) {
        const mote = document.createElement('div');
        mote.classList.add('flickering-mote');
        const size = Math.random() * 1.5 + 0.5;
        mote.style.width = `${size}px`;
        mote.style.height = `${size}px`;
        mote.style.left = `${Math.random() * 100}vw`;
        mote.style.top = `${Math.random() * 100}vh`;
        mote.style.animationDelay = `${Math.random() * 8}s`;
        mote.style.setProperty('--mote-duration', `${Math.random() * 15 + 5}s`);
        mote.style.setProperty('--mote-flicker-duration', `${Math.random() * 3 + 1}s`);
        mote.style.setProperty('--mote-start-x', `${(Math.random() - 0.5) * 10}vw`);
        mote.style.setProperty('--mote-start-y', `${(Math.random() - 0.5) * 10}vh`);
        mote.style.setProperty('--mote-end-x', `${(Math.random() - 0.5) * 20}vw`);
        mote.style.setProperty('--mote-end-y', `${(Math.random() - 0.5) * 20}vh`);
        container.appendChild(mote);
    }
}

// NEW FUNCTION: Swirling Wisps
function createSwirlingWisps(container) {
    const numWisps = 10;
    for (let i = 0; i < numWisps; i++) {
        const wisp = document.createElement('div');
        wisp.classList.add('swirling-wisp');
        const size = Math.random() * 200 + 100;
        wisp.style.width = `${size}px`;
        wisp.style.height = `${size * 0.5}px`;
        wisp.style.left = `${Math.random() * 100}vw`;
        wisp.style.top = `${Math.random() * 100}vh`;
        wisp.style.animationDelay = `${Math.random() * 12}s`;
        wisp.style.setProperty('--wisp-duration', `${Math.random() * 25 + 15}s`);
        wisp.style.setProperty('--wisp-pulse-duration', `${Math.random() * 7 + 3}s`);
        wisp.style.setProperty('--wisp-start-x', `${(Math.random() - 0.5) * 30}vw`);
        wisp.style.setProperty('--wisp-start-y', `${(Math.random() - 0.5) * 30}vh`);
        wisp.style.setProperty('--wisp-end-x', `${(Math.random() - 0.5) * 50}vw`);
        wisp.style.setProperty('--wisp-end-y', `${(Math.random() - 0.5) * 50}vh`);
        container.appendChild(wisp);
    }
}

// NEW FUNCTION: Gentle Flares
function createGentleFlares(container) {
    const numFlares = 5;
    for (let i = 0; i < numFlares; i++) {
        const flare = document.createElement('div');
        flare.classList.add('gentle-flare');
        const size = Math.random() * 400 + 300;
        flare.style.width = `${size}px`;
        flare.style.height = `${size}px`;
        flare.style.left = `${Math.random() * 100}vw`;
        flare.style.top = `${Math.random() * 100}vh`;
        flare.style.animationDelay = `${Math.random() * 20}s`;
        flare.style.setProperty('--flare-duration', `${Math.random() * 10 + 5}s`);
        flare.style.setProperty('--flare-drift-duration', `${Math.random() * 30 + 20}s`);
        flare.style.setProperty('--flare-start-x', `${(Math.random() - 0.5) * 20}vw`);
        flare.style.setProperty('--flare-start-y', `${(Math.random() - 0.5) * 20}vh`);
        flare.style.setProperty('--flare-end-x', `${(Math.random() - 0.5) * 40}vw`);
        flare.style.setProperty('--flare-end-y', `${(Math.random() - 0.5) * 40}vh`);
        container.appendChild(flare);
    }
}
