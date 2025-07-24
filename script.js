// Function to generate a random number within a range
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create and append a star element
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = star.style.height = `${getRandom(1, 3)}px`;
    star.style.left = `${getRandom(0, 100)}vw`;
    star.style.top = `${getRandom(0, 100)}vh`;
    star.style.setProperty('--star-drift-duration', `${getRandom(50, 150)}s`);
    star.style.setProperty('--star-drift-x', `${getRandom(-10, 10)}vw`);
    star.style.setProperty('--star-drift-y', `${getRandom(-10, 10)}vh`);
    star.style.animationDelay = `${getRandom(0, 4)}s`;
    document.querySelector('.background-elements').appendChild(star);
}

// Function to generate multiple stars
function generateStars(count) {
    for (let i = 0; i < count; i++) {
        createStar();
    }
}

// Function to handle preloader animation and hide it
function setupPreloader() {
    const preloader = document.getElementById('preloader');
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');
    const mainContainer = document.querySelector('.container');
    const preloaderMessage = document.querySelector('.preloader-message');
    const animatedWords = preloaderMessage ? preloaderMessage.querySelectorAll('.word-animated') : [];

    if (!preloader) return; // Only run if preloader exists

    // Animate preloader message words
    if (preloaderMessage) {
        preloaderMessage.style.opacity = 1; // Make container visible
        animatedWords.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = 1;
                word.style.transform = 'scale(1)';
            }, index * 200); // Stagger animation
        });
    }

    let progress = 0;
    const interval = setInterval(() => {
        progress += getRandom(5, 10); // Simulate loading
        if (progress > 100) progress = 100;

        if (indexProgressBar) indexProgressBar.style.width = `${progress}%`;
        if (indexProgressText) indexProgressText.textContent = `${Math.floor(progress)}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                if (mainContainer) {
                    mainContainer.classList.add('visible-content');
                }
            }, 500); // Small delay before hiding preloader
        }
    }, 100); // Update every 100ms
}

// Function to handle smooth page transitions
function setupPageTransitions() {
    const buttons = document.querySelectorAll('.button, .choice-button');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (button.href && !button.href.includes('#')) { // Ensure it's a valid link and not an anchor
                event.preventDefault(); // Prevent default link behavior
                const targetPage = button.href;

                // Fade out the current page body
                document.body.style.opacity = 0;
                document.body.style.transition = 'opacity 0.7s ease-out'; // Use a consistent transition duration

                // Navigate after the fade-out
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 700); // Match transition duration
            }
        });
    });
}

// Music Playback functionality
function setupMusicPlayer() {
    const musicButton = document.getElementById('music-play-button');
    const backgroundMusic = document.getElementById('background-music');

    if (musicButton && backgroundMusic) {
        let isPlaying = false;

        // Try to play immediately (might be blocked by browser policies)
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started
                isPlaying = true;
                musicButton.classList.add('playing');
            }).catch(error => {
                // Autoplay was prevented. Show play button.
                console.log("Autoplay prevented:", error);
                isPlaying = false;
                musicButton.classList.remove('playing');
            });
        }

        musicButton.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                musicButton.classList.remove('playing');
            } else {
                backgroundMusic.play().then(() => {
                    musicButton.classList.add('playing');
                }).catch(error => {
                    console.log("Failed to play music:", error);
                });
            }
            isPlaying = !isPlaying;
        });
    }
}


// Run functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Generate background stars
    generateStars(200); // You can adjust the number of stars

    // Setup preloader for index.html only
    if (document.getElementById('preloader')) {
        setupPreloader();
    } else {
        // If no preloader, make content visible immediately
        const mainContainer = document.querySelector('.container');
        if (mainContainer) {
            mainContainer.classList.add('visible-content');
        }
    }

    // Set up smooth page transitions for buttons
    setupPageTransitions();

    // Set up background music player
    setupMusicPlayer();

    // Staggered animation for paragraphs and section breaks
    const animatedElements = document.querySelectorAll('p, .section-break');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = 1; // Make element visible
            // If you have specific translateY animations, add them here
            // e.g., el.style.transform = 'translateY(0)';
        }, index * 100 + (document.getElementById('preloader') ? 1200 : 0)); // Delay after preloader if present
    });
});
