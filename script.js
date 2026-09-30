const menuButton = document.querySelector(".menuButton");
const navLinks = document.querySelector(".navlinks");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navLinks?.classList.toggle("open", !isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  }),
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((section) => observer.observe(section));
document.querySelector("#year").textContent = new Date().getFullYear();

/* ==================================================
   COLD BLOODED ALBUM COUNTDOWN
   11 December 2026 at midnight, East Africa Time
   ================================================== */

(() => {
  const countdown = document.getElementById("coldBloodedCountdown");

  if (!countdown) {
    return;
  }

  const daysElement = document.getElementById("albumCountdownDays");
  const hoursElement = document.getElementById("albumCountdownHours");
  const minutesElement = document.getElementById("albumCountdownMinutes");

  const releaseDate =
    countdown.dataset.releaseDate || "2026-12-11T00:00:00+03:00";

  const releaseTime = new Date(releaseDate).getTime();

  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };

  const showReleasedMessage = () => {
    countdown.classList.add("isReleased");

    countdown.innerHTML = `
      <p>Cold Blooded is out now.</p>
    `;
  };

  const updateColdBloodedCountdown = () => {
    const timeRemaining = releaseTime - Date.now();

    if (timeRemaining <= 0) {
      showReleasedMessage();
      return false;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);

    daysElement.textContent = formatNumber(days);
    hoursElement.textContent = formatNumber(hours);
    minutesElement.textContent = formatNumber(minutes);

    return true;
  };

  const countdownIsActive = updateColdBloodedCountdown();

  if (countdownIsActive) {
    const coldBloodedCountdownInterval = window.setInterval(() => {
      const shouldContinue = updateColdBloodedCountdown();

      if (!shouldContinue) {
        window.clearInterval(coldBloodedCountdownInterval);
      }
    }, 60000);
  }
})();

/* ==================================================
   COPY M-PESA TILL NUMBER
   ================================================== */

(() => {
  const copyTillButton = document.querySelector("[data-copy-till]");
  const copyTillStatus = document.getElementById("copyTillStatus");

  if (!copyTillButton || !copyTillStatus) {
    return;
  }

  const copyTextFallback = (text) => {
    const temporaryInput = document.createElement("textarea");

    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";

    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    document.execCommand("copy");
    temporaryInput.remove();
  };

  copyTillButton.addEventListener("click", async () => {
    const tillNumber = copyTillButton.dataset.copyTill;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(tillNumber);
      } else {
        copyTextFallback(tillNumber);
      }

      copyTillButton.textContent = "Till Number Copied ✓";
      copyTillStatus.textContent =
        "4343288 copied. Confirm Selline Atieno Owiti before paying.";

      window.setTimeout(() => {
        copyTillButton.textContent = "Copy Till Number";
        copyTillStatus.textContent = "";
      }, 4000);
    } catch {
      copyTillStatus.textContent =
        "Copy failed. Please enter Till Number 4343288 manually.";
    }
  });
})();

/* ==================================================
   OPEN PURCHASE FORM + SELECT PACKAGE
   ================================================== */

(() => {
  const packageButtons = document.querySelectorAll("[data-package]");
  const packageSelect = document.getElementById("selectedPackage");
  const purchaseDisclosure = document.getElementById("purchaseForm");

  if (!packageButtons.length || !packageSelect || !purchaseDisclosure) {
    return;
  }

  packageButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedPackage = button.dataset.package;

      packageSelect.value = selectedPackage;
      purchaseDisclosure.open = true;

      window.setTimeout(() => {
        purchaseDisclosure.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        packageSelect.focus({
          preventScroll: true,
        });
      }, 150);
    });
  });
})();

/* ==================================================
   FLOATING WEBSITE COMMENT FORM
   ================================================== */

(() => {
  const openButton = document.getElementById("openCommentButton");
  const closeButton = document.getElementById("closeCommentButton");
  const dialog = document.getElementById("commentDialog");
  const commentForm = document.getElementById("commentForm");
  const commentStatus = document.getElementById("commentStatus");
  const commentPage = document.getElementById("commentPage");

  if (
    !openButton ||
    !closeButton ||
    !dialog ||
    !commentForm ||
    !commentStatus
  ) {
    return;
  }

  const openCommentForm = () => {
    commentStatus.textContent = "";

    if (commentPage) {
      commentPage.value = window.location.href;
    }

    dialog.showModal();

    window.setTimeout(() => {
      document.getElementById("websiteComment")?.focus();
    }, 100);
  };

  const closeCommentForm = () => {
    dialog.close();
  };

  openButton.addEventListener("click", openCommentForm);
  closeButton.addEventListener("click", closeCommentForm);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeCommentForm();
    }
  });

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = commentForm.querySelector(".commentSubmitButton");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    commentStatus.textContent = "";

    try {
      const response = await fetch(commentForm.action, {
        method: "POST",
        body: new FormData(commentForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Comment submission failed.");
      }

      commentForm.reset();
      commentStatus.textContent =
        "Received. Your comment has entered the universe ✦";

      window.setTimeout(() => {
        closeCommentForm();
        commentStatus.textContent = "";
      }, 1800);
    } catch (error) {
      commentStatus.textContent = "That did not send. Please try again.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send to Owirri";
    }
  });
})();
