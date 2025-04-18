const listings = [
  { listingId: 288675, listingName: "9F-89 (S)" },
  { listingId: 288676, listingName: "9F-85 (3B)" },
  { listingId: 288677, listingName: "1F-14 (2B)" },
  { listingId: 288678, listingName: "9F-82 (1B)" },
  { listingId: 288679, listingName: "7F-64 (1B)" },
  { listingId: 288681, listingName: "6F-54 (1B)" },
  { listingId: 288682, listingName: "GF-09 (S)" },
  { listingId: 288683, listingName: "8f-74 (2B)" },
  { listingId: 288684, listingName: "2F-24 (2B)" },
  { listingId: 288685, listingName: "7F-70 (2B)" },
  { listingId: 288686, listingName: "2F-22 (3B)" },
  { listingId: 288687, listingName: "2F-25 (2B)" },
  { listingId: 288688, listingName: "1F-12 (2B)" },
  { listingId: 288689, listingName: "9F-87 (2B)" },
  { listingId: 288690, listingName: "GF-01 (S)" },
  { listingId: 288691, listingName: "3F-27 (1B)" },
  { listingId: 288723, listingName: "8f-73 (1B)" },
  { listingId: 288724, listingName: "9F-88 (2B)" },
  { listingId: 288726, listingName: "7F-63 (1B)" },
  { listingId: 288977, listingName: "3F-34 (2B)" },
  { listingId: 305055, listingName: "GF-04 (2B)" },
  { listingId: 305069, listingName: "3F-28 (1B)" },
  { listingId: 305327, listingName: "5F-49 (3B)" },
  { listingId: 306032, listingName: "2F-18 (1B)" },
  { listingId: 306543, listingName: "8F-79 (2B)" },
  { listingId: 307143, listingName: "1F-15 (1B)" },
  { listingId: 309909, listingName: "GF-06 (2B)" },
  { listingId: 323227, listingName: "4F-42 (2B)" },
  { listingId: 323229, listingName: "1F-10 (A) (S)" },
  { listingId: 323258, listingName: "1F-10 (B) (1B)" },
  { listingId: 323261, listingName: "1F-10 (C) (S)" },
  { listingId: 336255, listingName: "8F-80 (S)" },
  { listingId: 378076, listingName: "6F-60 (2B)" },
  { listingId: 378078, listingName: "6F-57 (2B)" },
];

// Maps listingId to listing name
const listingsMap = new Map(
  listings.map((listing) => [listing.listingId, listing.listingName])
);

// Dashboard functionality with animations
const API_URL = "https://api.hostaway.com/v1/reservations";
const API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4MDA2NiIsImp0aSI6ImNhYzRlNzlkOWVmZTBiMmZmOTBiNzlkNTEzYzIyZTU1MDhiYWEwNWM2OGEzYzNhNzJhNTU1ZmMzNDI4OTQ1OTg2YWI0NTVjNmJjOWViZjFkIiwiaWF0IjoxNzM2MTY3ODExLjgzNTUyNCwibmJmIjoxNzM2MTY3ODExLjgzNTUyNiwiZXhwIjoyMDUxNzAwNjExLjgzNTUzMSwic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjUzOTUyfQ.Mmqfwt5R4CK5AHwNQFfe-m4PXypLLbAPtzCD7CxgjmagGa0AWfLzPM_panH9fCbYbC1ilNpQ-51KOQjRtaFT3vR6YKEJAUkUSOKjZupQTwQKf7QE8ZbLQDi0F951WCPl9uKz1nELm73V30a8rhDN-97I43FWfrGyqBgt7F8wPkE";

// Show loading state
const loading = document.getElementById("loading");
loading.style.display = "block";

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

