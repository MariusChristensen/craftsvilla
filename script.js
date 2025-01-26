document.addEventListener("DOMContentLoaded", initializeBookingSystem);

function initializeBookingSystem() {
  const state = {
    currentStep: 0,
    bookingConfirmed: false,
    elements: {
      steps: document.querySelectorAll(".booking-step"),
      progressSteps: document.querySelectorAll(".progress-step"),
      bookingContainer: document.querySelector(".booking-container"),
    },
  };

  if (state.elements.bookingContainer) {
    state.elements.bookingContainer.addEventListener("click", (e) => handleBookingEvents(e, state));
  }
}

function handleBookingEvents(e, state) {
  if (state.bookingConfirmed) return;

  if (e.target.classList.contains("btn-primary") && !e.target.innerText.includes("Confirm")) {
    handleNextStep(state);
  }
  if (e.target.classList.contains("btn-secondary")) {
    handleBackStep(state);
  }
  if (e.target.classList.contains("btn-primary") && e.target.innerText.includes("Confirm")) {
    handleConfirmation(state);
  }
}

function handleNextStep(state) {
  const currentInputs = state.elements.steps[state.currentStep].querySelectorAll("input, select");

  if (!validateInputs(currentInputs)) return;

  if (state.currentStep === 2) {
    updateBookingSummary();
  }

  updateStepVisibility(state, state.currentStep + 1);
}

function handleBackStep(state) {
  updateStepVisibility(state, state.currentStep - 1);
}

function handleConfirmation(state) {
  const summary = document.querySelector(".booking-summary");
  const progressBar = document.querySelector(".booking-progress");
  const bookingTitle = document.querySelector(".booking-section h2");
  const stepTitle = document.querySelector("#step-4 h3");
  const name = document.getElementById("fullname").value;

  summary.innerHTML = `
    <h3>Thank you for your booking, ${name}!</h3>
    <p>We've sent a confirmation email with all the details.<br>Looking forward to seeing you!</p>
  `;

  const stepButtons = document.querySelector("#step-4 .step-buttons");
  stepButtons.style.display = "none";
  progressBar.style.display = "none";
  bookingTitle.style.display = "none";
  stepTitle.style.display = "none";
  state.bookingConfirmed = true;
}

function validateInputs(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.value) {
      isValid = false;
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "#ddd";
    }
  });
  return isValid;
}

function updateStepVisibility(state, newStep) {
  state.elements.steps[state.currentStep].classList.remove("active");
  state.elements.progressSteps[state.currentStep].classList.remove("active");
  state.currentStep = newStep;
  state.elements.steps[state.currentStep].classList.add("active");
  state.elements.progressSteps[state.currentStep].classList.add("active");
}

function updateBookingSummary() {
  const summary = document.querySelector(".booking-summary");
  const bookingData = {
    workshop: document.getElementById("workshop").value,
    date: document.getElementById("booking-date").value,
    time: document.getElementById("booking-time").value,
    name: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  const formattedDate = new Date(bookingData.date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  summary.innerHTML = `
    <h3>Booking Details</h3>
    <p><strong>Workshop:</strong> ${bookingData.workshop}</p>
    <p><strong>Date:</strong> ${formattedDate}</p>
    <p><strong>Time:</strong> ${bookingData.time}</p>
    <p><strong>Name:</strong> ${bookingData.name}</p>
    <p><strong>Email:</strong> ${bookingData.email}</p>
    <p><strong>Phone:</strong> ${bookingData.phone}</p>
    <p>Please confirm if these details are correct.</p>
  `;
}
