// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Inject background elements once per page load
    const backgroundElementsContainer = document.createElement('div');
    backgroundElementsContainer.classList.add('background-elements');
    backgroundElementsContainer.innerHTML = `
        <div class="moon"></div>
        <div class="distant-scenery"></div>
        <div class="water-shimmer"></div>
    `;
    // Add stars and particles
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = star.style.height = `${Math.random() * 3 + 1}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.setProperty('--star-drift-x', (Math.random() - 0.5) * 300 + 'px');
        star.style.setProperty('--star-drift-y', (Math.random() - 0.5) * 200 + 'px');
        star.style.setProperty('--star-drift-duration', `${28 + Math.random() * 12}s`);
        star.style.animationDelay = `${Math.random() * 6}s`;
        backgroundElementsContainer.appendChild(star);
    }

    for (let i = 0; i < 30; i++) {
        const glow = document.createElement('div');
        glow.classList.add('ethereal-glow');
        glow.style.setProperty('--x', Math.random() * 100);
        glow.style.setProperty('--y', Math.random() * 100);
        glow.style.setProperty('--dx', (Math.random() - 0.5) * 20);
        glow.style.setProperty('--dy', (Math.random() - 0.5) * 20);
        glow.style.setProperty('--glow-scale', Math.random() * 0.5 + 0.5);
        glow.style.animationDelay = `${Math.random() * 10}s`;
        glow.style.setProperty('--glow-duration', `${15 + Math.random() * 10}s`);
        glow.style.width = glow.style.height = `${Math.random() * 100 + 100}px`;
        backgroundElementsContainer.appendChild(glow);
    }

    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.setProperty('--p-x', `${Math.random() * 100}vw`);
        particle.style.setProperty('--p-y', `${Math.random() * 100}vh`);
        particle.style.setProperty('--p-dx', `${(Math.random() - 0.5) * 20}vw`);
        particle.style.setProperty('--p-dy', `${(Math.random() - 0.5) * 20}vh`);
        particle.style.setProperty('--p-scale', Math.random() * 0.5 + 0.5);
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.setProperty('--p-duration', `${10 + Math.random() * 10}s`);
        particle.style.width = particle.style.height = `${Math.random() * 4 + 2}px`;
        backgroundElementsContainer.appendChild(particle);
    }

    document.body.prepend(backgroundElementsContainer);


    // Music Playback Logic (now conditional)
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicPlayButton = document.getElementById('music-play-button');

    // Only run music logic if the elements exist on the current page
    if (backgroundMusic && musicPlayButton) {
        const isMusicPlayingKey = 'isMusicPlaying'; // localStorage key for music state
        const musicPlaybackTimeKey = 'musicPlaybackTime'; // localStorage key for playback time

        // Restore music playback state and time from localStorage
        const savedPlaybackTime = localStorage.getItem(musicPlaybackTimeKey);
        const savedMusicState = localStorage.getItem(isMusicPlayingKey);

        if (savedPlaybackTime) {
            backgroundMusic.currentTime = parseFloat(savedPlaybackTime);
        }

        if (savedMusicState === 'true') {
            // Attempt to play music automatically when the page loads
            backgroundMusic.play()
                .then(() => {
                    musicPlayButton.textContent = '⏸️'; // Change to pause icon
                    musicPlayButton.classList.add('playing');
                })
                .catch(error => {
                    console.warn("Autoplay prevented:", error);
                    // If autoplay is prevented, the button will remain '🎵' and user can click it.
                });
        } else {
            musicPlayButton.textContent = '🎵'; // Default to play icon if not playing
            musicPlayButton.classList.remove('playing');
        }

        // Handle button click for play/pause
        musicPlayButton.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play()
                    .then(() => {
                        musicPlayButton.textContent = '⏸️'; // Change to pause icon
                        musicPlayButton.classList.add('playing');
                        localStorage.setItem(isMusicPlayingKey, 'true');
                    })
                    .catch(error => {
                        console.error("Manual play prevented:", error);
                        alert("Please allow media playback in your browser settings to hear the music!");
                    });
            } else {
                backgroundMusic.pause();
                musicPlayButton.textContent = '🎵'; // Change to play icon
                musicPlayButton.classList.remove('playing');
                localStorage.setItem(isMusicPlayingKey, 'false');
            }
        });

        // Save current playback time before navigating away
        window.addEventListener('beforeunload', () => {
            if (!backgroundMusic.paused) {
                localStorage.setItem(musicPlaybackTimeKey, backgroundMusic.currentTime.toString());
                localStorage.setItem(isMusicPlayingKey, 'true'); // Ensure state is saved as playing
            } else {
                localStorage.setItem(isMusicPlayingKey, 'false'); // Ensure state is saved as paused
            }
        });

        // Handle music ending (though it's looped, good practice)
        backgroundMusic.addEventListener('ended', () => {
            musicPlayButton.textContent = '🎵';
            musicPlayButton.classList.remove('playing');
            localStorage.setItem(isMusicPlayingKey, 'false');
        });
    } // End of conditional music logic


    // Staggered text and section-break animations
    const elementsToAnimate = document.querySelectorAll('p, .section-break');
    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${0.5 + index * 0.2}s`;
        el.style.animationFillMode = 'forwards'; // Keep the end state of the animation
    });


    // Universal transition button logic
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href').startsWith('#')) { // Ignore anchor links within the same page
                return;
            }
            e.preventDefault(); // Prevent default navigation
            const targetPage = button.getAttribute('href');
            let transitionMessage = "Loading..."; // Default message

            if (button.id === "acknowledgement-button") {
                transitionMessage = "Unveiling the next chapter..."; // Specific message for one button
            } else if (button.id === "last-button") {
                transitionMessage = "Thank You!"; // Specific message for another
            } else if (button.id === "index-button") {
                transitionMessage = "Heading back home...";
            }
            else {
                transitionMessage = "Stepping closer to forever...";
            }

            // Redirect to transition.html with the target page as a parameter
            window.location.href = `transition.html?to=${encodeURIComponent(targetPage)}&message=${encodeURIComponent(transitionMessage)}`;
        });
    });

    // Specific logic for transition.html
    if (window.location.pathname.includes('transition.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const targetPage = urlParams.get('to');
        const customMessage = urlParams.get('message');
        const transitionMessageElement = document.getElementById('transitionMessage');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');

        if (customMessage) {
            transitionMessageElement.textContent = customMessage;
        }

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (progress <= 100) {
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${progress}%`;
            } else {
                clearInterval(interval);
                if (targetPage) {
                    window.location.href = targetPage;
                }
            }
        }, 150); // Speed of loading bar
    }
});
