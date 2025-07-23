document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.container');
    const paragraphs = document.querySelectorAll('.container p');
    const sections = document.querySelectorAll('.section-break, .button-container');
    const musicPlayButton = document.getElementById('music-play-button');
    const backgroundAudio = new Audio('perfect_instrumental.mp3'); 
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5;

    // --- Dynamic Background Elements Initialization ---
    // These functions will now be called on every page that includes script.js
    createStars();
    createEtherealGlows();
    createParticles();

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
                p.style.opacity = 1;
            });
        }

        if (sections.length > 0) {
            sections.forEach((section, index) => {
                const baseDelay = paragraphs.length > 0 ? 1 + paragraphs.length * 0.3 : 0.5;
                section.style.animationDelay = `${baseDelay + index * 0.3}s`;
                section.style.opacity = 1;
            });
        }
        const questionText = document.querySelector('.question-text');
        if (questionText && !questionText.classList.contains('animated-already')) {
             questionText.style.animationDelay = '0.5s';
             questionText.classList.add('animated-already');
        }
    }

    // --- page3.html (Confession Page) Specific Logic ---
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (yesButton && noButton) {
        yesButton.addEventListener('click', () => {
            confirmationMessage.style.opacity = 1;
            confirmationMessage.style.animation = 'fadeInSlideUp 1s ease-out forwards';
            
            yesButton.classList.add('disappear');
            noButton.classList.add('disappear');

            document.body.classList.add('success-theme');
            createFallingHearts();

            setTimeout(() => {
                const buttonContainer = document.querySelector('.button-container');
                if (buttonContainer) {
                    buttonContainer.classList.add('disappear');
                }
            }, 500);
        });

        noButton.addEventListener('click', () => {
            noButton.classList.add('shake');
            setTimeout(() => {
                noButton.classList.remove('shake');
                noButton.classList.add('disappear');
            }, 500);
        });

        noButton.addEventListener('mouseover', () => {
            if (noButton.classList.contains('disappear')) return;

            const moveRange = 80;
            let deltaX = (Math.random() - 0.5) * 2 * moveRange;
            let deltaY = (Math.random() - 0.5) * 2 * moveRange;

            const rect = noButton.getBoundingClientRect();
            const containerRect = mainContainer.getBoundingClientRect();

            let newX = rect.left + deltaX;
            let newY = rect.top + deltaY;

            if (newX < containerRect.left) newX = containerRect.left;
            if (newX + rect.width > containerRect.right) newX = containerRect.right - rect.width;

            if (newY < containerRect.top) newY = containerRect.top;
            if (newY + rect.height > containerRect.bottom) newY = containerRect.bottom - rect.height;

            deltaX = newX - rect.left;
            deltaY = newY - rect.top;

            noButton.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        noButton.addEventListener('mouseout', () => {
            if (noButton.classList.contains('disappear')) return;
            noButton.style.transform = 'translate(0, 0)';
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

// --- NEW: Functions to create dynamic background elements ---
function createStars() {
    const backgroundElements = document.querySelector('.background-elements');
    const numberOfStars = 100; // Increased for more density
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
            --glow-scale: ${size / 200}; /* Normalize scale */
        `;
        backgroundElements.appendChild(glow);
    }
}

function createParticles() {
    const backgroundElements = document.querySelector('.background-elements');
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
            --p-scale: ${size / 2}; /* Normalize scale */
        `;
        backgroundElements.appendChild(particle);
    }
}
