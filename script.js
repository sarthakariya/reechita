// script.js

document.addEventListener('DOMContentLoaded', () => {
    const backgroundElements = document.querySelector('.background-elements');
    const preloader = document.getElementById('preloader');
    const mainContentContainer = document.querySelector('.container');
    const musicPlayButton = document.getElementById('music-play-button');
    const musicAudio = new Audio('perfect_instrumental.mp3'); // REPLACE WITH YOUR MUSIC FILE PATH
    musicAudio.loop = true; // Loop the music
    musicAudio.volume = 0.6; // Set a default volume

    // --- Preloader Logic ---
    const indexProgressBar = document.getElementById('indexProgressBar');
    const indexProgressText = document.getElementById('indexProgressText');
    const preloaderMessage = document.querySelector('.preloader-message');
    let loadedAssets = 0;
    const totalAssets = 5; // Example: count your images, fonts, main JS, etc.

    function updatePreloaderProgress() {
        loadedAssets++;
        const progress = Math.min(100, (loadedAssets / totalAssets) * 100);
        if (indexProgressBar) {
            indexProgressBar.style.width = `${progress}%`;
            if (indexProgressText) {
                indexProgressText.textContent = `${Math.round(progress)}%`;
            }
        }

        if (progress >= 100) {
            // Animate preloader message words
            const words = preloaderMessage.textContent.split(' ').map(word => `<span class="word-animated">${word}</span>`).join(' ');
            preloaderMessage.innerHTML = words;
            preloaderMessage.style.opacity = '1';

            const animatedWords = document.querySelectorAll('.preloader-message .word-animated');
            animatedWords.forEach((wordSpan, index) => {
                setTimeout(() => {
                    wordSpan.style.opacity = '1';
                    wordSpan.style.transform = 'scale(1)';
                }, index * 100); // Stagger words
            });

            // Hide preloader and show content after a short delay for word animation
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('hidden');
                }
                if (mainContentContainer) {
                    mainContentContainer.classList.add('visible-content');
                }
            }, animatedWords.length * 100 + 500); // Delay based on word animation + 0.5s
        }
    }

    // Call updateProgress for each "asset" loaded (e.g., images, main script itself)
    // For a simple demo, we'll simulate loading
    let simulatedLoadProgress = 0;
    const simulateLoad = setInterval(() => {
        simulatedLoadProgress += 20; // Increment by 20%
        if (simulatedLoadProgress <= 100) {
            const progress = simulatedLoadProgress;
            if (indexProgressBar) {
                indexProgressBar.style.width = `${progress}%`;
                if (indexProgressText) {
                    indexProgressText.textContent = `${Math.round(progress)}%`;
                }
            }
        }
        if (simulatedLoadProgress >= 100) {
            clearInterval(simulateLoad);
            // Once simulated loading is done, trigger the preloader message animation
            const words = preloaderMessage.textContent.split(' ').map(word => `<span class="word-animated">${word}</span>`).join(' ');
            preloaderMessage.innerHTML = words;
            preloaderMessage.style.opacity = '1';

            const animatedWords = document.querySelectorAll('.preloader-message .word-animated');
            animatedWords.forEach((wordSpan, index) => {
                setTimeout(() => {
                    wordSpan.style.opacity = '1';
                    wordSpan.style.transform = 'scale(1)';
                }, index * 100); // Stagger words
            });

            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('hidden');
                }
                if (mainContentContainer) {
                    mainContentContainer.classList.add('visible-content');
                }
                // Start staggered content animations after preloader hides
                staggerContentAnimations();
            }, animatedWords.length * 100 + 500); // Delay based on word animation + 0.5s
        }
    }, 200); // Simulate progress every 200ms

    // --- Staggered Content Animations ---
    function staggerContentAnimations() {
        const paragraphs = document.querySelectorAll('.container p');
        const sectionBreaks = document.querySelectorAll('.container .section-break');
        const buttons = document.querySelectorAll('.container .button-container .button');

        let delay = 0;

        // Animate paragraphs
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.style.opacity = '1';
            }, delay + (index * 150)); // Stagger each paragraph
            delay += 150;
        });

        // Animate section breaks
        sectionBreaks.forEach((sb, index) => {
            setTimeout(() => {
                sb.style.opacity = '1';
            }, delay + (index * 200));
            delay += 200;
        });

        // Animate buttons
        buttons.forEach((btn, index) => {
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
            }, delay + (index * 250));
        });
    }

    // --- Dynamic Background Elements Generation ---

    // Function to create a generic dynamic element
    function createDynamicElement(className, appendTo, randomProps, animationEndCallback = null) {
        const element = document.createElement('div');
        element.classList.add(className);

        for (const prop in randomProps) {
            element.style.setProperty(prop, randomProps[prop]);
        }

        appendTo.appendChild(element);

        if (animationEndCallback) {
            element.addEventListener('animationend', () => {
                animationEndCallback(element);
            });
        } else {
            // Default: remove after some time if no specific animationend callback
            setTimeout(() => {
                element.remove();
            }, parseFloat(element.style.getPropertyValue('--duration') || '30') * 1000); // Use a common --duration variable if available
        }
        return element;
    }

    // Stars
    function createStar() {
        const size = Math.random() * 3 + 1; // 1 to 4px
        const randomProps = {
            'width': `${size}px`,
            'height': `${size}px`,
            'left': `${Math.random() * 100}vw`,
            'top': `${Math.random() * 100}vh`,
            '--star-drift-duration': `${Math.random() * 20 + 10}s`, // 10-30s
            '--star-drift-x': `${(Math.random() - 0.5) * 100}px`, // -50 to +50px
            '--star-drift-y': `${(Math.random() - 0.5) * 100}px`  // -50 to +50px
        };
        createDynamicElement('star', backgroundElements, randomProps, (el) => el.remove());
    }
    setInterval(createStar, 500); // Create a star every 0.5 seconds

    // Ethereal Glows
    function createEtherealGlow() {
        const size = Math.random() * 150 + 50; // 50 to 200px
        const duration = Math.random() * 15 + 10; // 10-25s
        const opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 30; // -15 to +15vw
        const dy = (Math.random() - 0.5) * 30; // -15 to +15vh

        const randomProps = {
            'width': `${size}px`,
            'height': `${size}px`,
            'left': `${x}vw`,
            'top': `${y}vh`,
            '--glow-duration': `${duration}s`,
            '--x': `${x}`,
            '--y': `${y}`,
            '--dx': `${dx}`,
            '--dy': `${dy}`,
            '--glow-scale': `${Math.random() * 0.5 + 0.8}`, // 0.8 to 1.3
            'opacity': `${opacity}` // Set initial opacity
        };
        createDynamicElement('ethereal-glow', backgroundElements, randomProps, (el) => el.remove());
    }
    setInterval(createEtherealGlow, 2000); // Create a glow every 2 seconds

    // Particles
    function createParticle() {
        const size = Math.random() * 4 + 2; // 2 to 6px
        const duration = Math.random() * 5 + 3; // 3-8s
        const x = `${Math.random() * 100}vw`;
        const y = `${Math.random() * 100}vh`;
        const dx = `${(Math.random() - 0.5) * 200}px`; // -100 to +100px
        const dy = `${(Math.random() - 0.5) * 200}px`; // -100 to +100px

        const randomProps = {
            'width': `${size}px`,
            'height': `${size}px`,
            'left': x,
            'top': y,
            '--p-duration': `${duration}s`,
            '--p-x': x,
            '--p-y': y,
            '--p-dx': dx,
            '--p-dy': dy,
            '--p-scale': `${Math.random() * 0.5 + 0.5}` // 0.5 to 1.0
        };
        createDynamicElement('particle', backgroundElements, randomProps, (el) => el.remove());
    }
    setInterval(createParticle, 300); // Create a particle every 0.3 seconds

    // Floating Orbs
    function createFloatingOrb() {
        const size = Math.random() * 100 + 30; // 30 to 130px
        const duration = Math.random() * 20 + 15; // 15-35s
        const blur = Math.random() * 30 + 10; // 10-40px
        const opacity = Math.random() * 0.4 + 0.1; // 0.1 to 0.5
        const colors = ['#FF69B1', '#8A2BE2', '#FFD700', '#DA70D6', '#ADD8E6']; // Primary, Secondary, Gold, Orchid, LightBlue
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 40;
        const dy = (Math.random() - 0.5) * 40;

        const randomProps = {
            'width': `${size}px`,
            'height': `${size}px`,
            'left': `${x}vw`,
            'top': `${y}vh`,
            '--orb-color': color,
            '--orb-blur': `${blur}px`,
            '--orb-opacity': `${opacity}`,
            '--orb-duration': `${duration}s`,
            '--orb-pulse-duration': `${Math.random() * 5 + 3}s`,
            '--orb-x': `${x}`,
            '--orb-y': `${y}`,
            '--orb-dx': `${dx}`,
            '--orb-dy': `${dy}`,
            '--orb-scale': `${Math.random() * 0.5 + 0.7}`
        };
        createDynamicElement('floating-orb', backgroundElements, randomProps, (el) => el.remove());
    }
    setInterval(createFloatingOrb, 3000); // Create an orb every 3 seconds

    // Nebula Clouds
    function createNebulaCloud() {
        const size = Math.random() * 300 + 100; // 100 to 400px
        const duration = Math.random() * 40 + 30; // 30-70s
        const blur = Math.random() * 80 + 30; // 30-110px
        const opacity = Math.random() * 0.3 + 0.05; // 0.05 to 0.35
        const colors = ['rgba(138, 43, 226, 0.7)', 'rgba(255, 105, 180, 0.7)', 'rgba(255, 215, 0, 0.7)']; // Purple, Pink, Gold
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 60;
        const dy = (Math.random() - 0.5) * 60;

        const randomProps = {
            'width': `${size}px`,
            'height': `${size}px`,
            'left': `${x}vw`,
            'top': `${y}vh`,
            '--cloud-color': color,
            '--cloud-blur': `${blur}px`,
            '--cloud-opacity': `${opacity}`,
            '--cloud-duration': `${duration}s`,
            '--cloud-x': `${x}vw`,
            '--cloud-y': `${y}vh`,
            '--cloud-dx': `${dx}vw`,
            '--cloud-dy': `${dy}vh`,
            '--cloud-scale': `${Math.random() * 0.5 + 0.8}`
        };
        createDynamicElement('nebula-cloud', backgroundElements, randomProps, (el) => el.remove());
    }
    setInterval(createNebulaCloud, 5000); // Create a cloud every 5 seconds

    // Wind Gusts
    function createWindGust() {
        const width = Math.random() * 300 + 100; // 100-400px
        const height = Math.random() * 5 + 2; // 2-7px
        const blur = Math.random() * 5 + 1; // 1-6px
        const opacity = Math.random() * 0.2 + 0.05; // 0.05-0.25
        const duration = Math.random() * 10 + 5; // 5-15s

        const randomProps = {
            'top': `${Math.random() * 100}vh`,
            '--gust-opacity': `${opacity}`,
            '--gust-height': `${height}px`,
            '--gust-width': `${width}px`,
            '--gust-blur': `${blur}px`,
            '--gust-duration': `${duration}s`
        };
        createDynamicElement('wind-gust', backgroundElements, randomProps, (el) => el.remove());
    }
    setInterval(createWindGust, 1500); // Create a gust every 1.5 seconds

    // Flying Wings
    function createFlyingWing() {
        const size = Math.random() * 80 + 30; // 30-110px
        const duration = Math.random() * 15 + 10; // 10-25s
        const opacity = Math.random() * 0.4 + 0.1; // 0.1-0.5
        const colors = ['#FFD700', '#DA70D6', '#FF69B1']; // Gold, Orchid, Pink
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 360;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 50;
        const dy = (Math.random() - 0.5) * 50;

        const randomProps = {
            'width': `${size}px`,
            'height': `${size * 0.7}px`, // Make wings slightly wider than tall
            'left': `${x}vw`,
            'top': `${y}vh`,
            '--wing-color': color,
            '--wing-opacity': `${opacity}`,
            '--wing-duration': `${duration}s`,
            '--wing-scale': `${Math.random() * 0.5 + 0.7}`,
            '--wing-rotation': `${rotation}deg`,
            '--wing-x': `${x}vw`,
            '--wing-y': `${y}vh`,
            '--wing-dx': `${dx}vw`,
            '--wing-dy': `${dy}vh`
        };
        createDynamicElement('flying-wing', backgroundElements, randomProps, (el) => el.remove());
    }
    setInterval(createFlyingWing, 2500); // Create a wing every 2.5 seconds

    // Shooting Stars
    function createShootingStar() {
        const duration = Math.random() * 3 + 2; // 2-5s
        const startX = Math.random() * 100;
        const startY = Math.random() * 10; // Start mostly from the top part
        const angle = Math.random() * 60 + 15; // 15 to 75 degrees for downward diagonal
        const endX = startX + Math.random() * 50 + 20; // Travel right
        const endY = startY + Math.random() * 50 + 20; // Travel down

        const randomProps = {
            'left': `${startX}vw`,
            'top': `${startY}vh`,
            '--shoot-duration': `${duration}s`,
            '--start-x': `${startX}vw`,
            '--start-y': `${startY}vh`,
            '--shoot-angle': `${angle}deg`,
            '--end-x': `${endX}vw`,
            '--end-y': `${endY}vh`
        };
        createDynamicElement('shooting-star', backgroundElements, randomProps, (el) => el.remove());
    }
    setInterval(createShootingStar, 4000); // Create a shooting star every 4 seconds

    // --- Music Play/Pause Logic ---
    if (musicPlayButton && musicAudio) {
        musicPlayButton.addEventListener('click', () => {
            if (musicAudio.paused) {
                musicAudio.play().then(() => {
                    musicPlayButton.textContent = '⏸'; // Pause icon
                    musicPlayButton.classList.add('playing');
                }).catch(error => {
                    console.error("Music play failed:", error);
                    alert("Autoplay prevented music. Please interact with the page to enable music.");
                });
            } else {
                musicAudio.pause();
                musicPlayButton.textContent = '▶'; // Play icon
                musicPlayButton.classList.remove('playing');
            }
        });
    }

    // Optional: Auto-play music if browser allows (most don't without user interaction)
    // You might want to make the music button visible by default and let user click it.
    // musicAudio.play().then(...).catch(...)
});
