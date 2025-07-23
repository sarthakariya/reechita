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

    // --- Preloader & Main Content Visibility ---
    const preloader = document.getElementById('preloader');
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');

    let loadProgress = 0;
    const interval = setInterval(() => {
        loadProgress += 10;
        if (indexProgressBar) indexProgressBar.style.width = loadProgress + '%';
        if (indexProgressText) indexProgressText.textContent = `${loadProgress}% Loading...`;

        if (loadProgress >= 100) {
            clearInterval(interval);
            if (preloader) {
                preloader.classList.add('hidden');
                preloader.addEventListener('transitionend', () => preloader.remove());
            }
            if (mainContainer) {
                mainContainer.classList.add('visible-content'); // Reveal the main content
                staggerAnimations(); // Start staggered animations after main content is visible
            }
        }
    }, 100); // Adjust speed of preloader fill

    // If preloader isn't present (e.g., on subsequent pages), just reveal content and stagger
    if (!preloader && mainContainer) {
        mainContainer.classList.add('visible-content');
        staggerAnimations();
    }

    // --- Staggered Paragraph and Section Animations ---
    function staggerAnimations() {
        paragraphs.forEach((p, index) => {
            p.style.animationDelay = `${0.5 + index * 0.3}s`; // Stagger paragraphs
            p.style.opacity = 1; // Ensure they become visible
        });

        sections.forEach((section, index) => {
            section.style.animationDelay = `${1 + paragraphs.length * 0.3 + index * 0.3}s`; // Stagger sections after paragraphs
            section.style.opacity = 1; // Ensure they become visible
        });
    }

    // --- Acknowledgement.html (Page 3) Specific Logic ---
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (yesButton && noButton) { // Check if these elements exist (meaning we are on acknowledgement.html)
        yesButton.addEventListener('click', () => {
            confirmationMessage.style.opacity = 1; // Make confirmation message visible
            confirmationMessage.style.animation = 'fadeInSlideUp 1s ease-out forwards'; // Animate it in
            // Hide buttons or add more animations for 'Yes' if desired
            yesButton.classList.add('disappear');
            noButton.classList.add('disappear');
        });

        noButton.addEventListener('click', () => {
            noButton.classList.add('shake'); // Add shake animation
            setTimeout(() => {
                noButton.classList.remove('shake');
                noButton.classList.add('disappear'); // Make it disappear
                // You can optionally make the yesButton disappear too if you want only one choice to remain
                // yesButton.classList.add('disappear');
                // You might want to show a subtle message if "No" is chosen and disappears
            }, 500); // Duration of the shake animation
        });
    }
});
