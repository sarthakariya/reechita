// hearts.js - Floating animated hearts for a love theme

// Configuration
const HEART_COLORS = [
  "#ff69b4", "#ffb6c1", "#ff1493", "#e75480", "#ff6f91",
  "#ff85a1", "#f67280", "#f8bbd0", "#f06292", "#e57373"
];
const HEART_EMOJIS = ["💖", "💗", "💘", "💝", "💞", "💕", "❤️", "🩷"];
const HEART_COUNT = 30; // Number of hearts at a time

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  // Randomly choose emoji or SVG heart
  if (Math.random() > 0.5) {
    heart.innerText = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
  } else {
    heart.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="${HEART_COLORS[Math.floor(Math.random()*HEART_COLORS.length)]}" xmlns="http://www.w3.org/2000/svg"><path d="M23.6,4.6c-2.1,0-4.1,1-5.6,2.7C16.5,5.6,14.5,4.6,12.4,4.6C8.4,4.6,5,8,5,12c0,7.1,11,14,11,14s11-6.9,11-14 C27,8,23.6,4.6,23.6,4.6z"/></svg>`;
  }
  // Random position and size
  heart.style.left = `${randomBetween(5, 95)}vw`;
  heart.style.fontSize = `${randomBetween(1.2, 2.5)}rem`;
  heart.style.opacity = randomBetween(0.7, 1);
  heart.style.animationDuration = `${randomBetween(4, 8)}s`;
  heart.style.setProperty('--heart-color', HEART_COLORS[Math.floor(Math.random()*HEART_COLORS.length)]);
  document.body.appendChild(heart);

  // Remove after animation
  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

// Spawn hearts at intervals
setInterval(() => {
  if (document.querySelectorAll('.floating-heart').length < HEART_COUNT) {
    createHeart();
  }
}, 400);

// Optional: burst of hearts on YES button click
document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesButton');
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 80);
      }
    });
  }
});

// CSS injection for hearts
const style = document.createElement('style');
style.innerHTML = `
.floating-heart {
  position: fixed;
  bottom: -2rem;
  z-index: 9999;
  pointer-events: none;
  animation: floatHeart linear forwards;
  will-change: transform, opacity;
  filter: drop-shadow(0 2px 8px rgba(255,105,180,0.2));
  transition: opacity 0.3s;
}
.floating-heart svg {
  display: block;
  width: 2em;
  height: 2em;
}
@keyframes floatHeart {
  0% {
    transform: translateY(0) scale(1) rotate(-10deg);
    opacity: 1;
  }
  60% {
    opacity: 0.95;
    transform: translateY(-60vh) scale(1.2) rotate(10deg);
  }
  100% {
    transform: translateY(-100vh) scale(0.8) rotate(-12deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
