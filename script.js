document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.container');
    const paragraphs = document.querySelectorAll('.container p');
    const sections = document.querySelectorAll('.section-break, .button-container, .choice-buttons'); // Added .choice-buttons for stagger
    const musicPlayButton = document.getElementById('music-play-button');
    const backgroundAudio = new Audio('perfect_instrumental.mp3'); 
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5;

    // --- Dynamic Background Elements Initialization ---
    // These functions will now be called on every page that includes script.js
    createStars();
    createEtherealGlows();
    createParticles();
    createAuraGlows(); // NEW: Call for aura glow
    createStreaks();   // NEW: Call for streaks

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
        // Smoothened: Interval changed to 45ms for 100 steps over 4.5 seconds
        const interval = setInterval(() => {
            loadProgress += 1; // Increment by 1 for 100 steps
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
        }, 45); // Adjusted for 4.5 seconds (45ms * 100 steps)
    } else if (mainContainer) {
        mainContainer.classList.add('visible-content');
        staggerAnimations();
    }

    // --- Staggered Paragraph and Section Animations (for various pages) ---
    function staggerAnimations() {
        if (paragraphs.length > 0) {
            paragraphs.forEach((p, index) => {
                p.style.animationDelay = `${0.5 + index * 0.3}s`;
                p.style.opacity = 1; // Ensure opacity is set for animation to apply
            });
        }

        if (sections.length > 0) {
            sections.forEach((section, index) => {
                const baseDelay = paragraphs.length > 0 ? 1 + paragraphs.length * 0.3 : 0.5;
                section.style.animationDelay = `${baseDelay + index * 0.3}s`;
                section.style.opacity = 1; // Ensure opacity is set for animation to apply
            });
        }
        const questionText = document.querySelector('.question-text');
        if (questionText && !questionText.classList.contains('animated-already')) {
             questionText.style.animationDelay = '0.5s';
             questionText.classList.add('animated-already');
             questionText.style.opacity = 1; // Explicitly set opacity for pre-animated elements
        }
        const messageBelow = document.querySelector('.message-below');
        if (messageBelow && !messageBelow.classList.contains('animated-already')) {
             messageBelow.style.animationDelay = '1.5s';
             messageBelow.classList.add('animated-already');
             // opacity is controlled by a separate animation or yes/no click for confirmationMessage
        }
    }

    // --- page3.html (Confession Page) Specific Logic ---
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const confirmationMessage = document.getElementById('confirmationMessage'); // This refers to the .message-below paragraph

    if (yesButton && noButton) {
        yesButton.addEventListener('click', () => {
            // The redirection is handled by the 'href' attribute on the button itself.
            // This JS focuses on the visual effects on the current page before redirection.
            
            if (confirmationMessage) {
                confirmationMessage.style.opacity = 1;
                confirmationMessage.style.animation = 'fadeInSlideUp 1s ease-out forwards';
            }
            
            yesButton.classList.add('disappear');
            noButton.classList.add('disappear'); // Make both disappear

            document.body.classList.add('success-theme'); // Apply success theme (e.g., green tint)
            createFallingHearts(); // Trigger falling hearts animation
        });

        noButton.addEventListener('click', () => {
            noButton.classList.add('shake'); // Add shake animation
            setTimeout(() => {
                noButton.classList.remove('shake'); // Remove shake after duration
                // The button will not disappear on 'No' click, it will just shake and then float if hovered again.
            }, 500); 
            // The redirection is handled by the 'href' attribute on the button for 'no'.
        });

        // No button float logic
        noButton.addEventListener('mouseover', () => {
            if (noButton.classList.contains('disappear')) return; // If already disappeared by 'Yes', don't float

            const moveRange = 100; // Increased range for more movement
            // Use the body's boundaries if mainContainer is not found or too small
            const containerRect = mainContainer ? mainContainer.getBoundingClientRect() : document.body.getBoundingClientRect();
            const buttonRect = noButton.getBoundingClientRect();

            let newX, newY;
            let attempts = 0;
            const maxAttempts = 50; // Max attempts to find a valid position

            do {
                let deltaX = (Math.random() - 0.5) * 2 * moveRange; // Random delta within range
                let deltaY = (Math.random() - 0.5) * 2 * moveRange;

                newX = buttonRect.left + deltaX;
                newY = buttonRect.top + deltaY;

                // Ensure it stays within the container boundaries (with some padding)
                const padding = 20; // Keep button 20px away from edge
                newX = Math.max(containerRect.left + padding, Math.min(newX, containerRect.right - buttonRect.width - padding));
                newY = Math.max(containerRect.top + padding, Math.min(newY, containerRect.bottom - buttonRect.height - padding));

                attempts++;
            // Try again if the new position is too close to the old, or outside bounds (should be handled by max/min)
            } while (attempts < maxAttempts && (Math.abs(newX - buttonRect.left) < 5 && Math.abs(newY - buttonRect.top) < 5));

            // Calculate transform values relative to its current position
            // We use transform for smooth animation relative to its original rendered spot
            const currentTransform = getComputedStyle(noButton).transform;
            let currentX = 0, currentY = 0;
            if (currentTransform && currentTransform !== 'none') {
                const matrix = currentTransform.match(/matrix.*\((.+)\)/);
                if (matrix) {
                    const values = matrix[1].split(', ').map(Number);
                    currentX = values[4];
                    currentY = values[5];
                }
            }

            const transformX = newX - buttonRect.left + currentX;
            const transformY = newY - buttonRect.top + currentY;


            noButton.style.transition = 'transform 0.3s ease-out'; // Smooth transition for movement
            noButton.style.transform = `translate(${transformX}px, ${transformY}px)`;
        });

        noButton.addEventListener('mouseout', () => {
            // Optional: You can make it return to its original spot on mouseout
            // noButton.style.transition = 'transform 0.3s ease-out';
            // noButton.style.transform = 'translate(0, 0)'; 
            // For this project, let it stay in the new position.
        });
    }
});

