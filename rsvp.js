(() => {
  const body = document.body;
  const gate = document.getElementById("merchGate");
  const skipButton = document.getElementById("merchSkipButton");
  const closeButton = document.getElementById("merchGateClose");
  const form = document.getElementById("exclusiveRsvpForm");
  const closedMessage = document.getElementById("rsvpClosedMessage");
  const successMessage = document.getElementById("rsvpSuccessMessage");

  const closeGate = () => {
    if (!gate) return;

    gate.hidden = true;
    body.classList.remove("rsvpLocked");
    window.sessionStorage.setItem("owirriMerchGateSeen", "true");

    const firstField = document.getElementById("guestName");
    firstField?.focus();
  };

  const gateWasSeen = window.sessionStorage.getItem("owirriMerchGateSeen");

  if (gate && gateWasSeen === "true") {
    gate.hidden = true;
    body.classList.remove("rsvpLocked");
  }

  skipButton?.addEventListener("click", closeGate);
  closeButton?.addEventListener("click", closeGate);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && gate && !gate.hidden) {
      closeGate();
    }
  });

  /* RSVP closes 30 October 2026 at 11:59:59 PM East Africa Time. */
  const deadline = new Date("2026-10-30T23:59:59+03:00").getTime();
  const rsvpIsClosed = Date.now() > deadline;

  if (rsvpIsClosed) {
    if (form) form.hidden = true;
    if (closedMessage) closedMessage.hidden = false;
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton?.textContent;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending RSVP...";
    }

    try {
      const response = await window.fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("RSVP submission failed.");
      }

      form.reset();
      form.hidden = true;

      if (successMessage) {
        successMessage.hidden = false;
        successMessage.focus?.();
      }
    } catch (error) {
      window.alert(
        "Your RSVP could not be sent. Please check your connection and try again."
      );

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
})();
