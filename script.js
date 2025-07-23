document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.container');
    // Updated selector to include h2, p, and the question-text div for staggering animations
    const paragraphsAndHeadings = document.querySelectorAll('.container p, .container h2, .container .question-text'); 
    const sections = document.querySelectorAll('.section-break, .button-container, .choice-buttons');
    const musicPlayButton = document.getElementById('music-play-button');
    const backgroundAudio = new Audio('perfect_instrumental.mp3'); 
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5;

    // --- Dynamic Background Elements Initialization ---
    createStars();
    createEtherealGlows();
    createParticles();
    createAuraGlows(); 
    createStreaks();   
    createFloatingOrbs(); 
    createNebulaClouds(); 
    createWindGusts(); 
    createFlyingWings(); 

    // --- Music Playback Logic ---
    const savedTime = localStorage.getItem('musicCurrentTime');
    const isPlaying = localStorage.getItem('musicIsPlaying') === 'true';

    if (savedTime) {
        backgroundAudio.currentTime = parseFloat(savedTime);
    }

    if (isPlaying) {
        backgroundAudio.play().catch(e => console.error("Autoplay prevented:", e));
        musicPlayButton.classList.add('playing');
    }

    musicPlayButton.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play().catch(e => console.error("Play prevented:", e));
            musicPlayButton.classList.add('playing');
            localStorage.setItem('musicIsPlaying', 'true');
        } else {
            backgroundAudio.pause();
            musicPlayButton.classList.remove('playing');
            localStorage.setItem('musicIsPlaying', 'false');
        }
    });

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicCurrentTime', backgroundAudio.currentTime);
        localStorage.setItem('musicIsPlaying', !backgroundAudio.paused);
    });

    // --- Preloader & Main Content Visibility (for index.html) ---
    const preloader = document.getElementById('preloader');
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');

    if (preloader) {
        let loadProgress = 0;
        const interval = setInterval(() => {
            loadProgress += 1;
            if (indexProgressBar) indexProgressBar.style.width = loadProgress + '%';
            if (indexProgressText) indexProgressText.textContent = `${loadProgress}% Loading...`;

            if (loadProgress >= 100) {
                clearInterval(interval);
                preloader.classList.add('hidden');
                preloader.addEventListener('transitionend', () => preloader.remove());
                if (mainContainer) {
                    mainContainer.classList.add('visible-content');
                    staggerAnimations();
                }
            }
        }, 45); 
    } else if (mainContainer) {
        mainContainer.classList.add('visible-content');
        staggerAnimations();
    }

    // --- Staggered Paragraph and Section Animations (for various pages) ---
    function staggerAnimations() {
        // Now includes h2, p, and the question-text div for staggering
        if (paragraphsAndHeadings.length > 0) {
            paragraphsAndHeadings.forEach((el, index) => { 
                el.style.animationDelay = `${0.5 + index * 0.3}s`;
                el.style.opacity = 1;
            });
        }

        if (sections.length > 0) {
            sections.forEach((section, index) => {
                const isButtonSection = section.classList.contains('button-container') || section.classList.contains('choice-buttons');

                if (isButtonSection) {
                    section.style.animation = 'none'; 
                    section.style.opacity = 1; 
                } else {
                    const baseDelay = paragraphsAndHeadings.length > 0 ? 0.5 + paragraphsAndHeadings.length * 0.3 : 0.5;
                    section.style.animationDelay = `${baseDelay + index * 0.3}s`;
                    section.style.opacity = 1;
                }
            });
        }
    }

    // --- page3.html (Confession Page) Specific Logic ---
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    // Helper function to move the no button
    function moveNoButton(buttonElement, containerElement) {
        const moveRange = 120; 
        const containerRect = containerElement ? containerElement.getBoundingClientRect() : document.body.getBoundingClientRect();
        const buttonRect = buttonElement.getBoundingClientRect();

        let newX, newY;
        let attempts = 0;
        const maxAttempts = 50; 

        do {
            let deltaX = (Math.random() - 0.5) * 2 * moveRange; 
            let deltaY = (Math.random() - 0.5) * 2 * moveRange;

            newX = buttonRect.left + deltaX;
            newY = buttonRect.top + deltaY;

            const padding = 20; 
            newX = Math.max(containerRect.left + padding, Math.min(newX, containerRect.right - buttonRect.width - padding));
            newY = Math.max(containerRect.top + padding, Math.min(newY, containerRect.bottom - buttonRect.height - padding));

            attempts++;
        } while (attempts < maxAttempts && (Math.abs(newX - buttonRect.left) < 5 && Math.abs(newY - buttonRect.top) < 5));

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

        const transformX = (newX - buttonRect.left) + currentTx;
        const transformY = (newY - buttonRect.top) + currentTy;

        buttonElement.style.transition = 'transform 0.3s ease-out'; 
        buttonElement.style.transform = `translate(${transformX}px, ${transformY}px)`;
    }

    if (yesButton && noButton) {
        yesButton.style.animation = 'none';
        noButton.style.animation = 'none';
        yesButton.style.opacity = '1'; 
        noButton.style.opacity = '1';

        yesButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            document.body.classList.add('success-theme'); 
            createFallingHearts(); 
            createFallingChocolates(); // NEW: Trigger falling chocolates
            setTimeout(() => { 
                window.location.href = 'acknowledgement.html?response=yes'; 
            }, 1000); 
        });

        noButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            moveNoButton(noButton, mainContainer); 
        });

        noButton.addEventListener('mouseover', () => {
            moveNoButton(noButton, mainContainer); 
        });

        noButton.addEventListener('mouseout', () => {
            // Button stays in new position
        });
    }

    // --- New Function: Show Transition Preloader ---
    window.showTransitionPreloader = function(targetPage) {
        const preloaderDiv = document.getElementById('transition-preloader');
        if (preloaderDiv) {
            preloaderDiv.classList.add('active');
            setTimeout(() => {
                window.location.href = targetPage;
            }, 1500); // Show preloader for 1.5 seconds
        } else {
            // Fallback if preloader not found, navigate directly
            window.location.href = targetPage;
        }
    };
});

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
    const chocolateCount = 20; // Number of chocolates
    const chocolateEmojis = ['🍫', '🍬', '🍭', '🍪']; // You can add more like '🍩'

    for (let i = 0; i < chocolateCount; i++) {
        const chocolate = document.createElement('span');
        chocolate.classList.add('falling-chocolate');
        chocolate.textContent = chocolateEmojis[Math.floor(Math.random() * chocolateEmojis.length)];

        const startX = Math.random() * 100; // Random starting X
        const startY = -(Math.random() * 100 + 50); // Start off-screen top
        const endX = startX + (Math.random() - 0.5) * 80; // Drift left/right
        const rotateDeg = (Math.random() - 0.5) * 1080; // Spin more
        const size = Math.random() * 1.5 + 1; // Varying sizes
        const duration = Math.random() * 6 + 4; // Faster fall
        const delay = Math.random() * 3; // Staggered delay

        chocolate.style.cssText = `
            font-size: ${size}em;
            left: ${startX}vw;
            top: ${startY}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --start-x: 0vw; /* Relative to its initial position for animation */
            --end-x: ${endX - startX}vw; /* How much it drifts from startX */
            --rotate-deg: ${rotateDeg}deg;
        `;
        document.body.appendChild(chocolate);
    }
}


// --- Functions to create dynamic background elements (unchanged from last turn) ---
function createStars() { /* ... content ... */ }
function createEtherealGlows() { /* ... content ... */ }
function createParticles() { /* ... content ... */ }
function createAuraGlows() { /* ... content ... */ }
function createStreaks() { /* ... content ... */ }
function createFloatingOrbs() { /* ... content ... */ }
function createNebulaClouds() { /* ... content ... */ }
function createWindGusts() { /* ... content ... */ }
function createFlyingWings() { /* ... content ... */ }
