const eyes = document.querySelectorAll('.eye');
let animationFrameId;

document.addEventListener('mousemove', (event) => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => moveEyes(event));
});

function moveEyes(event) {
    eyes.forEach(eye => {
        const { left, top, width, height } = eye.getBoundingClientRect();
        const eyeCenterX = left + width / 2;
        const eyeCenterY = top + height / 2;
        const deltaX = event.clientX - eyeCenterX;
        const deltaY = event.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const maxDistance = eye.offsetWidth / 2;
        const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY));
        const eyeX = distance * Math.cos(angle);
        const eyeY = distance * Math.sin(angle);
        eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
    });
}

const year = document.querySelector('[data-year]');
const rocketNumber = year.querySelector('[data-rocket-number]');
const rocketIcon = rocketNumber.querySelector('.rocket');
const walkingNumber = document.querySelector('[data-walking-number]');
const bigButton = document.querySelector('[data-button]');
const textInfo = document.querySelector('[data-info]');
const countdownElement = document.querySelector('[data-text]');

const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    textInfo.textContent = "Click on the screen to welcome the new year!";

    document.addEventListener('click', async function() {
        await handleSpacebarPress();
    });
} else {
    document.addEventListener('keydown', async function(event) {
        if (event.code === 'Space') {
            await handleSpacebarPress();
        }
    });
}

async function handleSpacebarPress() {
    walkingNumber.classList.add('animate-walking', 'walk-to-button');
    textInfo.style.transform = "translateY(-2rem)";
    textInfo.style.opacity = "0";

    await delay(3000);
    walkingNumber.classList.remove('animate-walking');
    walkingNumber.classList.add('jump-to-button');

    await delay(400);
    bigButton.classList.add('is-clicked');
    rocketNumber.classList.add('animate-rocket');
    startCountdown();

    await delay(500);
    rocketIcon.classList.add('animate-show-fire');

    await delay(2000);
    year.classList.add('animate-clouds');

    await delay(2500);
    rocketIcon.classList.remove('animate-show-fire');
    rocketIcon.classList.add('animate-fire');
    rocketNumber.classList.add('animate-fly');

    await delay(1000);
    year.classList.remove('animate-clouds');

    await delay(4000);
    walkingNumber.classList.remove('walk-to-button', 'jump-to-button');
    walkingNumber.classList.add('animate-walking', 'walk-to-place');

    await delay(3000);
    walkingNumber.classList.remove('animate-walking');
    walkingNumber.querySelector('.number-box').style.transform = "rotateZ(0deg)";
    countdownElement.textContent = 'Happy New Year!';
    await delay(500);
    countdownElement.style.opacity = '1';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startCountdown() {
    let countdownValue = 4;

    countdownElement.style.opacity = 1;
    countdownElement.style.transform = "translateY(0)";

    const interval = setInterval(() => {
        countdownElement.textContent = countdownValue;
        countdownValue--;

        if (countdownValue < 0) {
            clearInterval(interval);
            countdownElement.textContent = '';
            countdownElement.style.opacity = '0';
        }
    }, 1000);
}