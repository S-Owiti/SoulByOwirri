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

/* ==================================================
   COPY M-PESA TILL NUMBER
   ================================================== */

(() => {
  const copyTillButton = document.querySelector('[data-copy-till]');
  const copyTillStatus = document.getElementById('copyTillStatus');

  if (!copyTillButton || !copyTillStatus) {
    return;
  }

  const copyTextFallback = (text) => {
    const temporaryInput = document.createElement('textarea');

    temporaryInput.value = text;
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';

    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    document.execCommand('copy');
    temporaryInput.remove();
  };

  copyTillButton.addEventListener('click', async () => {
    const tillNumber = copyTillButton.dataset.copyTill;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(tillNumber);
      } else {
        copyTextFallback(tillNumber);
      }

      copyTillButton.textContent = 'Till Number Copied ✓';
      copyTillStatus.textContent =
        '4343288 copied. Confirm Selline Atieno Owiti before paying.';

      window.setTimeout(() => {
        copyTillButton.textContent = 'Copy Till Number';
        copyTillStatus.textContent = '';
      }, 4000);
    } catch {
      copyTillStatus.textContent =
        'Copy failed. Please enter Till Number 4343288 manually.';
    }
  });
})();