document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.container');
    const paragraphs = document.querySelectorAll('.container p');
    const sections = document.querySelectorAll('.section-break, .button-container'); // Elements to stagger
    const musicPlayButton = document.getElementById('music-play-button');
    // CHANGED: Audio path to match perfect_instrumental.mp3 as in HTML
    const backgroundAudio = new Audio('perfect_instrumental.mp3'); 
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5; // Adjust volume as needed

    // --- Music Playback Logic ---
    const savedTime = localStorage.getItem('musicCurrentTime');
    const isPlaying = localStorage.getItem('musicIsPlaying') === 'true';

    if (savedTime) {
        backgroundAudio.currentTime = parseFloat(savedTime);
    }

    if (isPlaying) {
        // Attempt to play, but catch potential autoplay policy errors
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

    if (preloader) { // Only run preloader logic if preloader elements exist (i.e., on index.html)
        let loadProgress = 0;
        // Changed interval to 450ms for 4.5 seconds total (450ms * 10 steps = 4500ms)
        const interval = setInterval(() => {
            loadProgress += 10;
            if (indexProgressBar) indexProgressBar.style.width = loadProgress + '%';
            if (indexProgressText) indexProgressText.textContent = `${loadProgress}% Loading...`;

            if (loadProgress >= 100) {
                clearInterval(interval);
                preloader.classList.add('hidden');
                preloader.addEventListener('transitionend', () => preloader.remove());
                if (mainContainer) {
                    mainContainer.classList.add('visible-content'); // Reveal the main content
                    staggerAnimations(); // Start staggered animations
                }
            }
        }, 450); // Adjusted for 4.5 seconds
    } else if (mainContainer) { // If preloader isn't present (e.g., on subsequent pages like page3.html), just reveal content and stagger
        mainContainer.classList.add('visible-content');
        staggerAnimations();
    }

    // --- Staggered Paragraph and Section Animations (for various pages) ---
    function staggerAnimations() {
        // Only run if paragraphs are present (e.g., on story pages, not confession directly)
        if (paragraphs.length > 0) {
            paragraphs.forEach((p, index) => {
                p.style.animationDelay = `${0.5 + index * 0.3}s`;
                p.style.opacity = 1; // Ensure visibility after animation
            });
        }

        // Only run if sections are present
        if (sections.length > 0) {
            sections.forEach((section, index) => {
                const baseDelay = paragraphs.length > 0 ? 1 + paragraphs.length * 0.3 : 0.5;
                section.style.animationDelay = `${baseDelay + index * 0.3}s`;
                section.style.opacity = 1; // Ensure visibility after animation
            });
        }
        // Special case for question-text in page3.html, if it's not a 'p' tag.
        const questionText = document.querySelector('.question-text');
        if (questionText && !questionText.classList.contains('animated-already')) {
             questionText.style.animationDelay = '0.5s'; // Ensure it animates
             questionText.classList.add('animated-already'); // Prevent re-animating
        }
    }


    // --- page3.html (Confession Page) Specific Logic ---
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (yesButton && noButton) { // Check if these elements exist (meaning we are on page3.html)
        // noButton.style.position = 'relative'; // Removed as it's already in CSS

        yesButton.addEventListener('click', () => {
            confirmationMessage.style.opacity = 1; // Make confirmation message visible
            confirmationMessage.style.animation = 'fadeInSlideUp 1s ease-out forwards'; // Animate it in
            
            // Hide buttons with animation
            yesButton.classList.add('disappear');
            noButton.classList.add('disappear');

            // --- Make "Yes" page beautiful! ---
            document.body.classList.add('success-theme'); // Apply success theme background
            createFallingHearts(); // Start falling hearts animation

            // Optional: Hide the button container after a short delay
            setTimeout(() => {
                const buttonContainer = document.querySelector('.button-container');
                if (buttonContainer) {
                    buttonContainer.classList.add('disappear');
                }
            }, 500);
        });

        noButton.addEventListener('click', () => {
            noButton.classList.add('shake'); // Add shake animation
            setTimeout(() => {
                noButton.classList.remove('shake');
                noButton.classList.add('disappear'); // Make it disappear
            }, 500); // Duration of the shake animation
        });

        // --- "No" Button Evasion Logic ---
        // This makes the button move randomly within a small range when hovered
        noButton.addEventListener('mouseover', () => {
            if (noButton.classList.contains('disappear')) return; // Don't move if already disappearing

            const moveRange = 80; // Max pixels to move from its current position
            let deltaX = (Math.random() - 0.5) * 2 * moveRange;
            let deltaY = (Math.random() - 0.5) * 2 * moveRange;

            // Ensure the button stays within the container boundaries (approximate)
            const rect = noButton.getBoundingClientRect();
            const containerRect = mainContainer.getBoundingClientRect();

            let newX = rect.left + deltaX;
            let newY = rect.top + deltaY;

            // Clamp X position
            if (newX < containerRect.left) newX = containerRect.left;
            if (newX + rect.width > containerRect.right) newX = containerRect.right - rect.width;

            // Clamp Y position
            if (newY < containerRect.top) newY = containerRect.top;
            if (newY + rect.height > containerRect.bottom) newY = containerRect.bottom - rect.height;

            // Calculate new delta relative to original position
            deltaX = newX - rect.left;
            deltaY = newY - rect.top;

            noButton.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        // Reset the button's position when the mouse leaves it
        noButton.addEventListener('mouseout', () => {
            if (noButton.classList.contains('disappear')) return;
            noButton.style.transform = 'translate(0, 0)'; // Return to original position
        });
    }
});

// --- Function for falling hearts animation (Reusable) ---
function createFallingHearts() {
    const heartCount = 40; // Number of hearts
    const heartEmojis = ['💖', '✨', '❤️', '💕', '💫', '🧡', '💜', '💙']; // More emojis

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.classList.add('falling-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        // Randomize initial position (start above viewport)
        const startX = Math.random() * 100; // 0 to 100vw
        const startY = - (Math.random() * 200); // -200px to -0px (above viewport)
        
        // Randomize ending position (off-center to simulate drift)
        const endX = startX + (Math.random() - 0.5) * 60; // Drift left/right by up to 30vw
        const rotateDeg = (Math.random() - 0.5) * 720; // Rotate up to 360 degrees in either direction

        // Randomize size
        const size = Math.random() * 1.5 + 1; // 1em to 2.5em

        // Randomize duration and delay
        const duration = Math.random() * 8 + 5; // 5s to 13s
        const delay = Math.random() * 5; // 0s to 5s

        heart.style.cssText = `
            font-size: ${size}em;
            left: ${startX}vw;
            top: ${startY}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --start-x: 0vw; /* CSS variable for initial X offset in animation */
            --end-x: ${endX - startX}vw; /* CSS variable for final X offset relative to startX */
            --rotate-deg: ${rotateDeg}deg;
        `;
        document.body.appendChild(heart);
    }
}