// Fetch reservations
async function fetchReservations() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `HTTP error! status: ${response.status}\nResponse: ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await response.json();
    // console.log("API Response:", JSON.stringify(data, null, 2));

    // Handle API response structure
    let reservations = [];

    if (data && typeof data === "object") {
      if (data.status && data.result && Array.isArray(data.result)) {
        reservations = data.result;
      } else {
        throw new Error(
          `Invalid API response format. Expected structure not found.`
        );
      }
    } else {
      throw new Error(
        `Invalid API response format. Response type: ${typeof data}`
      );
    }

    // Process reservations to find staying guests
    const stayingGuests = reservations
      .filter((reservation) => {
        const arrivalDate = new Date(reservation.arrivalDate);
        const departureDate = new Date(reservation.departureDate);
        return arrivalDate <= new Date() && new Date() < departureDate;
      })
      .map((reservation) => ({
        hostawayReservationId:
          reservation.hostawayReservationId || "Unknown ID",
        guestName: reservation.guestName || "Unknown Guest",
        listingMapId: reservation.listingMapId || "N/A",
        listingName:
          listingsMap.get(reservation.listingMapId) || reservation.listingMapId,
        arrivalDate: reservation.arrivalDate,
        departureDate: reservation.departureDate,
        nights: Math.ceil(
          (new Date(reservation.departureDate) -
            new Date(reservation.arrivalDate)) /
            (1000 * 60 * 60 * 24)
        ),
      }));

    // Find double bookings
    const doubleBookings = findDoubleBookings(reservations, today);
    displayDoubleBookings(doubleBookings);

    // Calculate statistics
    const stats = {
      totalStaying: stayingGuests.length,
      avgStay:
        stayingGuests.reduce((sum, guest) => {
          const checkIn = new Date(guest.arrivalDate);
          const checkOut = new Date(guest.departureDate);
          return sum + Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        }, 0) / stayingGuests.length || 0,
    };

    // Update statistics
    document.getElementById("totalStaying").textContent = stats.totalStaying;
    document.getElementById("avgStay").textContent = Math.round(stats.avgStay);

    // Display staying guests
    displayStayingGuests(stayingGuests);

    // Also display today's reservations

    displayReservations(reservations);

    const todayArrivals = reservations.filter((res) => {
      const arrivalDateStr = new Date(res.arrivalDate)
        .toISOString()
        .split("T")[0];
      return arrivalDateStr === today;
    });
    // console.log(todayArrivals);

    document.querySelector("#totalReservations .value").textContent =
      todayArrivals.length;

    anime({
      targets: "#totalReservations .value",
      innerHTML: [0, todayArrivals.length],
      round: 1,
      duration: 800,
      easing: "easeOutExpo",
    });

    // Hide loading and show content
    loading.style.display = "none";
  } catch (error) {
    console.error("Error fetching reservations:", error);
    showError(error.message);
  }
}

// Display staying guests
function displayStayingGuests(guests) {
  const container = document.getElementById("stayingGuestCards");
  container.innerHTML = "";

  if (guests.length === 0) {
    const noGuests = document.createElement("div");
    noGuests.className = "no-guests";
    noGuests.textContent = "No guests are currently staying.";
    container.appendChild(noGuests);
    return;
  }

  guests.forEach((guest) => {
    const card = document.createElement("div");
    card.className = "guest-card";

    card.innerHTML = `
      <div class="guest-col hostaway-id">${guest.hostawayReservationId}</div>
      <div class="guest-col name">${guest.guestName}</div>
      <div class="guest-col listing">${guest.listingName}</div>
      <div class="guest-col nights">${guest.nights} nights</div>
      <div class="guest-col duration">
        <div class="date-pair">
          <div class="date-label">Arrival:</div>
          <div class="date-value">${new Date(
            guest.arrivalDate
          ).toLocaleDateString()}</div>
        </div>
        <div class="date-pair">
          <div class="date-label">Departure:</div>
          <div class="date-value">${new Date(
            guest.departureDate
          ).toLocaleDateString()}</div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Animate staying guests
  if (guests.length > 0) {
    anime({
      targets: ".guest-card",
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: anime.stagger(100),
      duration: 700,
      easing: "easeOutCirc",
    });
  }
}

// Function to categorize reservations
function categorizeReservations(reservations) {
  const today = new Date();
  const categorized = {
    expectedCheckIns: [],
    expectedCheckOuts: [],
    actualCheckIns: [],
    actualCheckOuts: [],
  };

  reservations.forEach((reservation) => {
    // Check if the reservation is already checked in or out
    if (reservation.status === "checked_in") {
      categorized.actualCheckIns.push(reservation);
    } else if (reservation.status === "checked_out") {
      categorized.actualCheckOuts.push(reservation);
    } else {
      const arrivalDate = new Date(reservation.arrivalDate);
      const departureDate = new Date(reservation.departureDate);

      if (arrivalDate.toDateString() === today.toDateString()) {
        categorized.expectedCheckIns.push(reservation);
      } else if (departureDate.toDateString() === today.toDateString()) {
        categorized.expectedCheckOuts.push(reservation);
      }
    }
  });

  return categorized;
}

// Function to display reservations in their respective sections
function displayReservations(reservations) {
  const categorized = categorizeReservations(reservations);

  // Clear existing lists
  [
    "actualCheckIns",
    "actualCheckOuts",
    "expectedCheckIns",
    "expectedCheckOuts",
  ].forEach((section) => {
    document.getElementById(`${section}List`).innerHTML = "";
  });

  // Display each section
  Object.entries(categorized).forEach(([section, reservations]) => {
    const container = document.getElementById(`${section}List`);
    if (container) {
      reservations.forEach((reservation) => {
        const card = createReservationCard(reservation, section);
        container.appendChild(card);
      });
    }
  });

  // Update the count display
  const todayCheckInsCount = document.getElementById("todayCheckInsCount");
  if (todayCheckInsCount) {
    todayCheckInsCount.textContent = categorized.expectedCheckIns.length;
  }

  const todayCheckOutsCount = document.getElementById("todayCheckOutsCount");
  if (todayCheckOutsCount) {
    todayCheckOutsCount.textContent = categorized.expectedCheckOuts.length;
  }
}

// Display reservations with animations
function displayReservationsWithAnimations(reservations) {
  if (!Array.isArray(reservations)) {
    console.error("Invalid data format:", reservations);
    showError();
    return;
  }

  const stats = {
    total: reservations.length,
    upcoming: 0,
    completed: 0,
  };

  // Update stats
  reservations.forEach((reservation) => {
    if (reservation.status === "confirmed") {
      stats.upcoming++;
    } else if (reservation.status === "completed") {
      stats.completed++;
    }
  });

  // Animate stats
  animateStats(stats);

  // Animate stat cards
  anime({
    targets: ".stat-card",
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    delay: anime.stagger(150),
    easing: "easeOutBack",
  });

  // Create reservation cards
  const reservationsList = document.getElementById("reservationsList");
  reservationsList.innerHTML = "";

  reservations.forEach((reservation) => {
    const card = createReservationCard(reservation);
    reservationsList.appendChild(card);
  });

  // Animate reservation cards
  if (reservations.length > 0) {
    anime({
      targets: ".reservation-card",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(80),
      duration: 600,
      easing: "easeOutSine",
    });
  }
}

