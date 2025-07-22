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
    // Logic for all other pages (like page2.html, page3.html, etc.) that have a main container
    else if (container) {
        // Ensure the container becomes visible on non-index pages
        // A small timeout allows the CSS initial state (opacity: 0) to apply first
        setTimeout(() => {
            container.classList.add('visible-content');
        }, 50); 
    }

    // Music Playback Logic (remains unchanged)
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
    const elementsToAnimate = document.querySelectorAll('p, .section-break');
    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${0.5 + index * 0.2}s`;
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
            let transitionMessage = "Loading...";

            if (button.id === "acknowledgement-button") {
                transitionMessage = "Unveiling the next chapter...";
            } else if (button.id === "last-button") {
                transitionMessage = "Thank You!";
            } else if (button.id === "index-button") {
                transitionMessage = "Heading back home...";
            }
            else {
                transitionMessage = "Stepping closer to forever...";
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
        }, 150);
    }
});
