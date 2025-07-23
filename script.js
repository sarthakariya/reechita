document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.container');
    const paragraphs = document.querySelectorAll('.container p');
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
    createFloatingOrbs(); // NEW background effect
    createNebulaClouds(); // NEW background effect

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
             questionText.style.opacity = 1;
        }
    }

    // --- page3.html (Confession Page) Specific Logic ---
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    if (yesButton && noButton) {
        yesButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior for delayed redirect
            
            yesButton.classList.add('disappear');
            noButton.classList.add('disappear'); 

            document.body.classList.add('success-theme'); 
            createFallingHearts(); 
            
            setTimeout(() => { 
                window.location.href = 'acknowledgement.html?response=yes'; 
            }, 1000); 
        });

        noButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior, making it unclickable
            noButton.classList.add('shake'); 
            setTimeout(() => {
                noButton.classList.remove('shake'); 
            }, 500); 
        });

        // No button float logic (on mouseover)
        noButton.addEventListener('mouseover', () => {
            if (noButton.classList.contains('disappear')) return; 

            const moveRange = 120; 
            const containerRect = mainContainer ? mainContainer.getBoundingClientRect() : document.body.getBoundingClientRect();
            const buttonRect = noButton.getBoundingClientRect();

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

            noButton.style.transition = 'transform 0.3s ease-out'; 
            noButton.style.transform = `translate(${transformX}px, ${transformY}px)`;
        });

        noButton.addEventListener('mouseout', () => {
            // Button stays in new position
        });
    }
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

// --- Functions to create dynamic background elements ---
function createStars() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return;

    const numberOfStars = 100;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1; 
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 
        const duration = Math.random() * 10 + 5; 
        const delay = Math.random() * 5; 
        const driftX = (Math.random() - 0.5) * 20; 
        const driftY = (Math.random() - 0.5) * 20; 

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
    if (!backgroundElements) return;

    const numberOfGlows = 5;
    for (let i = 0; i < numberOfGlows; i++) {
        const glow = document.createElement('div');
        glow.classList.add('ethereal-glow');
        const size = Math.random() * 200 + 100; 
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 
        const duration = Math.random() * 20 + 10; 
        const delay = Math.random() * 5; 
        const driftX = (Math.random() - 0.5) * 30; 
        const driftY = (Math.random() - 0.5) * 30; 

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
    if (!backgroundElements) return;

    const numberOfParticles = 30;
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3 + 1; 
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 
        const duration = Math.random() * 10 + 5; 
        const delay = Math.random() * 5; 
        const driftX = (Math.random() - 0.5) * 40; 
        const driftY = (Math.random() - 0.5) * 40; 

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

function createAuraGlows() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return;

    const numberOfAuras = 3; 
    for (let i = 0; i < numberOfAuras; i++) {
        const aura = document.createElement('div');
        aura.classList.add('aura-glow');
        const size = Math.random() * 300 + 400; 
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 
        const durationPulse = Math.random() * 10 + 10; 
        const durationDrift = Math.random() * 15 + 15; 
        const delay = Math.random() * 10;

        const driftX = (Math.random() - 0.5) * 40; 
        const driftY = (Math.random() - 0.5) * 40; 

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

function createStreaks() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return;

    const numberOfStreaks = 5;
    for (let i = 0; i < numberOfStreaks; i++) {
        const streak = document.createElement('div');
        streak.classList.add('streak');
        const y = Math.random() * 100; 
        const duration = Math.random() * 10 + 6; 
        const delay = Math.random() * 5;
        const width = Math.random() * 300 + 150; 

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

// NEW FUNCTION: Create Floating Orbs
function createFloatingOrbs() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return;

    const numberOfOrbs = 7; // Number of orbs to create
    for (let i = 0; i < numberOfOrbs; i++) {
        const orb = document.createElement('div');
        orb.classList.add('floating-orb');
        
        const size = Math.random() * 80 + 30; // Orb size between 30px and 110px
        const startX = Math.random() * 100; // Starting X position (vw)
        const startY = Math.random() * 100; // Starting Y position (vh)
        const driftX = (Math.random() - 0.5) * 50; // Horizontal drift (vw)
        const driftY = (Math.random() - 0.5) * 50; // Vertical drift (vh)
        const duration = Math.random() * 20 + 10; // Animation duration (s)
        const delay = Math.random() * 10; // Animation delay (s)

        orb.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}vw;
            top: ${startY}vh;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --orb-start-x: ${startX}vw;
            --orb-start-y: ${startY}vh;
            --orb-drift-x: ${driftX}vw;
            --orb-drift-y: ${driftY}vh;
            --orb-scale: ${size / 80}; /* Normalize scale based on size */
            --initial-opacity: ${Math.random() * 0.3 + 0.1}; /* Random initial opacity */
        `;
        backgroundElements.appendChild(orb);
    }
}

// NEW FUNCTION: Create Nebula Clouds
function createNebulaClouds() {
    const backgroundElements = document.querySelector('.background-elements');
    if (!backgroundElements) return;

    const numberOfNebulas = 4; // Number of nebula clouds
    for (let i = 0; i < numberOfNebulas; i++) {
        const nebula = document.createElement('div');
        nebula.classList.add('nebula-cloud');

        const size = Math.random() * 500 + 300; // Nebula size between 300px and 800px
        const startX = Math.random() * 100; 
        const startY = Math.random() * 100; 
        const driftX1 = (Math.random() - 0.5) * 80; // First drift point
        const driftY1 = (Math.random() - 0.5) * 80;
        const driftX2 = (Math.random() - 0.5) * 80; // Second drift point
        const driftY2 = (Math.random() - 0.5) * 80;
        const duration = Math.random() * 40 + 20; // Animation duration (s)
        const delay = Math.random() * 15; // Animation delay (s)

        nebula.style.cssText = `
            --nebula-size: ${size}px;
            left: ${startX}vw;
            top: ${startY}vh;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --nebula-start-x: ${startX}vw;
            --nebula-start-y: ${startY}vh;
            --nebula-drift-x1: ${driftX1}vw;
            --nebula-drift-y1: ${driftY1}vh;
            --nebula-drift-x2: ${driftX2}vw;
            --nebula-drift-y2: ${driftY2}vh;
            --initial-opacity: ${Math.random() * 0.2 + 0.1};
        `;
        backgroundElements.appendChild(nebula);
    }
}