// --- Function for falling hearts animation (Reusable, from page3.html logic) ---
function createFallingHearts() {
    const heartCount = 40;
    const heartEmojis = ['💖', '✨', '❤️', '💕', '💫', '🧡', '💜', '💙'];

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.classList.add('falling-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const startX = Math.random() * 100;
        const startY = - (Math.random() * 200); // Start off-screen above
        const endX = startX + (Math.random() - 0.5) * 60; // Drift left/right
        const rotateDeg = (Math.random() - 0.5) * 720; // Full rotations
        const size = Math.random() * 1.5 + 1; // 1em to 2.5em
        const duration = Math.random() * 8 + 5; // 5s to 13s
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

// --- Functions to create dynamic background elements ---
function createStars() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return; // Ensure container exists

    const numberOfStars = 100;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1; // 1px to 3px
        const x = Math.random() * 100; // 0 to 100vw
        const y = Math.random() * 100; // 0 to 100vh
        const duration = Math.random() * 10 + 5; // 5s to 15s
        const delay = Math.random() * 5; // 0s to 5s
        const driftX = (Math.random() - 0.5) * 20; // -10vw to 10vw
        const driftY = (Math.random() - 0.5) * 20; // -10vh to 10vh

        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}vw;
            top: ${y}vh;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --star-drift-x: ${driftX}vw;
            --star-drift-y: ${driftY}vh;
            --star-drift-duration: ${duration}s;
        `;
        backgroundElements.appendChild(star);
    }
}

function createEtherealGlows() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return; // Ensure container exists

    const numberOfGlows = 5;
    for (let i = 0; i < numberOfGlows; i++) {
        const glow = document.createElement('div');
        glow.classList.add('ethereal-glow');
        const size = Math.random() * 200 + 100; // 100px to 300px
        const x = Math.random() * 100; // 0 to 100vw
        const y = Math.random() * 100; // 0 to 100vh
        const duration = Math.random() * 20 + 10; // 10s to 30s
        const delay = Math.random() * 5; // 0s to 5s
        const driftX = (Math.random() - 0.5) * 30; // -15vw to 15vw
        const driftY = (Math.random() - 0.5) * 30; // -15vh to 15vh

        glow.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}vw;
            top: ${y}vh;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --x: ${x};
            --y: ${y};
            --dx: ${driftX};
            --dy: ${driftY};
            --glow-duration: ${duration}s;
            --glow-scale: ${size / 200};
        `;
        backgroundElements.appendChild(glow);
    }
}

function createParticles() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return; // Ensure container exists

    const numberOfParticles = 30;
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3 + 1; // 1px to 4px
        const x = Math.random() * 100; // 0 to 100vw
        const y = Math.random() * 100; // 0 to 100vh
        const duration = Math.random() * 10 + 5; // 5s to 15s
        const delay = Math.random() * 5; // 0s to 5s
        const driftX = (Math.random() - 0.5) * 40; // -20vw to 20vw
        const driftY = (Math.random() - 0.5) * 40; // -20vh to 20vh

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}vw;
            top: ${y}vh;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --p-x: ${x}vw;
            --p-y: ${y}vh;
            --p-dx: ${driftX}vw;
            --p-dy: ${driftY}vh;
            --p-duration: ${duration}s;
            --p-scale: ${size / 2};
        `;
        backgroundElements.appendChild(particle);
    }
}

// --- NEW: Function to create Aura Glows ---
function createAuraGlows() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return;

    const numberOfAuras = 3; // A few large, subtle glows
    for (let i = 0; i < numberOfAuras; i++) {
        const aura = document.createElement('div');
        aura.classList.add('aura-glow');
        const size = Math.random() * 300 + 400; // 400px to 700px for large glows
        const x = Math.random() * 100; // 0 to 100vw
        const y = Math.random() * 100; // 0 to 100vh
        const durationPulse = Math.random() * 10 + 10; // 10s to 20s
        const durationDrift = Math.random() * 15 + 15; // 15s to 30s
        const delay = Math.random() * 10;

        const driftX = (Math.random() - 0.5) * 40; // -20vw to 20vw
        const driftY = (Math.random() - 0.5) * 40; // -20vh to 20vh

        aura.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}vw;
            top: ${y}vh;
            animation-duration: ${durationPulse}s, ${durationDrift}s;
            animation-delay: ${delay}s, ${delay}s;
            --adx: ${driftX}vw;
            --ady: ${driftY}vh;
            --aura-drift-duration: ${durationDrift}s;
        `;
        backgroundElements.appendChild(aura);
    }
}

// --- NEW: Function to create Streaks ---
function createStreaks() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return;

    const numberOfStreaks = 5;
    for (let i = 0; i < numberOfStreaks; i++) {
        const streak = document.createElement('div');
        streak.classList.add('streak');
        const y = Math.random() * 100; // Vertical position
        const duration = Math.random() * 10 + 6; // 6s to 16s
        const delay = Math.random() * 5;
        const width = Math.random() * 300 + 150; // Vary width for different streaks

        streak.style.cssText = `
            top: ${y}vh;
            width: ${width}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --streak-duration: ${duration}s;
        `;
        backgroundElements.appendChild(streak);
    }
}
