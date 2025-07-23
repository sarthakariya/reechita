// --- Preloader & Main Content Visibility (for index.html) ---
const preloader = document.getElementById('preloader');
const indexProgressBar = document.getElementById('indexProgressBar');
const indexProgressText = document.getElementById('indexProgressText');
const preloaderMessageElement = document.getElementById('animatedPreloaderMessage'); // Get the message element
const preloaderHeart = document.querySelector('#preloader .preloader-single-heart'); // UPDATED SELECTOR
const originalPreloaderMessage = "Loading words directly from Sarthak's Heart... ✨💗"; // Original message


if (preloader) {
    // Initial state for entrance animation
    if (preloaderMessageElement) preloaderMessageElement.style.opacity = '0';
    if (indexProgressBar) indexProgressBar.parentNode.style.opacity = '0'; // Container opacity
    if (preloaderHeart) preloaderHeart.style.opacity = '0';

    // Animate preloader elements in
    setTimeout(() => {
        if (preloaderHeart) {
            preloaderHeart.style.transition = 'opacity 0.8s ease-out';
            preloaderHeart.style.opacity = '1';
        }

        if (preloaderMessageElement) {
            // Clear message initially
            preloaderMessageElement.textContent = ''; // Clear for animation
            preloaderMessageElement.style.opacity = '1'; // Ensure wrapper is visible
            // New: Animate message word by word
            const words = originalPreloaderMessage.split(' ');
            let wordIndex = 0;
            const animateMessageInterval = setInterval(() => {
                if (wordIndex < words.length) {
                    const span = document.createElement('span');
                    // FIX APPLIED HERE: Add a non-breaking space after each word, except the last one.
                    span.textContent = words[wordIndex] + (wordIndex < words.length - 1 ? ' ' : '');
                    span.classList.add('word-animated'); // For CSS animation
                    preloaderMessageElement.appendChild(span);
                    // Trigger reflow for animation
                    span.offsetWidth;
                    span.style.opacity = '1'; // Fade in
                    span.style.transform = 'scale(1)'; // Scale in
                    wordIndex++;
                } else {
                    clearInterval(animateMessageInterval);
                }
            }, 150); // Delay between words
        }

        if (indexProgressBar) {
            indexProgressBar.parentNode.style.transition = 'opacity 1s ease-out 0.4s';
            indexProgressBar.parentNode.style.opacity = '1';
        }
    }, 100); // Small delay to ensure styles apply


    let loadProgress = 0;
    const totalLoadDuration = 5000; // 5 seconds in milliseconds
    const intervalTime = 50; // Update every 50ms for smoothness
    const progressIncrement = 100 / (totalLoadDuration / intervalTime); // Calculate increment needed for 5s

    const interval = setInterval(() => {
        loadProgress += progressIncrement;
        if (loadProgress > 100) loadProgress = 100; // Cap at 100%

        if (indexProgressBar) indexProgressBar.style.width = loadProgress + '%';
        if (indexProgressText) indexProgressText.textContent = `${Math.floor(loadProgress)}%`; // REMOVED "LOADING..."

        if (loadProgress >= 100) {
            clearInterval(interval);
            // Also clear the word animation interval if it's still running
            // (though it should naturally finish before or around this time)
            preloader.classList.add('hidden');
            preloader.addEventListener('transitionend', () => preloader.remove());
            if (mainContainer) {
                mainContainer.classList.add('visible-content');
                staggerAnimations();
            }
        }
    }, intervalTime); // Use the calculated intervalTime
} else if (mainContainer) {
    // If no preloader (e.g., on page2.html, page3.html, acknowledgement.html)
    mainContainer.classList.add('visible-content');
    staggerAnimations();
}