// Create a reservation card
function createReservationCard(reservation, sectionType) {
  const card = document.createElement("div");
  card.className =
    "reservation-card" + (reservation.isOverdue ? " overdue" : "");
  card.setAttribute("data-res-id", reservation.hostawayReservationId);

  const statusIndicator = document.createElement("div");
  statusIndicator.className =
    "status-indicator " +
    (reservation.status === "checked_in" || reservation.status === "checked_out"
      ? "status-completed"
      : "status-pending");

  const arrivalDate = new Date(reservation.arrivalDate);
  const departureDate = new Date(reservation.departureDate);
  const duration = Math.ceil(
    (departureDate - arrivalDate) / (1000 * 60 * 60 * 24)
  );

  card.innerHTML = `
    <div class="reservation-header">
      <h3>${reservation.guestName || "Unknown Guest"}</h3>
      <span class="reservation-id">Reservation ID: ${
        reservation.hostawayReservationId || "N/A"
      }</span>
    </div>
    <div class="reservation-details">
      <div class="detail-row">
        <span>Listing:</span>
        <span>${
          listingsMap.get(reservation.listingMapId) ||
          reservation.listingMapId ||
          "N/A"
        }</span>
      </div>
      <div class="detail-row">
        <span>Duration:</span>
        <span>${reservation.nights} nights</span>
      </div>
      <div class="detail-row">
        <span>Arrival:</span>
        <span>${reservation.arrivalDate}</span>
      </div>
      <div class="detail-row">
        <span>Departure:</span>
        <span>${reservation.departureDate}</span>
      </div>
    </div>
    <div class="reservation-actions">
      ${
        sectionType === "expectedCheckIns"
          ? `
        <button class="check-in-btn" data-res-id="${reservation.hostawayReservationId}">Mark Check In</button>
      `
          : ""
      }
      ${
        sectionType === "expectedCheckOuts"
          ? `
        <button class="check-out-btn" data-res-id="${reservation.hostawayReservationId}">Mark Check Out</button>
      `
          : ""
      }
      ${
        sectionType === "actualCheckIns" || sectionType === "actualCheckOuts"
          ? `
        <button class="print-btn" data-res-id="${
          reservation.hostawayReservationId
        }" data-type="${
              sectionType === "actualCheckIns" ? "checkin" : "checkout"
            }">Print ${
              sectionType === "actualCheckIns" ? "Check-in" : "Check-out"
            }</button>
      `
          : ""
      }
    </div>
  `;

  // Add event listeners for the new buttons
  setTimeout(() => {
    const checkInBtn = card.querySelector(".check-in-btn");
    const checkOutBtn = card.querySelector(".check-out-btn");
    const printBtn = card.querySelector(".print-btn");

    if (checkInBtn) {
      checkInBtn.addEventListener("click", () => handleCheckIn(reservation));
    }
    if (checkOutBtn) {
      checkOutBtn.addEventListener("click", () => handleCheckOut(reservation));
    }
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        const printType = printBtn.getAttribute("data-type");
        handlePrint(reservation.hostawayReservationId, printType);
      });
    }
  }, 0);

  return card;
}

// Function to handle check-in
function handleCheckIn(reservationId) {
  const expectedCheckInsList = document.querySelector("#expectedCheckInsList");
  const actualCheckInsList = document.querySelector("#actualCheckInsList");

  if (!expectedCheckInsList || !actualCheckInsList) {
    console.error("Check-in lists not found");
    return;
  }

  const reservationCard = expectedCheckInsList.querySelector(
    `.reservation-card[data-res-id="${reservationId}"]`
  );

  if (reservationCard) {
    actualCheckInsList.appendChild(reservationCard);

    const sectionTypeElement = reservationCard.querySelector(".section-type");
    if (sectionTypeElement) {
      sectionTypeElement.textContent = "Actual Check-in";
    }

    const checkInBtn = reservationCard.querySelector(".check-in-btn");
    if (checkInBtn) {
      checkInBtn.remove();
    }

    // Add print button if it doesn't exist
    const printBtn = reservationCard.querySelector(".print-btn");
    if (!printBtn) {
      const printButton = document.createElement("button");
      printButton.className = "print-btn";
      printButton.setAttribute("data-res-id", reservationId);
      printButton.setAttribute("data-type", "checkin");
      printButton.textContent = "Print Check-in";

      // Add to actions div
      const actionsDiv = reservationCard.querySelector(".reservation-actions");
      if (actionsDiv) {
        actionsDiv.appendChild(printButton);
      }

      // Add event listener
      printButton.addEventListener("click", () => {
        handlePrint(reservationId, "checkin");
      });
    }

    updateUI();
  }
}

function updateUI() {
  // Update the count of expected check-ins
  const expectedCheckInsCount = document.getElementById("todayCheckInsCount");
  if (expectedCheckInsCount) {
    const expectedCheckIns = document.querySelectorAll(
      "#expectedCheckInsList .reservation-card"
    );
    expectedCheckInsCount.textContent = expectedCheckIns.length;
  }

  // Update the count of actual check-ins
  const actualCheckInsCount = document.getElementById("actualCheckInsCount");
  if (actualCheckInsCount) {
    const actualCheckIns = document.querySelectorAll(
      "#actualCheckInsList .reservation-card"
    );
    actualCheckInsCount.textContent = actualCheckIns.length;
  }

  // Update the count of expected check-outs
  const expectedCheckOutsCount = document.getElementById("todayCheckOutsCount");
  if (expectedCheckOutsCount) {
    const expectedCheckOuts = document.querySelectorAll(
      "#expectedCheckOutsList .reservation-card"
    );
    expectedCheckOutsCount.textContent = expectedCheckOuts.length;
  }

  // Update the count of actual check-outs
  const actualCheckOutsCount = document.getElementById("actualCheckOutsCount");
  if (actualCheckOutsCount) {
    const actualCheckOuts = document.querySelectorAll(
      "#actualCheckOutsList .reservation-card"
    );
    actualCheckOutsCount.textContent = actualCheckOuts.length;
  }
}

