const menuButton = document.querySelector('.menuButton');
const navLinks = document.querySelector('.navlinks');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navLinks?.classList.toggle('open', !isOpen);
});

navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();

/* ==================================================
   ATTENTION RELEASE COUNTDOWN
   28 August 2026 at 3:00 AM East Africa Time
   ================================================== */

(() => {
  const countdown = document.getElementById('attentionCountdown');

  if (!countdown) {
    return;
  }

  const daysElement = document.getElementById('countdownDays');
  const hoursElement = document.getElementById('countdownHours');
  const minutesElement = document.getElementById('countdownMinutes');
  const secondsElement = document.getElementById('countdownSeconds');

  const releaseTime = new Date('2026-08-28T03:00:00+03:00').getTime();

  const formatNumber = (number) => {
    return String(number).padStart(2, '0');
  };

  const showReleasedMessage = () => {
    countdown.classList.add('isReleased');

    countdown.innerHTML = `
      <p>Attention is out now.</p>
    `;
  };

  const updateAttentionCountdown = () => {
    const currentTime = Date.now();
    const timeRemaining = releaseTime - currentTime;

    if (timeRemaining <= 0) {
      showReleasedMessage();
      return false;
    }

    const days = Math.floor(
      timeRemaining / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (timeRemaining / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (timeRemaining / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (timeRemaining / 1000) % 60
    );

    daysElement.textContent = formatNumber(days);
    hoursElement.textContent = formatNumber(hours);
    minutesElement.textContent = formatNumber(minutes);
    secondsElement.textContent = formatNumber(seconds);

    return true;
  };

  const countdownIsActive = updateAttentionCountdown();

  if (countdownIsActive) {
    const attentionCountdownInterval = window.setInterval(() => {
      const shouldContinue = updateAttentionCountdown();

      if (!shouldContinue) {
        window.clearInterval(attentionCountdownInterval);
      }
    }, 1000);
  }
})();