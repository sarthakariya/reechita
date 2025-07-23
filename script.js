// script.js

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');
    const container = document.querySelector('.container');

    // Determine if it's the main index page by checking the path and presence of all preloader elements
    const isIndexPageWithPreloader = (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/index.htm')) &&
                                     preloader && indexProgressBar && indexProgressText;
    
    // Logic for the full preloader experience (typically only on index.html)
    if (isIndexPageWithPreloader) {
        let pageLoaded = false;
        let minimumTimeElapsed = false;
        let currentProgress = 0;

        const hidePreloader = () => {
            if (pageLoaded && minimumTimeElapsed) {
                indexProgressBar.style.width = '100%';
                indexProgressText.textContent = '100%';
                preloader.classList.add('hidden'); // Start hiding preloader
                container.classList.add('visible-content'); // Show main content
                preloader.addEventListener('transitionend', () => {
                    preloader.remove(); // Remove preloader from DOM after transition
                }, { once: true });
            }
        };

        window.addEventListener('load', () => {
            pageLoaded = true;
            hidePreloader();
        });

        const minDuration = 5000; // 5 seconds minimum
        const intervalDuration = 50;
        const increment = 100 / (minDuration / intervalDuration);

        const progressInterval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressInterval);
                minimumTimeElapsed = true;
            }
            indexProgressBar.style.width = `${currentProgress}%`;
            indexProgressText.textContent = `${Math.floor(currentProgress)}%`;
            hidePreloader();
        }, intervalDuration);

        setTimeout(() => {
            minimumTimeElapsed = true;
            hidePreloader();
        }, minDuration);

    } 
    // Logic for all other pages (like page2.html, page3.html) that have a main container
    else if (container && !window.location.pathname.includes('transition.html')) {
        // Ensure the container becomes visible on non-index and non-transition pages
        setTimeout(() => {
            container.classList.add('visible-content');
        }, 50); 
    }

    // Music Playback Logic
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicPlayButton = document.getElementById('music-play-button');

    if (backgroundMusic && musicPlayButton) {
        const isMusicPlayingKey = 'isMusicPlaying';
        const musicPlaybackTimeKey = 'musicPlaybackTime';

        const savedPlaybackTime = localStorage.getItem(musicPlaybackTimeKey);
        const savedMusicState = localStorage.getItem(isMusicPlayingKey);

        if (savedPlaybackTime) {
            backgroundMusic.currentTime = parseFloat(savedPlaybackTime);
        }

        if (savedMusicState === 'true') {
            backgroundMusic.play()
                .then(() => {
                    musicPlayButton.textContent = '⏸️';
                    musicPlayButton.classList.add('playing');
                })
                .catch(error => {
                    console.warn("Autoplay prevented:", error);
                });
        } else {
            musicPlayButton.textContent = '🎵';
            musicPlayButton.classList.remove('playing');
        }

        musicPlayButton.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play()
                    .then(() => {
                        musicPlayButton.textContent = '⏸️';
                        musicPlayButton.classList.add('playing');
                        localStorage.setItem(isMusicPlayingKey, 'true');
                    })
                    .catch(error => {
                        console.error("Manual play prevented:", error);
                        alert("Please allow media playback in your browser settings to hear the music!");
                    });
            } else {
                backgroundMusic.pause();
                musicPlayButton.textContent = '🎵';
                musicPlayButton.classList.remove('playing');
                localStorage.setItem(isMusicPlayingKey, 'false');
            }
        });

        window.addEventListener('beforeunload', () => {
            if (!backgroundMusic.paused) {
                localStorage.setItem(musicPlaybackTimeKey, backgroundMusic.currentTime.toString());
                localStorage.setItem(isMusicPlayingKey, 'true');
            } else {
                localStorage.setItem(isMusicPlayingKey, 'false');
            }
        });

        backgroundMusic.addEventListener('ended', () => {
            musicPlayButton.textContent = '🎵';
            musicPlayButton.classList.remove('playing');
            localStorage.setItem(isMusicPlayingKey, 'false');
        });
    }

    // Populate background elements (stars, glows, particles)
    const backgroundElementsContainer = document.querySelector('.background-elements');
    if (backgroundElementsContainer) {
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
    }

    // Staggered text and section-break animations
    const elementsToAnimate = document.querySelectorAll('p, .section-break, .confession-text, .supporting-text, .brackets'); // Added new page3 elements
    elementsToAnimate.forEach((el, index) => {
        // If animation-delay is not already set inline, apply a default staggered delay
        if (!el.style.animationDelay) {
            el.style.animationDelay = `${0.5 + index * 0.2}s`;
        }
        el.style.animationFillMode = 'forwards';
    });

    // Universal transition button logic
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href').startsWith('#')) {
                return;
            }
            e.preventDefault();
            const targetPage = button.getAttribute('href');
            let transitionMessage = "Stepping closer to forever..."; // Default message

            if (button.id === "acknowledgement-button") {
                transitionMessage = "Unveiling the next chapter...";
            } else if (button.id === "last-button") {
                transitionMessage = "Thank You!";
            } else if (button.id === "index-button") {
                transitionMessage = "Heading back home...";
            }
            
            // Specific message for transition to page3.html (the "big question")
            if (targetPage.includes('page3.html')) {
                 transitionMessage = "Heart is reaching for you...";
            } else if (targetPage.includes('acknowledgement.html')) { // For yes/no button responses
                 if (e.target.id === 'yesButton') {
                    transitionMessage = "Love is in the air! Preparing your happy ending...";
                 } else {
                    // This case might not be reached if noButton moves, but good for fallback
                    transitionMessage = "Thinking it over... 😉";
                 }
            }


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
        const transitionContainer = document.querySelector('.transition-container'); 

        // Set the message or a default if none provided
        if (customMessage) {
            transitionMessageElement.textContent = customMessage;
        } else {
            transitionMessageElement.textContent = "Loading..."; // Fallback default
        }

        // Make the transition container visible
        if (transitionContainer) {
            setTimeout(() => {
                transitionContainer.classList.add('visible-content');
            }, 50); // Small delay for CSS initial state
        }

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5; 
            if (progress <= 100) {
                if (progressBar) progressBar.style.width = `${progress}%`;
                if (progressText) progressText.textContent = `${progress}%`;
            } else {
                clearInterval(interval);
                if (targetPage) {
                    window.location.href = targetPage;
                }
            }
        }, 250); // Adjusted to 250ms per step for a 5-second total duration (100% / 5% per step = 20 steps; 20 steps * 250ms = 5000ms)
    }

    // Page 3 specific logic: No button teasing
    const noButton = document.getElementById('noButton');
    const teasingMessageDiv = document.getElementById('teasingMessage');

    if (noButton && teasingMessageDiv) {
        const teasingMessages = [
            "Aww, trying to escape? Not so fast! 😉",
            "Nice try, but destiny has other plans! ✨",
            "Oops! Looks like this button prefers 'Yes'. 😁",
            "Are you *sure* about that? Think again! 😉",
            "My heart won't let you say no! ❤️",
            "This button seems to have a mind of its own when it comes to you! 😉",
            "Hint: The 'Yes' button is really quite lovely! 😊"
        ];

        let messageIndex = 0;
        let lastMoveTime = 0;
        const moveCooldown = 500; // milliseconds before button can move again

        // Function to move the noButton to a random position within the viewport
        const moveNoButton = (e) => {
            const currentTime = Date.now();
            if (currentTime - lastMoveTime < moveCooldown) {
                return; // Prevent rapid re-triggering
            }
            lastMoveTime = currentTime;

            const buttonRect = noButton.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Calculate new position avoiding getting too close to current mouse position
            let newX, newY;
            let tries = 0;
            const minDistance = 100; // Minimum distance from cursor

            do {
                newX = Math.random() * (viewportWidth - buttonRect.width);
                newY = Math.random() * (viewportHeight - buttonRect.height);
                tries++;
            } while (tries < 10 && e &&
                     Math.hypot(newX - (e.clientX || buttonRect.left + buttonRect.width / 2), newY - (e.clientY || buttonRect.top + buttonRect.height / 2)) < minDistance);

            // Ensure the button stays within bounds
            newX = Math.max(0, Math.min(newX, viewportWidth - buttonRect.width));
            newY = Math.max(0, Math.min(newY, viewportHeight - buttonRect.height));


            // Set the new position using fixed positioning relative to the viewport
            noButton.style.position = 'fixed'; 
            noButton.style.left = `${newX}px`;
            noButton.style.top = `${newY}px`;
            noButton.style.transform = 'none'; // Clear any existing transforms like translate

            // Show teasing message
            teasingMessageDiv.textContent = teasingMessages[messageIndex];
            teasingMessageDiv.classList.add('visible');
            messageIndex = (messageIndex + 1) % teasingMessages.length; // Cycle messages

            // Hide message after a short delay
            setTimeout(() => {
                teasingMessageDiv.classList.remove('visible');
            }, 2000); // Message visible for 2 seconds

            // Prevent default action (like actually clicking if it catches it)
            e.preventDefault();
        };
        
        // On smaller screens, the "No" button should just display a message, not jump wildly
        if (window.innerWidth <= 600) { // Adjust breakpoint as needed for mobile
            noButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent navigation
                teasingMessageDiv.textContent = "Come on, give 'Yes' a try! 😊";
                teasingMessageDiv.classList.add('visible');
                setTimeout(() => {
                    teasingMessageDiv.classList.remove('visible');
                }, 2000);
            });
        } else {
            // For larger screens, make it jump
            noButton.addEventListener('mouseover', moveNoButton); // Mouseover for initial jump
            noButton.addEventListener('click', (e) => { // Click for additional jump/message
                e.preventDefault();
                moveNoButton(e); // Trigger move logic on click too
            });
        }
    }
});