// Function to handle check-out
function handleCheckOut(reservationId) {
  const expectedCheckOutsList = document.querySelector(
    "#expectedCheckOutsList"
  );
  const actualCheckOutsList = document.querySelector("#actualCheckOutsList");

  if (!expectedCheckOutsList || !actualCheckOutsList) {
    console.error("Check-out lists not found");
    return;
  }

  const reservationCard = expectedCheckOutsList.querySelector(
    `.reservation-card[data-res-id="${reservationId}"]`
  );

  if (reservationCard) {
    actualCheckOutsList.appendChild(reservationCard);

    // Update section type
    const sectionTypeElement = reservationCard.querySelector(".section-type");
    if (sectionTypeElement) {
      sectionTypeElement.textContent = "Actual Check-out";
    }

    // Remove check-out button
    const checkOutBtn = reservationCard.querySelector(".check-out-btn");
    if (checkOutBtn) {
      checkOutBtn.remove();
    }

    // Add print button if it doesn't exist
    const printBtn = reservationCard.querySelector(".print-btn");
    if (!printBtn) {
      const printButton = document.createElement("button");
      printButton.className = "print-btn";
      printButton.setAttribute("data-res-id", reservationId);
      printButton.setAttribute("data-type", "checkout");
      printButton.textContent = "Print Check-out";

      // Add to actions div
      const actionsDiv = reservationCard.querySelector(".reservation-actions");
      if (actionsDiv) {
        actionsDiv.appendChild(printButton);
      }

      // Add event listener
      printButton.addEventListener("click", () => {
        handlePrint(reservationId, "checkout");
      });
    }

    updateUI();
  }
}

// Add event listener for check-in and check-out buttons
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-in-btn")) {
      const reservationId = e.target.getAttribute("data-res-id");
      if (reservationId) {
        handleCheckIn(reservationId);
      }
    } else if (e.target.classList.contains("check-out-btn")) {
      const reservationId = e.target.getAttribute("data-res-id");
      if (reservationId) {
        handleCheckOut(reservationId);
      }
    } else if (e.target.classList.contains("print-btn")) {
      const reservationId = e.target.getAttribute("data-res-id");
      const printType = e.target.getAttribute("data-type");
      if (reservationId) {
        handlePrint(reservationId, printType);
      }
    }
  });
});

