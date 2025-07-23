document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.container');
    const paragraphs = document.querySelectorAll('.container p');
    const sections = document.querySelectorAll('.section-break, .button-container'); // Elements to stagger
    const musicPlayButton = document.getElementById('music-play-button');
    const backgroundAudio = new Audio('audio/romantic_bgm.mp3'); // Path to your background music
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5; // Adjust volume as needed

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
                p.style.opacity = 1;
            });
        }

        // Only run if sections are present
        if (sections.length > 0) {
            sections.forEach((section, index) => {
                const baseDelay = paragraphs.length > 0 ? 1 + paragraphs.length * 0.3 : 0.5;
                section.style.animationDelay = `${baseDelay + index * 0.3}s`;
                section.style.opacity = 1;
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
        // Ensure noButton is positionable for evasion (relative is fine with flexbox parent)
        noButton.style.position = 'relative';

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
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        // Randomize initial position, animation duration, delay, and rotation
        const startX = Math.random() * 100; // % from left (viewport width)
        const duration = 5 + Math.random() * 5; // 5-10 seconds for fall
        const delay = Math.random() * 8; // 0-8 seconds delay for staggered fall
        const rotateDeg = -50 + Math.random() * 100; // -50 to +50 degrees rotation
        const endX = Math.random() * 100; // % from left for end position

        heart.style.left = `${startX}vw`; // Use vw for horizontal positioning
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        // Pass variables to CSS for individual heart animation paths
        heart.style.setProperty('--start-x', `${startX}vw`);
        heart.style.setProperty('--end-x', `${endX}vw`);
        heart.style.setProperty('--rotate-deg', `${rotateDeg}deg`);

        document.body.appendChild(heart);
    }
}