// Function to handle print
function handlePrint(reservationId, printType) {
  // Find the reservation card
  const card = document.querySelector(
    `.reservation-card[data-res-id="${reservationId}"]`
  );
  if (!card) return;

  // Get all the reservation details
  const guestName = card.querySelector(".reservation-header h3").textContent;
  const reservationIdText = card.querySelector(".reservation-id").textContent;
  const listing = card.querySelector(
    ".detail-row:nth-child(1) span:nth-child(2)"
  ).textContent;
  const duration = card.querySelector(
    ".detail-row:nth-child(2) span:nth-child(2)"
  ).textContent;
  const arrival = card.querySelector(
    ".detail-row:nth-child(3) span:nth-child(2)"
  ).textContent;
  const departure = card.querySelector(
    ".detail-row:nth-child(4) span:nth-child(2)"
  ).textContent;

  // Get additional details from the card
  const cnic =
    card.querySelector(".detail-row:nth-child(5) span:nth-child(2)")
      ?.textContent || "N/A";
  const address =
    card.querySelector(".detail-row:nth-child(6) span:nth-child(2)")
      ?.textContent || "N/A";
  const email =
    card.querySelector(".detail-row:nth-child(7) span:nth-child(2)")
      ?.textContent || "N/A";
  const contact =
    card.querySelector(".detail-row:nth-child(8) span:nth-child(2)")
      ?.textContent || "N/A";
  const adults =
    card.querySelector(".detail-row:nth-child(9) span:nth-child(2)")
      ?.textContent || "N/A";
  const children =
    card.querySelector(".detail-row:nth-child(10) span:nth-child(2)")
      ?.textContent || "N/A";
  const vehicleNo =
    card.querySelector(".detail-row:nth-child(11) span:nth-child(2)")
      ?.textContent || "N/A";
  const securityDeposit =
    card.querySelector(".detail-row:nth-child(12) span:nth-child(2)")
      ?.textContent || "N/A";
  const listingMapId = card.querySelector(
    ".detail-row:nth-child(1) span:nth-child(2)"
  ).textContent;
  const type =
    card.querySelector(".detail-row:nth-child(13) span:nth-child(2)")
      ?.textContent || "N/A";
  const checkInTime =
    card.querySelector(".detail-row:nth-child(14) span:nth-child(2)")
      ?.textContent || "N/A";
  const checkOutTime =
    card.querySelector(".detail-row:nth-child(15) span:nth-child(2)")
      ?.textContent || "N/A";
  const earlyCheckIn =
    card.querySelector(".detail-row:nth-child(16) span:nth-child(2)")
      ?.textContent || "N/A";
  const pricePerNight =
    card.querySelector(".detail-row:nth-child(17) span:nth-child(2)")
      ?.textContent || "N/A";
  const smartLockCode =
    card.querySelector(".detail-row:nth-child(18) span:nth-child(2)")
      ?.textContent || "N/A";
  const amount =
    card.querySelector(".detail-row:nth-child(19) span:nth-child(2)")
      ?.textContent || "N/A";

  // Create print content based on type
  let printContent;
  if (printType === "checkin") {
    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <link
            rel="icon"
            href="https://i.ibb.co/vC3k9ZXv/favicon-32x32.png"
            type="image/png"
          />
          <style>
            /* Insert your entire <style> block here exactly as-is */
            input[readonly] {
              pointer-events: none;
              user-select: none;
            }
            body {
              margin: 0;
              padding: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 80vh;
              background-color: #f0f0f0;
            }
            .form {
              width: 150mm;
              height: 240mm;
              padding: 10px;
              margin: auto;
              background-color: white;
              border-radius: 5px;
              border: 1px solid lightblue;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .logo-img {
              display: flex;
              justify-content: center;
              width: 100%;
              height: 60px;
              margin: 10px auto;
            }
            .logo-img img {
              height: 100%;
              width: auto;
              object-fit: contain;
            }
            .heading-text h1 {
              padding-bottom: 0.5rem !important;
              font-size: 20px;
              text-align: center;
            }
            .form-container {
              display: flex;
              gap: 20px;
              padding: 10px;
            }
            .left-section,
            .right-section {
              flex: 1;
            }
            .form-field {
              margin-bottom: 15px;
            }
            .form-field label {
              display: inline-block;
              width: 80px;
              font-size: 12px;
            }
            .form-field input {
              width: calc(100% - 90px);
              background: transparent;
              border: none;
              border-bottom: 1px solid #000000;
            }
            .address-field input {
              width: calc(100% - 90px);
            }
            ul {
              padding-top: 2px;
              padding-bottom: 10px;
            }
            ul li {
              font-size: 11px;
              line-height: 1.2;
              margin-bottom: 2px;
            }
            .space {
              padding: 8px !important;
            }
            .row .row-field {
              margin-top: 5px;
            }
            .row .row-field h3 {
              font-size: 10px;
              margin: 4px 0 !important;
            }
            .row .row-field h4 {
              font-size: 10px;
              margin: 4px 0 !important;
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="form">
            <div class="logo-img">
              <img src="https://i.pinimg.com/736x/c9/21/bb/c921bba6d1bf0bbb29b31cae3d8df684.jpg" alt="logo" />
            </div>
            <div class="heading-text">
              <h1 style="padding-top: 0px">CheckIn Form</h1>
            </div>
            <div class="form-container">
              <div class="left-section">
                <div class="form-field"><label>Name:</label><input value="${guestName}" readonly /></div>
                <div class="form-field"><label>CNIC:</label><input value="${cnic}" readonly /></div>
                <div class="form-field address-field"><label>Address:</label><input value="${address}" readonly /></div>
                <div class="form-field"><label>Email:</label><input value="${email}" readonly /></div>
                <div class="form-field"><label>Contact:</label><input value="${contact}" readonly /></div>
                <div class="form-field"><label>Total Nights:</label><input value="${duration}" readonly /></div>
                <div class="form-field"><label>Total Amount:</label><input value="${amount}" readonly /></div>
                <div class="form-field"><label>Early Check-in:</label><input value="${earlyCheckIn}" readonly /></div>
                <div class="form-field"><label>Price/Night:</label><input value="${pricePerNight}" readonly /></div>
                <div class="form-field"><label>Smart Lock Code:</label><input value="${smartLockCode}" readonly /></div>
              </div>
              <div class="right-section">
                <div class="form-field"><label>Unit:</label><input value="${listingMapId}" readonly /></div>
                <div class="form-field"><label>Type:</label><input value="${type}" readonly /></div>
                <div class="form-field"><label>Adults:</label><input value="${adults}" readonly /></div>
                <div class="form-field"><label>Children:</label><input value="${children}" readonly /></div>
                <div class="form-field"><label>Check-in Date:</label><input value="${arrival}" readonly /></div>
                <div class="form-field"><label>Check-in Time:</label><input value="${checkInTime}" readonly /></div>
                <div class="form-field"><label>Check-out Date:</label><input value="${departure}" readonly /></div>
                <div class="form-field"><label>Check-out Time:</label><input value="${checkOutTime}" readonly /></div>
                <div class="form-field"><label>Vehicle No:</label><input value="${vehicleNo}" readonly /></div>
                <div class="form-field"><label>Security Deposit:</label><input value="${securityDeposit}" readonly /></div>
              </div>
            </div>
            <div class="space" style="padding: 15px">
              <div class="terms">
                <h3 style="margin: 0px; text-align: left">Terms and Conditions</h3>
                <ul>
                  <li>Original CNIC or Passport is required at the time of Check-in.</li>
                  <li>Only one car parking is allowed inside the building per apartment.</li>
                  <li>Pets are not allowed.</li>
                  <li>Rights of Admission reserved.</li>
                  <li>It is mandatory for guests to maintain a peaceful environment.</li>
                  <li>Anti-Social Behaviour and unethical activities are strictly prohibited.</li>
                  <li>Guests are requested to submit their CNIC at the time of check-in.</li>
                  <li>Guests are requested to check out before 12:00pm on the day of check-out.</li>
                  <li>Guests will bear financial liability for any damage inside the apartment and building due to their fault/negligence.</li>
                  <li>Guests are requested to submit any complaints regarding the quality of services at the reception desk.</li>
                  <li>Money/Jewelry or other valuables brought to the property are at the guest's sole risk.</li>
                </ul>
              </div>
              <div class="row">
                <div class="row-field" style="display: flex; justify-content: space-between; align-items: center; margin-top: 40px;">
                  <div class="inner-col" style="text-align: left">
                    <div style="border-bottom: 1px solid black; width: 200px; margin-bottom: 5px;"></div>
                    <h3>Management Team</h3>
                  </div>
                  <div class="inner-col" style="text-align: right">
                    <div style="border-bottom: 1px solid black; width: 200px; margin-bottom: 5px; margin-left: auto;"></div>
                    <h3>Guest Signature</h3>
                  </div>
                </div>
                <div class="row-field" style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
                  <div class="inner-col" style="text-align: left">
                    <h3>CHECK OUT TIME 12:00 NOON</h3>
                    <h4>Late Check Out charges applicable @ Rs. 1000 per hour</h4>
                  </div>
                  <div class="inner-col" style="text-align: right">
                    <h4>0300-0454711</h4>
                    <h4>30-A, BLOCK L, GULBERG 3, LAHORE</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  } else if (printType === "checkout") {
    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .print-details {
              margin: 15px 0;
            }
            .print-details div {
              margin: 10px 0;
              display: flex;
              align-items: center;
            }
            .print-details label {
              font-weight: bold;
              margin-right: 10px;
            }
            .print-footer {
              margin-top: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Check-out Confirmation</h1>
            <h3>HostAway Property Management</h3>
          </div>
          <div class="print-details">
            <div><label>Guest Name:</label> ${guestName}</div>
            <div><label>Reservation ID:</label> ${reservationIdText}</div>
            <div><label>Unit:</label> ${listingMapId}</div>
            <div><label>Duration of Stay:</label> ${duration}</div>
            <div><label>Check-in Date:</label> ${arrival}</div>
            <div><label>Check-out Date:</label> ${departure}</div>
          </div>
          <div class="print-footer">
            <p>Thank you for staying with us. We hope to see you again soon!</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;
  }

  // Create a new window with the print content
  const printWindow = window.open("", "_blank");

  // Check if window exists
  if (!printWindow) {
    console.error("Print window blocked by popup blocker");
    return;
  }

  // Wait for the window to load
  printWindow.onload = function () {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  // Fallback in case onload doesn't work
  setTimeout(() => {
    if (printWindow && !printWindow.closed) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  }, 100);
}

// Animate stats
function animateStats(stats) {
  const animateNumber = (element, targetValue) => {
    const currentValue = parseInt(element.textContent);
    anime({
      targets: element,
      innerHTML: targetValue,
      round: 1,
      duration: 1000,
      easing: "easeOutQuad",
    });
  };

  animateNumber(
    document.querySelector("#totalReservations .value"),
    stats.total
  );
  // animateNumber(
  //   document.querySelector("#upcomingReservations .value"),
  //   stats.upcoming
  // );
  // animateNumber(
  //   document.querySelector("#completedReservations .value"),
  //   stats.completed
  // );
}

// Show error state
function showError(message = "Error loading reservations") {
  const error = document.getElementById("error");
  error.textContent = message;
  error.style.display = "block";
  loading.style.display = "none";
}

// Fetch and display listings with IDs and names
async function fetchAndDisplayListings() {
  try {
    const response = await fetch("https://api.hostaway.com/v1/listings", {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    let listings = [];

    if (data.result && Array.isArray(data.result)) {
      listings = data.result;
    } else if (Array.isArray(data)) {
      listings = data;
    } else {
      console.error("Unexpected response structure:", data);
      return;
    }

    // listings.forEach((listing) => {
    //   const id = listing.id || "N/A";
    //   const mapId = listing.internalListingName || "N/A";
    //   const name = listing.name || "Unknown Listing";
    //   listingsMap.set(mapId, name);
    //   console.log(`Listing ID: ${id}, Listing Name: ${mapId}`);
    // });
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

// Function to fetch and display reservations for a given date (YYYY-MM-DD)
async function fetchReservationsByDate(targetDateStr) {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch reservations");

    const data = await response.json();
    const reservations = Array.isArray(data.result) ? data.result : [];

    // 🎯 Only keep reservations with status 'new' or 'modified'
    const validStatuses = ["new", "modified"];
    const filteredByStatus = reservations.filter((res) =>
      validStatuses.includes(res.status)
    );

    // Filter by arrival or departure matching selected date
    const filteredReservations = filteredByStatus.filter((res) => {
      const arrival = new Date(res.arrivalDate).toISOString().split("T")[0];
      const departure = new Date(res.departureDate).toISOString().split("T")[0];
      return arrival === targetDateStr || departure === targetDateStr;
    });

    // Categorize and display reservations
    displayReservations(filteredReservations, targetDateStr);

    // Staying Guests for selected date
    const selectedDate = new Date(targetDateStr);
    const stayingGuests = filteredByStatus
      .filter((res) => {
        const arrival = new Date(res.arrivalDate);
        const departure = new Date(res.departureDate);
        return arrival <= selectedDate && selectedDate < departure;
      })
      .map((res) => ({
        hostawayReservationId: res?.hostawayReservationId,
        guestName: res?.guestName,
        listingMapId: res?.listingMapId,
        listingName: listingsMap.get(res?.listingMapId) || res?.listingMapId,
        arrivalDate: res?.arrivalDate,
        departureDate: res?.departureDate,
        nights:
          res?.departureDate && res?.arrivalDate
            ? Math.ceil(
                (new Date(res.departureDate) - new Date(res.arrivalDate)) /
                  (1000 * 60 * 60 * 24)
              )
            : 0,
        status: res?.status,
      }));

    // Update staying stats
    document.getElementById("totalStaying").textContent = stayingGuests.length;
    document.getElementById("avgStay").textContent = Math.round(
      stayingGuests.reduce((sum, guest) => {
        const checkIn = new Date(guest.arrivalDate);
        const checkOut = new Date(guest.departureDate);
        return sum + Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      }, 0) / stayingGuests.length || 0
    );

    displayStayingGuests(stayingGuests);

    // Update total reservation count
    document.querySelector("#totalReservations .value").textContent =
      filteredReservations.length;

    anime({
      targets: "#totalReservations .value",
      innerHTML: [0, filteredReservations.length],
      round: 1,
      duration: 800,
      easing: "easeOutExpo",
    });
  } catch (err) {
    console.error("Error fetching reservations by date:", err);
  }
}

// Modify displayReservations to use specific date context
function displayReservations(reservations, selectedDateStr) {
  const categorized = categorizeReservationsForDate(
    reservations,
    selectedDateStr
  );

  // Log expected check-ins data
  console.log(
    "Expected Check-ins for",
    selectedDateStr,
    ":",
    categorized.expectedCheckIns.map((res) => ({
      reservationId: res.hostawayReservationId,
      guestName: res.guestName,
      checkInDate: res.arrivalDate,
      checkOutDate: res.departureDate,
      nights: res.nights,
      address: res.guestAddress,
      adults: res.adults,
      children: res.children,
      contact: res.phone,
      checkinTime: res.checkInTime,
      checkoutTime: res.checkOutTime,
      totalAmount: res.totalPrice,
      listingMapId: res.listingMapId,
      email: res.guestEmail,
    }))
  );

  [
    "actualCheckIns",
    "actualCheckOuts",
    "expectedCheckIns",
    "expectedCheckOuts",
  ].forEach((section) => {
    document.getElementById(`${section}List`).innerHTML = "";
  });

  Object.entries(categorized).forEach(([section, list]) => {
    const container = document.getElementById(`${section}List`);
    if (container) {
      list.forEach((reservation) => {
        const card = createReservationCard(reservation, section);
        container.appendChild(card);
      });
    }
  });

  document.querySelector("#totalReservations .value").textContent =
    categorized.expectedCheckIns.length;

  document.getElementById("todayCheckInsCount").textContent =
    categorized.expectedCheckIns.length;
  document.getElementById("todayCheckOutsCount").textContent =
    categorized.expectedCheckOuts.length;
}

// Categorize reservations specific to selected date
function categorizeReservationsForDate(reservations, selectedDateStr) {
  return reservations.reduce(
    (acc, res) => {
      const arrivalDate = new Date(res.arrivalDate).toISOString().split("T")[0];
      const departureDate = new Date(res.departureDate)
        .toISOString()
        .split("T")[0];
      const status = res.status;

      if (arrivalDate === selectedDateStr && status === "checked_in") {
        acc.actualCheckIns.push(res);
      }

      if (departureDate === selectedDateStr && status === "checked_out") {
        acc.actualCheckOuts.push(res);
      }

      if (
        arrivalDate === selectedDateStr &&
        status !== "checked_in" &&
        status !== "checked_out"
      ) {
        acc.expectedCheckIns.push(res);
      }

      if (
        departureDate === selectedDateStr &&
        status !== "checked_out" &&
        status !== "checked_in"
      ) {
        acc.expectedCheckOuts.push(res);
      }

      return acc;
    },
    {
      actualCheckIns: [],
      actualCheckOuts: [],
      expectedCheckIns: [],
      expectedCheckOuts: [],
    }
  );
}

// 🟢 At load, show today's data
document.addEventListener("DOMContentLoaded", () => {
  const todayStr = new Date().toISOString().split("T")[0];
  fetchReservationsByDate(todayStr);
});

// 📅 Handle calendar date selection
document.addEventListener("dateSelected", (e) => {
  const selectedDate = e.detail.date.toISOString().split("T")[0];
  fetchReservationsByDate(selectedDate);
});

// Function to find double bookings
function findDoubleBookings(reservations, targetDate) {
  // Return empty array if no reservations or invalid data
  if (!reservations || !Array.isArray(reservations)) {
    return [];
  }

  // Group reservations by listingMapId and date
  const groupedReservations = {};

  // Process each reservation
  reservations.forEach((reservation) => {
    if (!reservation) return;

    // Only consider reservations with status 'new' or 'modified'
    if (reservation.status !== "new" && reservation.status !== "modified") {
      return;
    }

    try {
      const arrivalDateStr = new Date(reservation.arrivalDate)
        .toISOString()
        .split("T")[0];

      // Only process if arrival date matches target date
      if (arrivalDateStr !== targetDate) {
        return;
      }

      const listingMapId = reservation.listingMapId;

      if (!groupedReservations[listingMapId]) {
        groupedReservations[listingMapId] = {};
      }

      if (!groupedReservations[listingMapId][arrivalDateStr]) {
        groupedReservations[listingMapId][arrivalDateStr] = [];
      }

      groupedReservations[listingMapId][arrivalDateStr].push(reservation);
    } catch (error) {
      console.error("Error processing reservation:", error);
    }
  });

  // Find listings with multiple reservations on the same date
  const doubleBookings = [];

  // Safely iterate over grouped reservations
  Object.entries(groupedReservations || {}).forEach(([listingMapId, dates]) => {
    Object.entries(dates || {}).forEach(([date, reservations]) => {
      if (Array.isArray(reservations) && reservations.length > 1) {
        doubleBookings.push({
          listingMapId,
          date,
          reservations: reservations.map((res) => ({
            hostawayReservationId: res?.hostawayReservationId,
            guestName: res?.guestName,
            listingMapId: res?.listingMapId,
            listingName:
              listingsMap.get(res?.listingMapId) || res?.listingMapId,
            arrivalDate: res?.arrivalDate,
            departureDate: res?.departureDate,
            nights:
              res?.departureDate && res?.arrivalDate
                ? Math.ceil(
                    (new Date(res.departureDate) - new Date(res.arrivalDate)) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0,
            status: res?.status,
          })),
        });
      }
    });
  });

  return doubleBookings;
}

// Function to display double bookings
function displayDoubleBookings(doubleBookings) {
  const container = document.getElementById("doubleBookingsList");
  container.innerHTML = "";

  if (doubleBookings.length === 0) {
    const noDoubleBookings = document.createElement("div");
    noDoubleBookings.className = "no-double-bookings";
    noDoubleBookings.textContent = "No double bookings found.";
    container.appendChild(noDoubleBookings);
    return;
  }

  doubleBookings.forEach((doubleBooking) => {
    const card = document.createElement("div");
    card.className = "double-booking-card";

    const listingName =
      listingsMap.get(doubleBooking.listingMapId) || doubleBooking.listingMapId;

    card.innerHTML = `
      <div class="guest-header">
        <div class="guest-col hostaway-id">Hostaway ID</div>
        <div class="guest-col name">Guest Name</div>
        <div class="guest-col listing-name">Listing Name</div>
        <div class="guest-col nights">Nights</div>
        <div class="guest-col status">Status</div>
        <div class="guest-col duration">Staying Duration</div>
      </div>
      ${doubleBooking.reservations
        .map(
          (res) => `
        <div class="guest-card">
          <div class="guest-col hostaway-id">${res.hostawayReservationId}</div>
          <div class="guest-col name">${res.guestName}</div>
          <div class="guest-col listing-name">${
            listingsMap.get(res.listingMapId) || res.listingMapId
          }</div>
          <div class="guest-col nights">${res.nights} nights</div>
          <div class="guest-col status">${res.status || "unknown"}</div>
          <div class="guest-col duration">
            <div class="date-pair">
              <div class="date-label">Arrival:</div>
              <div class="date-value">${new Date(
                res.arrivalDate
              ).toLocaleDateString()}</div>
            </div>
            <div class="date-pair">
              <div class="date-label">Departure:</div>
              <div class="date-value">${new Date(
                res.departureDate
              ).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    `;

    container.appendChild(card);
  });
}

// Calendar functionality
const calendarButton = document.getElementById("calendarButton");
const calendarDropdown = document.getElementById("calendarDropdown");
const calendarGrid = document.getElementById("calendarGrid");
const calendarMonthYear = document.getElementById("calendarMonthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const selectedDateText = document.getElementById("selectedDateText");

let currentDate = new Date();
let selectedDate = null;

// Toggle calendar dropdown
function toggleCalendar() {
  calendarDropdown.classList.toggle("active");

  // Close dropdown when clicking outside
  document.addEventListener(
    "click",
    (e) => {
      if (
        !calendarButton.contains(e.target) &&
        !calendarDropdown.contains(e.target)
      ) {
        calendarDropdown.classList.remove("active");
      }
    },
    { once: true }
  );
}

// Update calendar display
function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  // Update month display
  calendarMonthYear.textContent = `${firstDay.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  // Clear existing days
  calendarGrid.innerHTML = "";

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    calendarGrid.appendChild(dayElement);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;
    dayElement.dataset.date = `${year}-${month + 1}-${day}`;

    // Add today class if it's today's date
    if (
      day === currentDate.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      dayElement.classList.add("today");
    }

    // Add selected class if this date is selected
    if (
      selectedDate &&
      selectedDate.toISOString().split("T")[0] === dayElement.dataset.date
    ) {
      dayElement.classList.add("selected");
    }

    // Add click handler for date selection
    dayElement.addEventListener("click", () => {
      selectDate(new Date(year, month, day));
    });

    calendarGrid.appendChild(dayElement);
  }

  // Add empty cells for days after the last day of the month
  const totalCells = startDay + daysInMonth;
  const remainingCells = 42 - totalCells; // 6 weeks * 7 days = 42 cells
  for (let i = 0; i < remainingCells; i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    calendarGrid.appendChild(dayElement);
  }

  // Animate days after updating
  setTimeout(animateCalendarDays, 100);
}

// Select a date
function selectDate(date) {
  const selectedDateStr = date.toISOString().split("T")[0];
  const selectedDateText = document.getElementById("selectedDateText");

  // Update the selected date text
  selectedDateText.textContent = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Close the calendar dropdown
  calendarDropdown.style.display = "none";

  // Fetch reservations for the selected date
  fetchReservationsByDate(selectedDateStr).then((reservations) => {
    // Find double bookings for the selected date
    const doubleBookings = findDoubleBookings(reservations, selectedDateStr);

    // Display the double bookings
    displayDoubleBookings(doubleBookings);
  });
}

//  to check if a day has events

// Event listeners
prevMonthBtn.addEventListener("click", () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  updateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  updateCalendar();
});

// Initialize calendar
document.addEventListener("DOMContentLoaded", () => {
  // Update calendar
  updateCalendar();

  // Add click handler to calendar button
  calendarButton.addEventListener("click", toggleCalendar);
});

// Animate calendar days when they appear
function animateCalendarDays() {
  const days = document.querySelectorAll(".calendar-day");
  days.forEach((day, index) => {
    anime({
      targets: day,
      opacity: [0, 1],
      translateY: [-20, 0],
      delay: index * 50,
      duration: 500,
      easing: "easeOutQuad",
    });
  });
}

// Helper to animate sections on scroll
function animateOnView(targetSelector, animationOpts) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            ...animationOpts,
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(targetSelector)
    .forEach((el) => observer.observe(el));
}

// Apply it to all sections
animateOnView(".section", {
  opacity: [0, 1],
  translateY: [40, 0],
  duration: 1000,
  easing: "easeOutExpo",
});

// Call the function to fetch and display listings
fetchAndDisplayListings();

// Initialize
fetchReservations();
