const listings = [
  { listingId: 288675, listingName: "9F-89 (S)", listingType: "Studio" },
  { listingId: 288676, listingName: "9F-85 (3B)", listingType: "3 Bed Rooms" },
  { listingId: 288677, listingName: "1F-14 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 288678, listingName: "9F-82 (1B)", listingType: "1 Bed Room" },
  { listingId: 288679, listingName: "7F-64 (1B)", listingType: "1 Bed Room" },
  { listingId: 288681, listingName: "6F-54 (1B)", listingType: "1 Bed Room" },
  { listingId: 288682, listingName: "GF-09 (S)", listingType: "Studio" },
  { listingId: 288683, listingName: "8f-74 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 288684, listingName: "2F-24 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 288685, listingName: "7F-70 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 288686, listingName: "2F-22 (3B)", listingType: "3 Bed Rooms" },
  { listingId: 288687, listingName: "2F-25 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 288688, listingName: "1F-12 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 288689, listingName: "9F-87 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 288690, listingName: "GF-01 (S)", listingType: "Studio" },
  { listingId: 288691, listingName: "3F-27 (1B)", listingType: "1 Bed Room" },
  { listingId: 288723, listingName: "8f-73 (1B)", listingType: "1 Bed Room" },
  { listingId: 288724, listingName: "9F-88 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 288726, listingName: "7F-63 (1B)", listingType: "1 Bed Room" },
  { listingId: 288977, listingName: "3F-34 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 305055, listingName: "GF-04 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 305069, listingName: "3F-28 (1B)", listingType: "1 Bed Room" },
  { listingId: 305327, listingName: "5F-49 (3B)", listingType: "3 Bed Rooms" },
  { listingId: 306032, listingName: "2F-18 (1B)", listingType: "1 Bed Room" },
  { listingId: 306543, listingName: "8F-79 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 307143, listingName: "1F-15 (1B)", listingType: "1 Bed Room" },
  { listingId: 309909, listingName: "GF-06 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 323227, listingName: "4F-42 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 323229, listingName: "1F-10 (A) (S)", listingType: "Studio" },
  {
    listingId: 323258,
    listingName: "1F-10 (B) (1B)",
    listingType: "1 Bed Room",
  },
  { listingId: 323261, listingName: "1F-10 (C) (S)", listingType: "Studio" },
  { listingId: 336255, listingName: "8F-80 (S)", listingType: "Studio" },
  { listingId: 378076, listingName: "6F-60 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 378078, listingName: "6F-57 (2B)", listingType: "2 Bed Rooms" },
  { listingId: 383744, listingName: "5F-53 (1B)", listingType: "1 Bed Room" },
  {
    listingId: 387834,
    listingName: "Upper Crest (1B) UAE",
    listingType: "1 Bed Room",
  },
  { listingId: 389366, listingName: "1F-13 (3B)", listingType: "3 Bed Room" },
  { listingId: 392230, listingName: "Arch Tower", listingType: "Studio" },
  {
    listingId: 387833,
    listingName: "2101 Bay's Edge",
    listingType: "1 Bed Room",
  },
  { listingId: 395345, listingName: "9F-83 (2B)", listingType: "2 Bed Room" },
  { listingId: 400763, listingName: "4F-37 (1B)", listingType: "1 Bed Room" },
  { listingId: 400779, listingName: "8f-77 (2B)", listingType: "2 Bed Rooms" },
];

// Maps listingId to listing name
const listingsMap = new Map(
  listings.map((listing) => [listing.listingId, listing.listingName])
);

// Dashboard functionality with animations
const API_URL = "https://api.hostaway.com/v1/reservations";
const API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4MDA2NiIsImp0aSI6ImNhYzRlNzlkOWVmZTBiMmZmOTBiNzlkNTEzYzIyZTU1MDhiYWEwNWM2OGEzYzNhNzJhNTU1ZmMzNDI4OTQ1OTg2YWI0NTVjNmJjOWViZjFkIiwiaWF0IjoxNzM2MTY3ODExLjgzNTUyNCwibmJmIjoxNzM2MTY3ODExLjgzNTUyNiwiZXhwIjoyMDUxNzAwNjExLjgzNTUzMSwic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjUzOTUyfQ.Mmqfwt5R4CK5AHwNQFfe-m4PXypLLbAPtzCD7CxgjmagGa0AWfLzPM_panH9fCbYbC1ilNpQ-51KOQjRtaFT3vR6YKEJAUkUSOKjZupQTwQKf7QE8ZbLQDi0F951WCPl9uKz1nELm73V30a8rhDN-97I43FWfrGyqBgt7F8wPkE";

// Determine the server URL based on the current environment
const SERVER_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "http://159.223.201.156:3000";

// Show loading state
const loading = document.getElementById("loading");
loading.style.display = "block";

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

// Fetch reservations
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchDetailedReservations(reservations) {
  const detailedReservations = [];

  for (let i = 0; i < reservations.length; i++) {
    const res = reservations[i];
    try {
      const resId = res.hostawayReservationId;
      const response = await fetch(`${API_URL}/${resId}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      detailedReservations.push({
        ...res,
        customFieldValues: data.result.customFieldValues || [],
      });
    } catch (err) {
      console.warn(`Failed to fetch details for ${res.hostawayReservationId}`);
      detailedReservations.push(res); // Use original fallback
    }

    await delay(200); // ⏳ Wait 200ms before next request
  }

  return detailedReservations;
}

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
    let reservations = [];

    if (data?.status && Array.isArray(data.result)) {
      reservations = data.result;
    } else {
      throw new Error("Invalid API response format.");
    }

    // 👇 Throttled fetch of detailed reservations
    const detailedReservations = await fetchDetailedReservations(reservations);

    // Display all dashboard data
    displayReservations(detailedReservations);
    displayStayingGuests(
      detailedReservations.filter((reservation) => {
        const arrivalDate = new Date(reservation.arrivalDate);
        const departureDate = new Date(reservation.departureDate);
        return arrivalDate <= new Date() && new Date() < departureDate;
      })
    );

    const todayStr = new Date().toISOString().split("T")[0];
    const todayArrivals = detailedReservations.filter((res) => {
      const arrivalDateStr = new Date(res.arrivalDate)
        .toISOString()
        .split("T")[0];
      return arrivalDateStr === todayStr;
    });

    document.querySelector("#totalReservations .value").textContent =
      todayArrivals.length;

    anime({
      targets: "#totalReservations .value",
      innerHTML: [0, todayArrivals.length],
      round: 1,
      duration: 800,
      easing: "easeOutExpo",
    });

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
  const categorized = {
    expectedCheckIns: [],
    actualCheckIns: [],
    expectedCheckOuts: [],
    actualCheckOuts: [],
  };

  const checkInsFromStorage = JSON.parse(
    localStorage.getItem("actualCheckIns") || "{}"
  );
  const checkOutsFromStorage = JSON.parse(
    localStorage.getItem("actualCheckOuts") || "{}"
  );
  const todayStr = new Date().toISOString().split("T")[0];

  reservations.forEach((reservation) => {
    if (!reservation) return;

    const resId = reservation.hostawayReservationId;
    const arrivalDate = reservation.arrivalDate?.split("T")[0];
    const departureDate = reservation.departureDate?.split("T")[0];

    // If checked out, always show in actual checkouts
    if (checkOutsFromStorage[resId]) {
      categorized.actualCheckOuts.push(reservation);
    }
    // If checked in but not checked out
    else if (checkInsFromStorage[resId]) {
      const hasSameDayCheckout =
        reservation.customFieldValues?.some(
          (field) =>
            field.customFieldId === 77304 &&
            field.customField?.name === "Same day Check-out" &&
            field.value === "Yes"
        ) || false;

      // If it's a same-day check-out
      if (hasSameDayCheckout) {
        // Show in both Actual Check-In and Expected Check-Out
        categorized.actualCheckIns.push(reservation);
        categorized.expectedCheckOuts.push(reservation);
      }
      // Regular check-in without same-day checkout
      else {
        categorized.actualCheckIns.push(reservation);
      }
    }
    // For other cases (expected check-ins/outs)
    else {
      // If arrival date matches today
      if (arrivalDate === todayStr) {
        categorized.expectedCheckIns.push(reservation);
      }
      // If departure date matches today
      if (departureDate === todayStr) {
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
    if (!container) return;

    reservations.forEach((reservation) => {
      const card = createReservationCard(reservation, section);
      container.appendChild(card);
    });
  });

  // Update the count display
  const todayCheckInsCount = document.getElementById("todayCheckInsCount");
  if (todayCheckInsCount) {
    const expectedCheckIns = document.querySelectorAll(
      "#expectedCheckInsList .reservation-card"
    );
    todayCheckInsCount.textContent = expectedCheckIns.length;
  }

  const todayCheckOutsCount = document.getElementById("todayCheckOutsCount");
  if (todayCheckOutsCount) {
    const expectedCheckOuts = document.querySelectorAll(
      "#expectedCheckOutsList .reservation-card"
    );
    todayCheckOutsCount.textContent = expectedCheckOuts.length;
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
  const reservationId = reservation.hostawayReservationId;

  // Check if we have stored same-day check-out status
  const storedStatus = JSON.parse(
    localStorage.getItem(`sameDayCheckOut_${reservationId}`) || "{}"
  );
  const isDisabled = storedStatus.disabled || false;

  // Create the button with appropriate state
  const sameDayBtn = `
    <button class="same-day-checkout-btn" 
            data-res-id="${reservationId}"
            ${
              isDisabled
                ? 'disabled style="opacity: 0.5;" title="Same day check-out not allowed for this reservation"'
                : ""
            }>
      Same Day Check-Out
    </button>
  `;

  const card = document.createElement("div");
  card.className =
    "reservation-card" + (reservation.isOverdue ? " overdue" : "");
  card.setAttribute("data-res-id", reservation.hostawayReservationId);
  card.dataset.reservation = JSON.stringify(reservation);

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
        reservation.hostawayReservationId || "Unknown ID"
      }</span>
    </div>
    <div class="reservation-details">
      <div class="detail-row">
        <span>Listing:</span>
        <span>${
          listingsMap.get(reservation.listingMapId) || reservation.listingMapId
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
        sectionType === "actualCheckIns"
          ? `
        <button class="print-btn" data-res-id="${reservation.hostawayReservationId}" data-type="checkin">
          Print Check-in
        </button>
        <button class="same-day-checkout-btn" data-res-id="${reservation.hostawayReservationId}">
          Same Day Check-Out
        </button>
        <button class="early-checkout-btn" data-res-id="${reservation.hostawayReservationId}">
          Early Check Out
        </button>
      `
          : ""
      }
      ${
        sectionType === "actualCheckOuts"
          ? `
        <button class="print-btn" data-res-id="${reservation.hostawayReservationId}" data-type="checkout">
          Print Check-out
        </button>
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
    const sameDayCheckoutBtn = card.querySelector(".same-day-checkout-btn");
    const earlyCheckoutBtn = card.querySelector(".early-checkout-btn");

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
    if (sameDayCheckoutBtn) {
      sameDayCheckoutBtn.addEventListener("click", () =>
        handleSameDayCheckOut(reservation)
      );
    }
    if (earlyCheckoutBtn) {
      // Check stored early check-out status
      const earlyCheckOutStatus = JSON.parse(
        localStorage.getItem(`earlyCheckOut_${reservationId}`) || "{}"
      );
      // Set initial button state
      if (
        earlyCheckOutStatus.allowed === false ||
        earlyCheckOutStatus.value === "No"
      ) {
        earlyCheckoutBtn.disabled = true;
        earlyCheckoutBtn.style.opacity = "0.5";
        earlyCheckoutBtn.title =
          "Early check-out not allowed for this reservation";
      } else if (earlyCheckOutStatus.value === "Yes") {
        earlyCheckoutBtn.disabled = false;
        earlyCheckoutBtn.style.opacity = "1";
        earlyCheckoutBtn.title = "";
      }
      // Add click event listener
      earlyCheckoutBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleEarlyCheckOut(reservation);
      });
    }
  }, 0);

  return card;
}

// Handle Early Check Out
function handleEarlyCheckOut(reservation) {
  const reservationId = reservation.hostawayReservationId;

  // Fetch reservation details first
  const apiUrl = `https://api.hostaway.com/v1/reservations/${reservationId}`;
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((reservationData) => {
      const customFields = reservationData.result.customFieldValues;

      // Find the specific custom field with ID 78257 (Early Check Out)
      const earlyCheckOutField = customFields.find(
        (field) => field.customFieldId === 78257
      );

      if (earlyCheckOutField) {
        console.log("Early Check Out Value:", earlyCheckOutField.value);

        // Store the early check-out status in localStorage
        const isAllowed = earlyCheckOutField.value === "Yes";
        localStorage.setItem(
          `earlyCheckOut_${reservationId}`,
          JSON.stringify({
            allowed: isAllowed,
            value: earlyCheckOutField.value,
          })
        );

        // Disable button if value is not "Yes"
        const earlyCheckOutBtn = document.querySelector(
          `.early-checkout-btn[data-res-id="${reservationId}"]`
        );
        if (earlyCheckOutBtn) {
          if (!isAllowed) {
            earlyCheckOutBtn.disabled = true;
            earlyCheckOutBtn.style.opacity = "0.5";
            earlyCheckOutBtn.title =
              "Early check-out not allowed for this reservation";
            return;
          } else {
            earlyCheckOutBtn.disabled = false;
            earlyCheckOutBtn.style.opacity = "1";
            earlyCheckOutBtn.title = "";
          }
        }
      } else {
        console.log("Early Check-Out Field not found.");
        // Store unknown status and disable the button
        localStorage.setItem(
          `earlyCheckOut_${reservationId}`,
          JSON.stringify({
            allowed: false,
            value: "unknown",
          })
        );
        const earlyCheckOutBtn = document.querySelector(
          `.early-checkout-btn[data-res-id="${reservationId}"]`
        );
        if (earlyCheckOutBtn) {
          earlyCheckOutBtn.disabled = true;
          earlyCheckOutBtn.style.opacity = "0.5";
          earlyCheckOutBtn.title = "Early check-out status unknown";
        }
        return;
      }

      // Proceed with check-out if allowed
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      let guestName = reservation.guestName;
      let apartmentName =
        listingsMap.get(reservation.listingMapId) || reservation.listingMapId;

      // Save to local storage
      const existingCheckOuts = JSON.parse(
        localStorage.getItem("actualCheckOuts") || "{}"
      );
      existingCheckOuts[reservationId] = formattedDateTime;
      localStorage.setItem(
        "actualCheckOuts",
        JSON.stringify(existingCheckOuts)
      );

      // Update Hostaway
      const updateUrl = `https://api.hostaway.com/v1/reservations/${reservationId}?forceOverbooking=1`;
      fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          status: "checked_out",
          customFieldValues: [
            { customFieldId: 76282, value: formattedDateTime }, // Actual Check-out
          ],
        }),
      })
        .then(() => {
          // Save early check-out to database
          return fetch("/api/early-check-outs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reservationId: reservation.hostawayReservationId,
              guestName: guestName || "Unknown Guest",
              listingName: apartmentName || "Unknown Listing",
              arrivalDate: reservation.arrivalDate || "",
              departureDate: reservation.departureDate || "",
              nights: reservation.nights || 0,
              listingMapId: reservation.listingMapId || "unknown",
              checkOutType: "early",
            }),
          });
        })
        .then(() => {
          // Move to Actual Check-Out section
          const reservationCard = document.querySelector(
            `.reservation-card[data-res-id="${reservationId}"]`
          );

          if (reservationCard) {
            // Remove Early Check-Out button
            const earlyCheckOutBtn = reservationCard.querySelector(
              ".early-checkout-btn"
            );
            if (earlyCheckOutBtn) {
              earlyCheckOutBtn.remove();
            }

            // Remove Same Day Check-Out button if it exists
            const sameDayBtn = reservationCard.querySelector(
              ".same-day-checkout-btn"
            );
            if (sameDayBtn) {
              sameDayBtn.remove();
            }

            // Update the Print button to be a Print Check-out button
            const printBtn = reservationCard.querySelector(".print-btn");
            if (printBtn) {
              printBtn.setAttribute("data-type", "checkout");
              printBtn.textContent = "Print Check-out";
            }

            // Move card to Actual Check-Out section
            const actualCheckOutsList = document.querySelector(
              "#actualCheckOutsList"
            );
            if (actualCheckOutsList) {
              actualCheckOutsList.appendChild(reservationCard);
            }

            // Update the section type label if it exists
            const sectionTypeElement =
              reservationCard.querySelector(".section-type");
            if (sectionTypeElement) {
              sectionTypeElement.textContent = "Actual Check-out (Early)";
            }

            updateUI();
            fetchReservations();
          }
        })
        .catch((error) => {
          console.error("Error during early check-out:", error);
          alert(
            "An error occurred while processing early check-out. Please try again."
          );
        });
    })
    .catch((error) => {
      console.error("Error fetching reservation details:", error);
      alert("Failed to fetch reservation details. Please try again.");
    });
}

function handleCheckIn(reservation) {
  const now = new Date();
  const formattedDateTime = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  let guestName = reservation.guestName;
  let apartmentName =
    listingsMap.get(reservation.listingMapId) || reservation.listingMapId;
  // Get guest and apartment info
  const reservationCard = document.querySelector(
    `.reservation-card[data-res-id="${reservation.hostawayReservationId}"]`
  );
  if (!reservationCard) return;
  const existingCheckIns = JSON.parse(
    localStorage.getItem("actualCheckIns") || "{}"
  );
  existingCheckIns[reservation.hostawayReservationId] = formattedDateTime;
  localStorage.setItem("actualCheckIns", JSON.stringify(existingCheckIns));

  console.log(
    `Check-in marked for reservation ${reservation.hostawayReservationId} at: ${formattedDateTime}`
  );

  // Store check-in in database
  fetch(`${SERVER_URL}/api/check-ins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reservationId: reservation.hostawayReservationId.toString(),
      checkInTime: now.toISOString(),
      guestName: guestName || "Unknown Guest",
      arrivalDate: reservation.arrivalDate,
      departureDate: reservation.departureDate,
      nights: reservation.nights || 1,
      listingName: apartmentName || "Unknown Listing",
      listingMapId: reservation.listingMapId || "unknown",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Check-in saved to database:", data.data);
      } else {
        console.error("Failed to save check-in to database:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error saving check-in to database:", error);
    });
  // Notify Latenode webhook about check-in
  console.log(
    "Sending check-in notification for reservation ID:",
    reservation.hostawayReservationId
  );
  fetch(`${SERVER_URL}/api/notify-checkin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reservationId: reservation.hostawayReservationId.toString(),
    }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to notify Latenode");
      }
      return data;
    })
    .then((data) => {
      console.log("Check-in notification sent to Latenode", data);
    })
    .catch((error) => {
      console.error("Error details:", {
        message: error.message,
        status: error.status,
        stack: error.stack,
      });
    });

  const apiUrl = `https://api.hostaway.com/v1/reservations/${reservation.hostawayReservationId}?forceOverbooking=1`;

  fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      customFieldValues: [
        {
          customFieldId: 76281,
          value: formattedDateTime,
        },
      ],
    }),
  })
    .then(() => {
      console.log(
        "Check-in marked for reservation:",
        reservation.hostawayReservationId
      );
    })
    .catch((error) => {
      console.error("Error updating reservation:", error);
    });

  const expectedCheckInsList = document.querySelector("#expectedCheckInsList");
  const actualCheckInsList = document.querySelector("#actualCheckInsList");

  if (!expectedCheckInsList || !actualCheckInsList) {
    console.error("Check-in lists not found");
    return;
  }

  if (reservationCard) {
    // Get or create actions container
    let actionsDiv = reservationCard.querySelector(".reservation-actions");
    if (!actionsDiv) {
      actionsDiv = document.createElement("div");
      actionsDiv.className = "reservation-actions";
      reservationCard.appendChild(actionsDiv);
    }

    // Clear existing buttons to avoid duplicates
    actionsDiv.innerHTML = "";

    // Create Print Check-in button
    const printBtn = document.createElement("button");
    printBtn.className = "print-btn";
    printBtn.textContent = "Print Check-in";
    printBtn.setAttribute("data-type", "checkin");
    printBtn.setAttribute("data-res-id", reservation.hostawayReservationId);
    printBtn.addEventListener("click", () => {
      handlePrint(reservation.hostawayReservationId, "checkin");
    });
    actionsDiv.appendChild(printBtn);

    // Create Same Day Check-Out button
    const sameDayCheckOutBtn = document.createElement("button");
    sameDayCheckOutBtn.className = "same-day-checkout-btn";
    sameDayCheckOutBtn.textContent = "Same Day Check-Out";
    sameDayCheckOutBtn.setAttribute(
      "data-res-id",
      reservation.hostawayReservationId
    );
    sameDayCheckOutBtn.addEventListener("click", () => {
      handleSameDayCheckOut(reservation);
    });
    actionsDiv.appendChild(sameDayCheckOutBtn);

    // Create Early Check-Out button
    const earlyCheckOutBtn = document.createElement("button");
    earlyCheckOutBtn.className = "early-checkout-btn";
    earlyCheckOutBtn.textContent = "Early Check-Out";
    earlyCheckOutBtn.setAttribute(
      "data-res-id",
      reservation.hostawayReservationId
    );
    earlyCheckOutBtn.addEventListener("click", () => {
      handleEarlyCheckOut(reservation);
    });
    actionsDiv.appendChild(earlyCheckOutBtn);

    // Move card to Actual Check-In section
    actualCheckInsList.appendChild(reservationCard);

    // Update the section type label if it exists
    const sectionTypeElement = reservationCard.querySelector(".section-type");
    if (sectionTypeElement) {
      sectionTypeElement.textContent = "Actual Check-in";
    }

    updateUI();
    fetchReservations();
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

  // Update the count of total check-ins
  const totalCheckInsCount = document.getElementById("todayTotalCheckInsCount");
  if (totalCheckInsCount) {
    const totalCheckIns = document.querySelectorAll(
      "#totalCheckInsList .reservation-card"
    );
    totalCheckInsCount.textContent = totalCheckIns.length;
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

function handleCheckOut(reservation) {
  const reservationId = reservation.hostawayReservationId;
  const now = new Date();
  const formattedDateTime = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let guestName = reservation.guestName;
  let apartmentName =
    listingsMap.get(reservation.listingMapId) || reservation.listingMapId;

  // Try getting from DOM too, if available
  const reservationCard = document.querySelector(
    `.reservation-card[data-res-id="${reservationId}"]`
  );
  if (!reservationCard) return;
  const existingCheckOuts = JSON.parse(
    localStorage.getItem("actualCheckOuts") || "{}"
  );
  existingCheckOuts[reservationId] = formattedDateTime;
  localStorage.setItem("actualCheckOuts", JSON.stringify(existingCheckOuts));

  console.log(
    `Check-out marked for reservation ${reservation.hostawayReservationId} at: ${formattedDateTime}`
  );

  // Store check-out in database
  fetch(`${SERVER_URL}/api/check-outs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reservationId: reservationId.toString(),
      checkOutTime: now.toISOString(),
      guestName: guestName || "Unknown Guest",
      arrivalDate: reservation.arrivalDate,
      departureDate: reservation.departureDate,
      nights: reservation.nights || 0,
      listingName: apartmentName || "Unknown Listing",
      listingMapId: reservation.listingMapId || "unknown",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Check-out saved to database:", data.data);
      } else {
        console.error("Failed to save check-out to database:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error saving check-out to database:", error);
    });

  const apiUrl = `https://api.hostaway.com/v1/reservations/${reservationId}?forceOverbooking=1`;

  fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      customFieldValues: [
        {
          customFieldId: 76282,
          value: formattedDateTime,
        },
      ],
    }),
  })
    .then(() => {
      console.log(
        "Check-out marked for reservation:",
        reservation.hostawayReservationId
      );
    })
    .catch((err) => console.error("Hostaway error", err));

  const actualCheckOutsList = document.querySelector("#actualCheckOutsList");
  const expectedCheckOutsList = document.querySelector(
    "#expectedCheckOutsList"
  );

  if (!actualCheckOutsList || !expectedCheckOutsList) {
    console.error("Check-out lists not found");
    return;
  }

  if (reservationCard) {
    // Update the Check-Out button to a Print button
    const checkOutBtn = reservationCard.querySelector(".check-out-btn");
    if (checkOutBtn) {
      checkOutBtn.textContent = "Print Check-out";
      checkOutBtn.classList.remove("check-out-btn");
      checkOutBtn.classList.add("print-btn");
      checkOutBtn.setAttribute("data-type", "checkout");
      checkOutBtn.setAttribute(
        "data-res-id",
        reservation.hostawayReservationId
      );
    }

    // Move card to Actual Check-Out section
    actualCheckOutsList.appendChild(reservationCard);

    // Update the section type label if it exists
    const sectionTypeElement = reservationCard.querySelector(".section-type");
    if (sectionTypeElement) {
      sectionTypeElement.textContent = "Actual Check-out";
    }

    updateUI();
    fetchReservations();
  }
}

// Add event listener for check-in and check-out buttons
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener(
    "click",
    (e) => {
      // Handle check-in button
      if (e.target.classList.contains("check-in-btn")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const reservationId = e.target.getAttribute("data-res-id");
        if (reservationId) {
          // Get the full reservation object from the card
          const card =
            e.target.closest(".reservation-card") ||
            document.querySelector(
              `.reservation-card[data-res-id="${reservationId}"]`
            );
          if (card && card.dataset.reservation) {
            const reservation = JSON.parse(card.dataset.reservation);
            handleCheckIn(reservation);
          } else {
            // Fallback to just the ID if we can't get the full reservation
            handleCheckIn({ hostawayReservationId: reservationId });
          }
        }
        return false;
      }
      // Handle check-out button
      else if (e.target.classList.contains("check-out-btn")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const reservationId = e.target.getAttribute("data-res-id");
        if (reservationId) {
          // Get the full reservation object from the card
          const card =
            e.target.closest(".reservation-card") ||
            document.querySelector(
              `.reservation-card[data-res-id="${reservationId}"]`
            );
          if (card && card.dataset.reservation) {
            const reservation = JSON.parse(card.dataset.reservation);
            handleCheckOut(reservation);
          } else {
            // Fallback to just the ID if we can't get the full reservation
            handleCheckOut({ hostawayReservationId: reservationId });
          }
        }
        return false;
      }
      // Handle print button
      else if (e.target.classList.contains("print-btn")) {
        const reservationId = e.target.getAttribute("data-res-id");
        const printType = e.target.getAttribute("data-type");
        if (reservationId) {
          handlePrint(reservationId, printType);
        }
      }
    },
    true
  );
});

// Function to handle print
async function handlePrint(reservationId, printType) {
  // Find the reservation card
  const card = document.querySelector(
    `.reservation-card[data-res-id="${reservationId}"]`
  );
  if (!card) return;

  // Get the reservation object from the card's dataset
  const reservation = JSON.parse(card.dataset.reservation);

  // Get basic details

  const guestName = reservation.guestName || "";
  const departure = reservation.departureDate || "";
  const checkOutTime = reservation.checkOutTime || "";
  let vehicleNumber = reservation.vehicleNumber || "";
  const arrival = reservation.arrivalDate || "";

  // Create print content based on type
  let printContent;
  if (printType === "checkin") {
    // Fetch reservation data and extract actualCheckInTime
    const reservationUrl = `https://api.hostaway.com/v1/reservations/${reservationId}`;
    let actualCheckInTime = "";
    let cnic = "";
    let address = "";
    let vehicleNumber = "";
    let pricePerNight = "";
    try {
      const response = await fetch(reservationUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch reservation details");
        return {
          securityDepositFee: "",
          lateCheckOutCharges: "",
          allTotalCharges: "",
          financeFields: {},
        };
      }

      const data = await response.json();
      const customFields = data.result?.customFieldValues || [];
      console.log("Custom Fields:", customFields);

      if (customFields && Array.isArray(customFields)) {
        // Get Actual Check-in Time
        const checkInField = customFields.find(
          (item) =>
            item.customField?.name === "Actual Check-in Time" &&
            item.customFieldId === 76281
        );
        if (checkInField) {
          actualCheckInTime = checkInField.value;
          console.log("Actual Check-in Time:", actualCheckInTime);
        } else {
          console.log("Actual Check-in Time not found.");
        }

        // Get ID Card/Passport Number
        const cnicField = customFields.find(
          (item) =>
            item.customFieldId === 62073 &&
            item.customField?.name === "ID card Number/ Passport number"
        );
        if (cnicField) {
          cnic = cnicField.value;
          console.log("CNIC:", cnic);
        } else {
          console.log("CNIC not found.");
        }

        // Get Address
        const addressField = customFields.find(
          (item) =>
            item.customFieldId === 62915 && item.customField?.name === "Address"
        );
        if (addressField) {
          address = addressField.value;
          console.log("Address:", address);
        } else {
          console.log("Address not found.");
        }

        // Get Vehicle Number
        const vehicleNumberField = customFields.find(
          (item) =>
            item.customFieldId === 62072 &&
            item.customField?.name === "Vehicle Number"
        );

        if (vehicleNumberField) {
          vehicleNumber = vehicleNumberField.value;
          console.log("Vehicle Number:", vehicleNumber);
        } else {
          console.log("Vehicle Number not found.");
        }

        // Get Damage Charges
        const damageChargesField = customFields.find(
          (item) =>
            item.customFieldId === 75219 &&
            item.customField?.name === "Damage Charges"
        );

        if (damageChargesField) {
          console.log("Damage Charges:", damageChargesField.value);
        } else {
          console.log("Damage Charges not found.");
        }
        // Get PricePerNight
        const pricePerNightField = customFields.find(
          (item) =>
            item.customFieldId === 63430 &&
            item.customField?.name === "Price per night"
        );

        if (pricePerNightField) {
          pricePerNight = pricePerNightField.value;
          console.log("PricePerNight:", pricePerNight);
        } else {
          console.log("PricePerNight not found.");
        }
        // Get Same Day Check-out
        const sameDayCheckoutField = customFields.find(
          (item) =>
            item.customFieldId === 77304 &&
            item.customField?.name === "Same day Check-out"
        );

        if (sameDayCheckoutField) {
          console.log("Same Day Check-out:", sameDayCheckoutField.value);
        } else {
          console.log("Same Day Check-out not found.");
        }
      } else {
        console.log("No custom field values found.");
      }
    } catch (error) {
      console.error("Error fetching reservation data:", error);
    }
    // Fetch finance fields
    const { securityDepositFee, financeFields } = await getFinanceFields(
      reservationId
    );

    // Get Early Check-in from the financeFields object
    const earlyCheckIn = financeFields.earlyCheckinFee;

    if (earlyCheckIn) {
      console.log("Early Check-in:", earlyCheckIn);
    } else {
      console.log("Early Check-in not found or is 0.");
    }
    const listingMapId =
      listingsMap.get(reservation.listingMapId) || reservation.listingMapId;

    // Get the listing type from the listings array
    const listingType =
      listings.find((l) => l.listingId === reservation.listingMapId)
        ?.listingType || "N/A";

    // Get additional details from the reservation object
    const usdExchangeRateApi =
      "https://v6.exchangerate-api.com/v6/e528361fb75219dbc48899b1/latest/USD";
    const aedExchangeRateApi =
      "https://v6.exchangerate-api.com/v6/e528361fb75219dbc48899b1/latest/AED";
    const email = reservation.guestEmail || "";
    const contact = reservation.phone || "";
    const adults = reservation.numberOfGuests || "";
    const children = reservation.children || "";
    function formatTime(hour) {
      if (isNaN(hour)) return "";
      const h = parseInt(hour, 10);
      const suffix = h >= 12 ? "pm" : "am";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      return `${hour12}:00 ${suffix}`;
    }
    const checkInTime = reservation.checkInTime
      ? formatTime(reservation.checkInTime)
      : "";
    const checkOutTime = reservation.checkOutTime
      ? formatTime(reservation.checkOutTime)
      : "";
    const channelName = reservation.channelName || "";
    let convertedTotalPrice = reservation.totalPrice || "";
    const currency = reservation.currency || "";

    // Convert currency if it's USD or AED
    if (convertedTotalPrice) {
      try {
        let exchangeRate = 1; // Default rate if no conversion needed

        if (currency === "USD") {
          const response = await fetch(usdExchangeRateApi);
          const data = await response.json();
          exchangeRate = data.conversion_rates.PKR;
        } else if (currency === "AED") {
          const response = await fetch(aedExchangeRateApi);
          const data = await response.json();
          exchangeRate = data.conversion_rates.PKR;
        }

        if (currency === "USD" || currency === "AED") {
          const convertedAmount = (convertedTotalPrice * exchangeRate).toFixed(
            2
          );
          convertedTotalPrice = convertedAmount;
        }
      } catch (error) {
        console.error("Currency conversion failed:", error);
        // If conversion fails, keep the original price
        convertedTotalPrice = reservation.baseRate || "";
      }
    }

    // Calculate the final price after subtracting 5000
    const finalPrice = convertedTotalPrice
      ? convertedTotalPrice - securityDepositFee
      : 0;

    // Format the price with Rs. prefix
    const formattedPrice = convertedTotalPrice
      ? `Rs. ${finalPrice.toLocaleString()}`
      : "N/A";

    const duration = reservation.nights || 1;
    // const pricePerNight = (finalPrice / duration).toFixed(2);
    const totalPrice = reservation.totalPrice;

    // Get dates
    const arrival = new Date(reservation.arrivalDate).toLocaleDateString();
    const departure = new Date(reservation.departureDate).toLocaleDateString();

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
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
          <style>
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
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
              font-size: 13px;
              margin: 4px 0 !important;
            }
            .row .row-field h4 {
              font-size: 12px;
              margin: 4px 0 !important;
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="form">
            <div style="position: absolute; top: 5px; right: 5px; z-index: 1000;">
              <button onclick="downloadForm()" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;">
                Download
              </button>
            </div>
            <div class="logo-img">
              <img
                src="img/booknrent-logo.png"
                alt="Booknrent Logo"
              />
            </div>
            <div class="heading-text">
              <h2 style="
              font-size: 20px;
              text-align: center;
              margin: 0;"> ${guestName}'s Check-in Form <span style="font-size: 12px; color: #666;">(${reservationId})</span></h2>
              <p style="text-align: center; font-family: monospace">Actual Check-in Date / Time: ${actualCheckInTime}</p>
            </div>
            <div class="form-container">
              <div class="left-section">
                <div class="form-field"><label>Name:</label><input value="${guestName}" readonly /></div>
                <div class="form-field"><label>CNIC:</label><input value="${cnic}" readonly /></div>
                <div class="form-field address-field"><label>Address:</label><input value="${address}" readonly /></div>
                <div class="form-field"><label>Email:</label><input style="flex: 1; background: transparent; border: none; border-bottom: 1px solid #000; font-size: 13px;" value="${email}" readonly /></div>
                <div class="form-field"><label>Contact:</label><input value="${contact}" readonly /></div>
                <div class="form-field"><label>Total Nights:</label><input value="${duration}" readonly /></div>
                <div class="form-field"><label>Total Amount:</label><input value="${totalPrice}" readonly /></div>
                <div class="form-field"><label>Early Check-in:</label><input value="${earlyCheckIn}" readonly /></div>
                <div class="form-field"><label>Price/Night:</label><input value="${pricePerNight}" readonly /></div>
                <div class="form-field"><label>Channel <br> ID:</label><input value="${channelName}" readonly /></div>
              </div>
              <div class="right-section">
                <div class="form-field"><label>Unit:</label><input value="${listingMapId}" readonly /></div>
                <div class="form-field"><label>Type:</label><input value="${listingType}" readonly /></div>
                <div class="form-field"><label>Adults:</label><input value="${adults}" readonly /></div>
                <div class="form-field"><label>Children:</label><input value="${children}" readonly /></div>
                <div class="form-field"><label>Check-in Date:</label><input value="${arrival}" readonly /></div>
                <div class="form-field"><label>Check-in Time:</label><input value="${checkInTime}" readonly /></div>
                <div class="form-field"><label>Check-out Date:</label><input value="${departure}" readonly /></div>
                <div class="form-field"><label>Check-out Time:</label><input value="${checkOutTime}" readonly /></div>
                <div class="form-field"><label>Vehicle No:</label><input value="${vehicleNumber}" readonly /></div>
                <div class="form-field"><label>Security Deposit:</label><input value="${securityDepositFee}" readonly /></div>
              </div>
            </div>

            
            <div class="space" style="padding: 15px">
              <div class="terms">
                <h3 style="margin: -15px 0px -15px 0px; text-align: left">Terms and Conditions</h3>
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
                <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 13px;
    margin-bottom: 2px;
    text-align: center;">I have read and understand the terms and conditions and agree to them. <br> I will be responsible for any damage or loss to the property as per list attached.</p>
              </div>
              <div class="row">
                <div class="row-field" style="display: flex; justify-content: space-between; align-items: center; margin-top: 40px;">
                  <div class="inner-col" style="text-align: left">
                    <div style="border-bottom: 1px solid black; width:140px; margin-bottom: 5px;"></div>
                    <h3>Management Team</h3>
                  </div>
                  <div class="inner-col" style="text-align: right">
                    <div style="border-bottom: 1px solid black; width: 140px; margin-bottom: 5px; margin-left: auto;"></div>
                    <h3>Guest Signature</h3>
                  </div>
                </div>
                <div style="text-align: center; margin-top: -40px;">
  <h5 style="margin: 0; font-size: 17px;">CHECK OUT TIME 12:00 NOON</h5>
  <p style="margin: 4px 0 0; font-size: 11px;">(Late Check Out charges applicable @ Rs. 1000 per hour) <br> (*Subject to Availability)</p>
</div>


                <div style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 5px 0px 4px;
    margin-top: 25px;
    margin-right: -17px;
    margin-left: -17px;
    font-size: 12px;
    font-family: 'monospace';
    background-color:rgb(0, 0, 0);
    color: white;
    ">
                  <div style="text-align: left;">
                    <h4>0300-0454711</h4>
                  </div>
                  <div style="text-align: right;">
                    <h4>30-A, Block L, Gulberg 3, Lahore</h4>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <script>
            async function downloadForm() {
              const formElement = document.querySelector('.form');
              const canvas = await html2canvas(formElement, {
                scale: 2,
                logging: false,
                useCORS: true
              });
              
              const link = document.createElement('a');
              link.download = \`${guestName}'s Checkin-form (${reservationId}).png\`;
              link.href = canvas.toDataURL('image/png');
              link.click();
            }
          </script>
        </body>
      </html>
    `;
  } else if (printType === "checkout") {
    // Fetch reservation data and extract actualCheckOutTime
    const reservationUrl = `https://api.hostaway.com/v1/reservations/${reservationId}`;
    let actualCheckOutTime = "";
    let damageCharges = "";
    let lateCheckOutCharges = "";
    try {
      const response = await fetch(reservationUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch reservation details");
        return {
          securityDepositFee: "",
          lateCheckOutCharges: "",
          allTotalCharges: "",
          financeFields: {},
        };
      }

      const data = await response.json();
      console.log("Reservation Data:", data);
      const customFields = data.result?.customFieldValues;
      console.log("Custom Fields:", customFields);
      if (customFields && Array.isArray(customFields)) {
        // Get Actual Check-out Time
        const checkOutField = customFields.find(
          (item) =>
            item.customField?.name === "Actual Check-out Time" &&
            item.customFieldId === 76282
        );
        if (checkOutField) {
          actualCheckOutTime = checkOutField.value;
          console.log("Actual Check-out Time:", actualCheckOutTime);
        } else {
          console.log("Actual Check-out Time not found.");
        }

        // Get Damage Charges
        const damageChargesField = customFields.find(
          (item) =>
            item.customFieldId === 75219 &&
            item.customField?.name === "Damage Charges"
        );

        if (damageChargesField) {
          damageCharges = damageChargesField.value;
          console.log("Damage Charges:", damageCharges);
        } else {
          console.log("Damage Charges not found.");
        }
        // Get Vehicle Number
        const vehicleNumberField = customFields.find(
          (item) =>
            item.customFieldId === 62072 &&
            item.customField?.name === "Vehicle Number"
        );

        if (vehicleNumberField) {
          vehicleNumber = vehicleNumberField.value;
          console.log("Vehicle Number:", vehicleNumber);
        } else {
          console.log("Vehicle Number not found.");
        }
        // Get Late Checkout Charges
        const lateCheckoutField = customFields.find(
          (item) =>
            item.customFieldId === 75221 &&
            item.customField?.name === "Late Checkout Charges"
        );

        if (lateCheckoutField) {
          console.log("Late Checkout Charges:", lateCheckoutField.value);
          lateCheckOutCharges = lateCheckoutField.value;
        } else {
          console.log("Late Checkout Charges not found.");
        }
      } else {
        console.log("No custom field values found.");
      }
    } catch (error) {
      console.error("Error fetching reservation data:", error);
    }
    // Fetch finance fields for checkout
    const {
      securityDepositFee,
      lateCheckOutCharges: financeLateCheckoutCharges,
      allTotalCharges,
      financeFields,
    } = await getFinanceFields(reservationId);

    // Initialize lateCheckOutCharges with finance fields value or empty string
    lateCheckOutCharges =
      financeLateCheckoutCharges || lateCheckOutCharges || "";

    const listingMapId =
      listingsMap.get(reservation.listingMapId) || reservation.listingMapId;

    printContent = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background-color: #F0F0F0;
      font-family: Arial, Helvetica, sans-serif;
      color: #333;
    }
    .form {
      width: 150mm;
      height: auto;
      min-height: 240mm;
      padding: 20px;
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
      margin: 10px 0px 20px 0px;
    }
    .logo-img img {
      height: 100%;
      width: auto;
      object-fit: contain;
    }
    h2 {
      text-align: center;
      font-size: 20px;
      margin: 10px 0;
    }
    p {
      line-height: 1.5;
      font-size: 17px;
    }
    ul {
      list-style: none;
      padding-left: 0;
      margin: 10px 0;
    }
    ul li {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 13px;
      line-height: 1.2;
      margin-bottom: 2px;
    }
  
    .signature-section {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    .signature-block {
      width: 45%;
      text-align: center;
    }
    .signature-line {
      border-bottom: 1px solid #333;
      margin: 30px auto 10px;
      width: 80%;
    }
    .footer {
      font-size: 12px;
      color: #666;
      display: inline-block;
      vertical-align: top;
      width: 50%;
      margin-top: -15px;
    }
    
    .charges-breakdown {
    margin: -15px 23px 0px 0px;
      padding: 15px;
      text-align: right;
      display: inline-block;
      vertical-align: top;
    }
    .charges-breakdown p {
      margin: 5px 0;
      font-size: 14px;
      color: #333;
      line-height: 1.3;
    }
    
    /* Container to hold both elements */
    .footer-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: -19px;
    }
}

    .charges-breakdown p:first-child {
      font-weight: bold !important;
      color: #2c3e50;
      font-size: 14px;
    }
  </style>
</head>
<body>

  <div class="form">
    <div style="position: absolute; top: 5px; right: 5px; z-index: 1000;">
  <button onclick="downloadForm()" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;">
    Download
  </button>
</div>
    <div class="logo-img">
      <img src="img/booknrent-logo.png" alt="Booknrent Logo">
    </div>
    <div class="heading-text">
  ${(() => {
    const sameDayData = JSON.parse(
      localStorage.getItem(`sameDayCheckOut_${reservationId}`) || "{}"
    );
    const earlyCheckOutData = JSON.parse(
      localStorage.getItem(`earlyCheckOut_${reservationId}`) || "{}"
    );
    const isSameDayCheckout = sameDayData && sameDayData.value === "Yes";
    const isEarlyCheckOut =
      earlyCheckOutData && earlyCheckOutData.allowed === true;

    if (isSameDayCheckout) {
      return `<h3 style="text-align: center; margin: 0;">
                ${guestName}'s Same Day Check-out Form 
                <span style="font-size: 12px; color: #666;">(${reservationId})</span>
              </h3>
              <p style="text-align: center; font-family: monospace; margin:0px 0px -16px 0px !important">
                Actual Check-out Date / Time: ${actualCheckOutTime}
              </p>`;
    } else if (isEarlyCheckOut) {
      return `<h3 style="text-align: center; margin: 0;">
                ${guestName}'s Early Check-out Form 
                <span style="font-size: 12px; color: #666;">(${reservationId})</span>
              </h3>
              <p style="text-align: center; font-family: monospace; margin:0px 0px -16px 0px !important">
                Actual Check-out Date / Time: ${actualCheckOutTime}
              </p>`;
    } else {
      return `<h3 style="text-align: center; margin: 0;">
                ${guestName}'s Check-out Form 
                <span style="font-size: 12px; color: #666;">(${reservationId})</span>
              </h3>
              <p style="text-align: center; font-family: monospace; margin:0px 0px -16px 0px !important">
                Actual Check-out Date / Time: ${actualCheckOutTime}
              </p>`;
    }
  })()}
</div>


    <p>
      I, <strong>${guestName}</strong>, have checked out of the apartment <strong>${listingMapId}</strong> on <strong>${departure}</strong>. 
      I have checked the apartment for any personal belongings, including but not limited to:
    </p>

    <div class="single-line-layout">
  <div class="items-list">
    <div class="list-item">• Clothes</div>
    <div class="list-item">• Jewelry</div>
    <div class="list-item">• Cash</div>
    <div class="list-item">• Electronics</div>
    <div class="list-item">• Other valuables</div>
  </div>
  <div class="info-fields">
    <div class="field-group">
      <span class="field-label">Standard Check Out Date & Time:</span>
      <span class="field-value">${departure} & ${checkOutTime} pm</span>
    </div>
    <div class="field-group">
      <span class="field-label">Late Check out Charges (if applicable):</span>
      <span class="field-value">${lateCheckOutCharges || "0"}</span>
    </div>
    <div class="field-group">
      <span class="field-label">Any other Charges (if applicable):</span>
      <span class="field-value">${allTotalCharges || "0"}</span>
    </div>
    <div class="field-group">
      <span class="field-label">Security Deposit Amount Returned:</span>
      <span class="field-value">${securityDepositFee || "0"}</span>
    </div>
  </div>
</div>

<style>
  .single-line-layout {
    display: flex;
    gap: 20px;
    margin: 25px 0;
  }

  .items-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .list-item {
    font-size: 14px;
    white-space: nowrap;
  }

  .info-fields {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid black;
    padding: 10px 0px 0px 15px;
    margin: -8px 0px 10px 0px;
  }

  .field-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .field-label {
    font-size: 13px;
    white-space: nowrap;
    min-width: 200px;
  }

  .field-value {
    font-size: 13px;
    font-weight: bold;
    white-space: nowrap;
  }
</style>

    <p style="font-size: 17px; text-align: center; margin-top: -15px;">
      I have found all of my belongings and have taken them with me. <br>
       I understand that the Apartment management/host is not responsible for any valuables that are left behind.
    </p>

    <div class="signature-section">
      <div class="signature-block">
        <div class="signature-line"></div>
        <p>Management Team</p>
      </div>
      <div class="signature-block">
        <div class="signature-line"></div>
        <p>Guest Signature</p>
      </div>
    </div>
<div class="footer-container">
  <div class="footer">
    <p>📞 0300-0454711</p>
    <p>📍 30-A, Block L, Gulberg 3, Lahore</p>
  </div>

  ${
    allTotalCharges > 0
      ? `
    <div class="charges-breakdown">
      <p><strong>*Charges Breakdown:</strong></p>
      ${
        financeFields.baseRate > 0
          ? `<p>• Base Rate: ${financeFields.baseRate.toFixed(2)}</p>`
          : ""
      }
      ${
        financeFields.cleaningFeeValue > 0
          ? `<p>• Cleaning Fee: ${financeFields.cleaningFeeValue.toFixed(
              2
            )}</p>`
          : ""
      }
      ${
        financeFields.additionalCleaningFee > 0
          ? `<p>• Additional Cleaning Fee: ${financeFields.additionalCleaningFee.toFixed(
              2
            )}</p>`
          : ""
      }
      ${
        financeFields.midstayCleaningFee > 0
          ? `<p>• Midstay Cleaning Fee: ${financeFields.midstayCleaningFee.toFixed(
              2
            )}</p>`
          : ""
      }
      ${
        financeFields.otherFees > 0
          ? `<p>• Other Fees: ${financeFields.otherFees.toFixed(2)}</p>`
          : ""
      }
      ${
        financeFields.salesTax > 0
          ? `<p>• Sales Tax: ${financeFields.salesTax.toFixed(2)}</p>`
          : ""
      }
      ${
        financeFields.earlyCheckinFee > 0
          ? `<p>• Early Check-in Fee: ${financeFields.earlyCheckinFee.toFixed(
              2
            )}</p>`
          : ""
      }
      ${
        financeFields.bedLinenFee > 0
          ? `<p>• Bed Linen Fee: ${financeFields.bedLinenFee.toFixed(2)}</p>`
          : ""
      }
      ${
        financeFields.extraBedsFee > 0
          ? `<p>• Extra Beds Fee: ${financeFields.extraBedsFee.toFixed(2)}</p>`
          : ""
      }
      ${
        financeFields.lateCheckoutFee > 0
          ? `<p>• Late Checkout Fee: ${financeFields.lateCheckoutFee.toFixed(
              2
            )}</p>`
          : ""
      }
      ${
        financeFields.damageDeposit > 0
          ? `<p>• Damage Deposit: ${financeFields.damageDeposit.toFixed(2)}</p>`
          : ""
      }
      ${
        financeFields.parkingFee > 0
          ? `<p>• Parking Fee: ${financeFields.parkingFee.toFixed(2)}</p>`
          : ""
      }
      ${
        financeFields.serviceFee > 0
          ? `<p>• Service Fee: ${financeFields.serviceFee.toFixed(2)}</p>`
          : ""
      }
      ${
        financeFields.towelChangeFee > 0
          ? `<p>• Towel Change Fee: ${financeFields.towelChangeFee.toFixed(
              2
            )}</p>`
          : ""
      }
      ${damageCharges > 0 ? `<p>• Damage Deposit: ${damageCharges}</p>` : ""}
    </div>
    `
      : ""
  }
</div>
<div>
<span style="margin-left: -19px;">✂----------------------------------------------------------------------------------------------------------
</span>
</div>
<div>
<div>
<div style="margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
    <div style="flex: 1;">
      <p style="margin: 5px 0;"><strong>Guest Name:</strong> ${
        guestName || "N/A"
      }</p>
    </div>
    <div style="flex: 1;">
      <p style="margin: 5px 0;"><strong>Vehicle Number:</strong> ${
        vehicleNumber || "N/A"
      }</p>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
    
    <div style="flex: 1;">
      <p style="margin: 5px 0;"><strong>Apartment:</strong> ${
        listingMapId || "N/A"
      }</p>
    </div>
    <div style="flex: 1;">
      <p style="margin: 5px 0;"><strong>Departure Date and Time:</strong> ${
        actualCheckOutTime || "N/A"
      }</p>
    </div>
  </div>
  
    </div>
</div>
<p style="text-align: center; margin: -2px 0px -6px 0px;">Thank you for staying with BooknRent, Good Bye!</p>
</div>

  <script>
  async function downloadForm() {
    const formElement = document.querySelector('.form');
    const canvas = await html2canvas(formElement, {
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const link = document.createElement('a');
    link.download = \`${guestName}'s Checkout-form ${reservationId}.png\`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
</script>
</body>
</html>
    `;
  }

  // Create a new window with the print content
  const printWindow = window.open("", "_blank", "width=800,height=600");

  // Check if window exists
  if (!printWindow) {
    return;
  }

  // Wait for the window to load
  printWindow.onload = function () {
    printWindow.document.write(printContent);
    printWindow.document.close();
    // Remove the automatic print trigger
    // printWindow.print();
    // printWindow.close();
  };

  // Fallback in case onload doesn't work
  setTimeout(() => {
    if (printWindow && !printWindow.closed) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      // Remove the automatic print trigger
      // printWindow.print();
      // printWindow.close();
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

async function fetchAndDisplayListings() {
  const LISTINGS_DATA = {
    Studio: [288675, 288682, 288690, 323229, 323261, 336255, 383744],
    "1BR": [
      307143, 306032, 288691, 305069, 288681, 288726, 288679, 288723, 288678,
      323258,
    ],
    "2BR": [
      288677, 288684, 288687, 288977, 288689, 288685, 288683, 306543, 288724,
      378076, 378078,
    ],
    "2BR Premium": [305055, 309909, 323227, 288688],
    "3BR": [288686, 305327, 288676],
  };

  try {
    const response = await fetch(
      "https://api.hostaway.com/v1/listings?country=Pakistan",
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch listings");

    const data = await response.json();
    const listings = data.result || data || [];
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const calendarPromises = listings.map(async (listing) => {
      const id = listing.id;
      if (!id) return null;

      try {
        const calResponse = await fetch(
          `https://api.hostaway.com/v1/listings/${id}/calendar`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!calResponse.ok) {
          console.error(`Calendar fetch failed for ID ${id}`);
          return null;
        }

        const calData = await calResponse.json();
        const todayEntry = calData.result?.find(
          (entry) => entry.date === todayStr
        );
        if (todayEntry) {
          return {
            id,
            status: todayEntry.status,
            date: todayEntry.date,
          };
        }

        return null;
      } catch (err) {
        console.error(`Error fetching calendar for ID ${id}:`, err);
        return null;
      }
    });

    const results = await Promise.all(calendarPromises);
    const validResults = results.filter((entry) => entry !== null);

    const total = validResults.length;
    const reserved = validResults.filter(
      (entry) => entry.status === "reserved"
    ).length;
    const available = validResults.filter(
      (entry) => entry.status === "available"
    ).length;
    const occupancyPercentage = total
      ? ((reserved / total) * 100).toFixed(1)
      : 0;

    if (available === 0) {
      launchConfettiCelebration();
      triggerFullHouseNotice();
    }

    // Stats update
    const dateStat = document.getElementById("dateStat");
    const totalStat = document.getElementById("totalStat");
    const reservedStat = document.getElementById("reservedStat");
    const availableStat = document.getElementById("availableStat");
    const occupancyStat = document.getElementById("occupancyStat");

    if (
      dateStat &&
      totalStat &&
      reservedStat &&
      availableStat &&
      occupancyStat
    ) {
      dateStat.querySelector(".value").innerHTML = todayStr;
      dateStat.querySelector(".value").classList.add("date-value-occupancy");

      anime({
        targets: totalStat.querySelector(".value"),
        innerHTML: total,
        round: 1,
        easing: "easeOutExpo",
        duration: 1200,
      });
      anime({
        targets: reservedStat.querySelector(".value"),
        innerHTML: reserved,
        round: 1,
        easing: "easeOutExpo",
        duration: 1200,
      });
      anime({
        targets: availableStat.querySelector(".value"),
        innerHTML: available,
        round: 1,
        easing: "easeOutExpo",
        duration: 1200,
      });
      anime({
        targets: occupancyStat.querySelector(".value"),
        innerHTML: occupancyPercentage + "%",
        round: 1,
        easing: "easeOutExpo",
        duration: 1200,
      });
    }

    // Occupancy per category for Donut chart
    const categoryLabels = Object.keys(LISTINGS_DATA);
    const categorySeries = categoryLabels.map((category) => {
      const ids = LISTINGS_DATA[category];
      const reservedCount = validResults.filter(
        (entry) => ids.includes(entry.id) && entry.status !== "available"
      ).length;
      const totalInCategory = ids.length;
      return totalInCategory > 0
        ? parseFloat(((reservedCount / totalInCategory) * 100).toFixed(2))
        : 0;
    });

    // Clear previous chart before rendering the new one
    const chartEl = document.querySelector("#occupancyChart");
    chartEl.innerHTML = "";

    const ctx = document.createElement("canvas");
    chartEl.appendChild(ctx);

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            data: categorySeries,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500,
          easing: "easeInOutQuad",
          animateRotate: true,
          animateScale: true,
        },
        cutout: "70%",
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.raw.toFixed(2) + "%";
              },
            },
          },
        },
      },
    });

    anime({
      targets: chartEl.querySelector("canvas"),
      opacity: [0, 1],
      easing: "easeOutQuad",
      duration: 1500,
    });

    // ==== NEW CODE: Display listings inside the dropdowns ====

    categoryLabels.forEach((categoryLabel) => {
      const listingType = categoryLabel.toLowerCase().replace(/\s+/g, "-"); // e.g., "2BR Premium" -> "2br-premium"
      const container = document.querySelector(
        `.hoverable-item[data-type="${listingType}"] .listing-data`
      );

      if (!container) return;

      const ids = LISTINGS_DATA[categoryLabel];

      const entries = validResults.filter((entry) => ids.includes(entry.id));

      container.innerHTML = "";

      if (entries.length === 0) {
        container.innerHTML = "<p>No data available</p>";
        return;
      }

      // Add heading row
      const headingDiv = document.createElement("div");
      headingDiv.style.display = "flex";
      headingDiv.style.justifyContent = "space-between";
      headingDiv.style.alignItems = "center";
      headingDiv.style.marginBottom = "8px";
      headingDiv.style.fontWeight = "bold";
      headingDiv.style.color = "#64748b"; // gray-600

      const headingName = document.createElement("span");
      headingName.textContent = "Listing Name";
      const headingStatus = document.createElement("span");
      headingStatus.textContent = "Status";

      headingDiv.appendChild(headingName);
      headingDiv.appendChild(headingStatus);
      container.appendChild(headingDiv);

      entries.forEach((entry) => {
        const listingDetails = listings.find((l) => l.id === entry.id);
        const listingName = listingDetails
          ? listingDetails.internalListingName
          : `ID: ${entry.id}`;

        const div = document.createElement("div");
        div.classList.add("listing-entry");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        div.style.marginBottom = "4px";

        const nameSpan = document.createElement("span");
        nameSpan.textContent = listingName;

        const statusSpan = document.createElement("span");
        statusSpan.textContent = entry.status;
        statusSpan.style.color =
          entry.status === "available"
            ? "green"
            : entry.status === "reserved"
            ? "red"
            : "gray";

        div.appendChild(nameSpan);
        div.appendChild(statusSpan);

        container.appendChild(div);
      });
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

// Initialize after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const todayStr = new Date().toISOString().split("T")[0];
  fetchReservationsByDate(todayStr);
});

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
    displayReservations(filteredReservations);

    // Staying Guests for selected date
    const selectedDate = new Date(targetDateStr);
    const stayingGuests = filteredByStatus
      .filter((res) => {
        const arrivalDate = new Date(res.arrivalDate);
        const departureDate = new Date(res.departureDate);
        return arrivalDate <= selectedDate && selectedDate < departureDate;
      })
      .map((res) => ({
        hostawayReservationId: res.hostawayReservationId || "Unknown ID",
        guestName: res.guestName || "Unknown Guest",
        listingMapId: res.listingMapId || "N/A",
        listingName: listingsMap.get(res.listingMapId) || res.listingMapId,
        arrivalDate: res.arrivalDate,
        departureDate: res.departureDate,
        nights:
          res.departureDate && res.arrivalDate
            ? Math.ceil(
                (new Date(res.departureDate) - new Date(res.arrivalDate)) /
                  (1000 * 60 * 60 * 24)
              )
            : 0,
        status: res.status,
      }));

    // Update staying stats
    document.getElementById("totalStaying").textContent = stayingGuests.length;
    // document.getElementById("avgStay").textContent = Math.round(
    //   stayingGuests.reduce((sum, guest) => {
    //     const checkIn = new Date(guest.arrivalDate);
    //     const checkOut = new Date(guest.departureDate);
    //     return sum + Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    //   }, 0) / stayingGuests.length || 0
    // );

    displayStayingGuests(stayingGuests);

    // Update total reservation count
    const stats = {
      total: filteredReservations.length,
    };
    animateStats(stats);
  } catch (err) {
    console.error("Error fetching reservations by date:", err);
  }
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

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("same-day-checkout-btn")) {
    const resId = e.target.dataset.resId;
    console.log(`Reservation ID: ${resId}`);
  }
});

// Function to get finance fields
async function getFinanceFields(reservationId) {
  try {
    const response = await fetch(
      `https://api.hostaway.com/v1/financeStandardField/reservation/${reservationId}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch reservation details");
      return {
        securityDepositFee: "",
        lateCheckOutCharges: "",
        allTotalCharges: "",
        financeFields: {},
      };
    }

    const data = await response.json();
    const reservation = data.result || {};

    // Extract all requested fields
    const financeFields = {
      baseRate: reservation.baseRate || 0,
      cleaningFeeValue: reservation.cleaningFeeValue || 0,
      additionalCleaningFee: reservation.additionalCleaningFee || 0,
      midstayCleaningFee: reservation.midstayCleaningFee || 0,
      otherFees: reservation.otherFees || 0,
      salesTax: reservation.salesTax || 0,
      earlyCheckinFee: reservation.earlyCheckinFee || 0,
      bedLinenFee: reservation.bedLinenFee || 0,
      extraBedsFee: reservation.extraBedsFee || 0,
      lateCheckoutFee: reservation.lateCheckoutFee || 0,
      damageDeposit: reservation.damageDeposit || 0,
      parkingFee: reservation.parkingFee || 0,
      serviceFee: reservation.serviceFee || 0,
      towelChangeFee: reservation.towelChangeFee || 0,
      allTotalCharges:
        (reservation.baseRate || 0) +
        (reservation.cleaningFeeValue || 0) +
        (reservation.additionalCleaningFee || 0) +
        (reservation.midstayCleaningFee || 0) +
        (reservation.otherFees || 0) +
        (reservation.salesTax || 0) +
        (reservation.earlyCheckinFee || 0) +
        (reservation.bedLinenFee || 0) +
        (reservation.extraBedsFee || 0) +
        (reservation.lateCheckoutFee || 0) +
        (reservation.damageDeposit || 0) +
        (reservation.parkingFee || 0) +
        (reservation.serviceFee || 0) +
        (reservation.towelChangeFee || 0),
      channelId: reservation.channelId,
    };

    // Log all fields to console
    // console.log("Finance Fields:", financeFields);

    // Alert for USD reservations
    if (financeFields.channelId === 2018 || financeFields.channelId === 2013) {
      try {
        const exchangeResponse = await fetch(
          "https://v6.exchangerate-api.com/v6/e528361fb75219dbc48899b1/latest/USD"
        );
        const data = await exchangeResponse.json();
        const usdToPkrRate = data.conversion_rates.PKR;

        // Create new object with converted values
        const convertedFields = { ...financeFields };
        Object.keys(convertedFields).forEach((key) => {
          if (typeof convertedFields[key] === "number") {
            convertedFields[key] = Number(
              (convertedFields[key] * usdToPkrRate).toFixed(2)
            );
          }
        });

        // console.log("Finance Fields (PKR):", convertedFields);

        // Return converted values
        return {
          securityDepositFee: convertedFields.otherFees || "",
          lateCheckOutCharges: convertedFields.lateCheckoutFee || "",
          allTotalCharges: convertedFields.allTotalCharges || "",
          financeFields: convertedFields,
        };
      } catch (exchangeError) {
        console.error("Error fetching exchange rate:", exchangeError);
        // If exchange rate fails, return original USD values
      }
    }

    // Return original USD values if not USD reservation
    return {
      securityDepositFee: financeFields.otherFees || "",
      lateCheckOutCharges: financeFields.lateCheckoutFee || "",
      allTotalCharges: financeFields.allTotalCharges || "",
      financeFields,
    };
  } catch (error) {
    console.error("Error fetching finance fields:", error);
    return {
      securityDepositFee: "",
      lateCheckOutCharges: "",
      allTotalCharges: "",
      financeFields: {},
    };
  }
}

// Initialize
fetchReservations();

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
            hostawayReservationId: res.hostawayReservationId,
            guestName: res.guestName,
            listingMapId: res.listingMapId,
            listingName: listingsMap.get(res.listingMapId) || res.listingMapId,
            arrivalDate: res.arrivalDate,
            departureDate: res.departureDate,
            nights:
              res.departureDate && res.arrivalDate
                ? Math.ceil(
                    (new Date(res.departureDate) - new Date(res.arrivalDate)) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0,
            status: res.status,
          })),
        });
      }
    });
  });

  return doubleBookings;
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

async function fetchCheckInOutData() {
  try {
    // Fetch check-ins
    const checkInsResponse = await fetch("/api/check-ins");
    const checkInsData = await checkInsResponse.json();

    if (checkInsData.success) {
      console.log("Check-ins from database:", checkInsData.data);
    }

    // Fetch check-outs
    const checkOutsResponse = await fetch("/api/check-outs");
    const checkOutsData = await checkOutsResponse.json();

    if (checkOutsData.success) {
      console.log("Check-outs from database:", checkOutsData.data);
    }
    // Fetch same day check-outs
    const sameDayCheckOutsResponse = await fetch("/api/same-day-check-outs");
    const sameDayCheckOutsData = await sameDayCheckOutsResponse.json();

    if (sameDayCheckOutsData.success) {
      console.log(
        "Same-day check-outs from database:",
        sameDayCheckOutsData.data
      );
    }
    return {
      checkIns: checkInsData.data || [],
      checkOuts: checkOutsData.data || [],
      sameDayCheckOuts: sameDayCheckOutsData.data || [],
    };
  } catch (error) {
    console.error("Error fetching check-in/out data:", error);
    return { checkIns: [], checkOuts: [], sameDayCheckOuts: [] };
  }
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const todayStr = new Date().toISOString().split("T")[0];
  fetchReservationsByDate(todayStr);

  // Fetch and log check-in/out data
  fetchCheckInOutData();

  fetchAndDisplayTotalCheckIns(); // Add this line
  fetchAndDisplayTotalCheckOuts(); // Add this line to load check-outs
});

function launchConfettiCelebration() {
  // Create confetti canvas
  const confettiSettings = {
    target: "confetti-canvas",
    max: 150,
    size: 1.5,
    animate: true,
    respawn: true,
    props: [
      { type: "circle" },
      { type: "square" },
      { type: "triangle" },
      { type: "line" },
    ],
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
    clock: 50,
  };

  // Initialize confetti
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();

  // Stop after 5 seconds
  setTimeout(() => {
    confetti.clear();
  }, 5000);
}

// Function to show full house notice
function triggerFullHouseNotice() {
  const notice = document.createElement("div");
  notice.className = "full-house-notice";
  notice.innerHTML = `
    <div class="full-house-content">
      <h2>🎉 Full House! 🎉</h2>
      <p>All listings are booked for today!</p>
      <button onclick="this.parentElement.parentElement.remove()">Close</button>
    </div>
  `;
  document.body.appendChild(notice);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(notice)) {
      document.body.removeChild(notice);
    }
  }, 10000);
}

// Function to load confetti script
function loadConfettiScript(callback) {
  if (window.ConfettiGenerator) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/confetti-js@0.0.18/dist/index.min.js";
  script.onload = () => {
    console.log("Confetti script loaded successfully");
    callback();
  };
  script.onerror = () => {
    console.error("Failed to load confetti script");
  };
  document.head.appendChild(script);
}

// Function to launch confetti celebration
function launchConfettiCelebration() {
  loadConfettiScript(() => {
    try {
      // Create confetti canvas
      const confettiSettings = {
        target: "confetti-canvas",
        max: 150,
        size: 1.5,
        animate: true,
        respawn: true,
        props: [
          { type: "circle" },
          { type: "square" },
          { type: "triangle" },
          { type: "line" },
        ],
        colors: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#ff00ff",
          "#00ffff",
        ],
        clock: 50,
      };

      // Initialize confetti
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();

      // Stop after 5 seconds
      setTimeout(() => {
        confetti.clear();
      }, 5000);
    } catch (error) {
      console.error("Error initializing confetti:", error);
    }
  });
}

// Function to load confetti script
function loadConfettiScript(callback) {
  if (typeof confetti === "function") {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  script.onload = () => {
    console.log("Confetti script loaded successfully");
    callback();
  };
  script.onerror = () => {
    console.error("Failed to load confetti script");
  };
  document.head.appendChild(script);
}

// Function to launch confetti celebration
function launchConfettiCelebration() {
  loadConfettiScript(() => {
    try {
      // Create a confetti effect
      const duration = 5 * 1000; // 5 seconds
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Launch from the left edge
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });

        // Launch from the right edge
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });
      }, 250);

      // Stop after duration
      setTimeout(() => clearInterval(interval), duration);
    } catch (error) {
      console.error("Error initializing confetti:", error);
    }
  });
}

function handleSameDayCheckOut(reservation) {
  const reservationId = reservation.hostawayReservationId;

  // Fetch reservation details first
  const apiUrl = `https://api.hostaway.com/v1/reservations/${reservationId}`;
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((reservationData) => {
      const customFields = reservationData.result.customFieldValues;

      // Find the specific custom field with ID 77304 (Same day Check-out)
      const sameDayCheckOutField = customFields.find(
        (field) => field.customFieldId === 77304
      );

      if (sameDayCheckOutField) {
        console.log("Value:", sameDayCheckOutField.value);

        // Store the same-day check-out status in localStorage
        const sameDayStatus =
          sameDayCheckOutField.value === "No" ||
          sameDayCheckOutField.value === "";
        localStorage.setItem(
          `sameDayCheckOut_${reservationId}`,
          JSON.stringify({
            disabled: sameDayStatus,
            value: sameDayCheckOutField.value,
          })
        );

        // Disable button if value is "No" or empty
        const sameDayBtn = document.querySelector(
          `.same-day-checkout-btn[data-res-id="${reservationId}"]`
        );
        if (sameDayBtn) {
          if (sameDayStatus) {
            sameDayBtn.disabled = true;
            sameDayBtn.style.opacity = "0.5";
            sameDayBtn.title =
              "Same day check-out not allowed for this reservation";
            // Don't proceed with checkout if value is "No" or empty
            return;
          } else {
            sameDayBtn.disabled = false;
            sameDayBtn.style.opacity = "1";
            sameDayBtn.title = "";
          }
        }
      } else {
        console.log("Same Day Check-Out Field not found.");
        // Store unknown status
        localStorage.setItem(
          `sameDayCheckOut_${reservationId}`,
          JSON.stringify({
            disabled: true,
            value: "unknown",
          })
        );
        // Don't proceed if field not found
        return;
      }

      // Proceed with checkout only if value is not "No" or empty
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      let guestName = reservation.guestName;
      let apartmentName =
        listingsMap.get(reservation.listingMapId) || reservation.listingMapId;
      // Save to local storage
      const existingCheckOuts = JSON.parse(
        localStorage.getItem("actualCheckOuts") || "{}"
      );
      existingCheckOuts[reservationId] = formattedDateTime;
      localStorage.setItem(
        "actualCheckOuts",
        JSON.stringify(existingCheckOuts)
      );

      // Update Hostaway
      const updateUrl = `https://api.hostaway.com/v1/reservations/${reservationId}?forceOverbooking=1`;
      fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          status: "stayed",
          customFieldValues: [
            { customFieldId: 76282, value: formattedDateTime }, // Actual Check-out
          ],
        }),
      })
        .then(() => {
          // Save same-day checkout to database
          return fetch("/api/same-day-check-outs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reservationId: reservation.hostawayReservationId,
              guestName: guestName || "Unknown Guest",
              listingName: apartmentName || "Unknown Listing",
              arrivalDate: reservation.arrivalDate || "",
              departureDate: reservation.departureDate || "",
              nights: reservation.nights || 0,

              listingMapId: reservation.listingMapId || "unknown",
            }),
          });
        })
        .then(() => {
          // Move to Actual Check-Out section
          const reservationCard = document.querySelector(
            `.reservation-card[data-res-id="${reservationId}"]`
          );

          if (reservationCard) {
            // Remove Same Day Check-Out button
            const sameDayBtn = reservationCard.querySelector(
              ".same-day-checkout-btn"
            );
            if (sameDayBtn) {
              sameDayBtn.remove();
            }

            // Replace Check-out button with Print Check-out button
            const checkOutBtn = reservationCard.querySelector(".check-out-btn");
            if (checkOutBtn) {
              const printBtn = document.createElement("button");
              printBtn.className = "print-btn";
              printBtn.textContent = "Print Check-out";
              printBtn.setAttribute("data-res-id", reservationId);
              printBtn.setAttribute("data-type", "checkout");

              // Replace the check-out button with the print button
              checkOutBtn.parentNode.replaceChild(printBtn, checkOutBtn);
            }

            // Move to Actual Check-Out section
            const actualCheckOutsList = document.querySelector(
              "#actualCheckOutsList"
            );
            if (actualCheckOutsList) {
              actualCheckOutsList.appendChild(reservationCard);
              updateUI();
            }
          }
        })
        .catch((err) =>
          console.error("Error updating reservation status", err)
        );
    })
    .catch((err) => console.error("Error fetching reservation details", err));
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

    // Display the do1483279690
    // uble bookings
    // displayDoubleBookings(doubleBookings);
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
// Function to fetch and display total check-ins
async function fetchAndDisplayTotalCheckIns() {
  try {
    const response = await fetch("/api/check-ins");
    const data = await response.json();

    if (data.success) {
      const totalCheckInsList = document.getElementById("totalCheckInsList");
      if (totalCheckInsList) {
        // Clear existing content
        totalCheckInsList.innerHTML = "";

        // Create and append cards for each check-in
        data.data.forEach((checkIn) => {
          const card = createCheckInCard(checkIn);
          totalCheckInsList.appendChild(card);
        });
      }
    } else {
      console.error("Failed to fetch check-ins:", data.message);
    }
  } catch (error) {
    console.error("Error fetching check-ins:", error);
  }
}

// Function to create a check-in card
function createCheckInCard(checkIn) {
  const card = document.createElement("div");
  card.className = "reservation-card";

  // Format dates
  const arrivalDate = new Date(checkIn.arrivalDate).toLocaleDateString();
  const departureDate = new Date(checkIn.departureDate).toLocaleDateString();
  const checkInTime = new Date(checkIn.checkInTime).toLocaleString();

  card.innerHTML = `
    <div class="reservation-header">
      <h3>${checkIn.guestName} <span style="font-size: 12px; color: #666;">(${
    checkIn.reservationId
  })</span></h3>
      <span class="status-badge-checkin">Checked In </span>
    </div>
    <div class="reservation-details">
      <div class="guest-info">
        <p><strong>Listing Name:</strong> ${checkIn.listingName}</p>
          <p><strong>Arrival:</strong> ${arrivalDate}</p>
      
      </div>
      <div class="stay-details">
         <p><strong>Nights:</strong> ${checkIn.nights || "N/A"}</p>
        <p><strong>Departure:</strong> ${departureDate}</p>
       
        <p><small>Checked in at: ${checkInTime}</small></p>
      </div>
    </div>
  `;

  return card;
}
// Function to fetch and display total check-outs
async function fetchAndDisplayTotalCheckOuts() {
  try {
    // Fetch regular check-outs
    const [checkOutsRes, sameDayCheckOutsRes] = await Promise.all([
      fetch("/api/check-outs"),
      fetch("/api/same-day-check-outs"),
    ]);

    const checkOutsData = await checkOutsRes.json();
    const sameDayCheckOutsData = await sameDayCheckOutsRes.json();

    const totalCheckOutsList = document.getElementById("totalCheckOutsList");
    if (totalCheckOutsList) {
      // Clear existing content
      totalCheckOutsList.innerHTML = "";

      // Process and display regular check-outs
      if (checkOutsData.success) {
        checkOutsData.data.forEach((checkOut) => {
          const card = createCheckOutCard(checkOut, false);
          totalCheckOutsList.appendChild(card);
        });
      }

      // Process and display same-day check-outs
      if (sameDayCheckOutsData.success) {
        sameDayCheckOutsData.data.forEach((checkOut) => {
          const card = createCheckOutCard(checkOut, true);
          totalCheckOutsList.appendChild(card);
        });
      }
    }
  } catch (error) {
    console.error("Error fetching check-outs:", error);
  }
}

// Function to create a check-out card
function createCheckOutCard(checkOut, isSameDay) {
  const card = document.createElement("div");
  card.className = "reservation-card";

  // Format dates
  const arrivalDate = new Date(checkOut.arrivalDate).toLocaleDateString();
  const departureDate = new Date(checkOut.departureDate).toLocaleDateString();
  const checkOutTime = new Date(
    checkOut.checkOutTime || checkOut.checkOutTime
  ).toLocaleString();

  card.innerHTML = `
    <div class="reservation-header">
      <h3>${checkOut.guestName} <span style="font-size: 12px; color: #666;">(${
    checkOut.reservationId
  })</span></h3>
      <span class="status-badge-checkout">Checked Out </span>
    </div>
    <div class="reservation-details">
      <div class="guest-info">
        <p><strong>Listing Name:</strong> ${checkOut.listingName}</p>
          <p><strong>Arrival:</strong> ${arrivalDate}</p>
      
      </div>
      <div class="stay-details">
         <p><strong>Nights:</strong> ${checkOut.nights || "N/A"}</p>
        <p><strong>Departure:</strong> ${departureDate}</p>
       
        <p><small>Checked out at: ${checkOutTime}</small></p>
      </div>
    </div>
  `;

  return card;
}
// Call the function to fetch and display listings
fetchAndDisplayListings();

// Initialize
fetchReservations();

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
            hostawayReservationId: res.hostawayReservationId,
            guestName: res.guestName,
            listingMapId: res.listingMapId,
            listingName: listingsMap.get(res.listingMapId) || res.listingMapId,
            arrivalDate: res.arrivalDate,
            departureDate: res.departureDate,
            nights:
              res.departureDate && res.arrivalDate
                ? Math.ceil(
                    (new Date(res.departureDate) - new Date(res.arrivalDate)) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0,
            status: res.status,
          })),
        });
      }
    });
  });

  return doubleBookings;
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

async function fetchCheckInOutData() {
  try {
    // Fetch check-ins
    const checkInsResponse = await fetch("/api/check-ins");
    const checkInsData = await checkInsResponse.json();

    if (checkInsData.success) {
      console.log("Check-ins from database:", checkInsData.data);
    }

    // Fetch check-outs
    const checkOutsResponse = await fetch("/api/check-outs");
    const checkOutsData = await checkOutsResponse.json();

    if (checkOutsData.success) {
      console.log("Check-outs from database:", checkOutsData.data);
    }
    // Fetch same day check-outs
    const sameDayCheckOutsResponse = await fetch("/api/same-day-check-outs");
    const sameDayCheckOutsData = await sameDayCheckOutsResponse.json();

    if (sameDayCheckOutsData.success) {
      console.log(
        "Same-day check-outs from database:",
        sameDayCheckOutsData.data
      );
    }
    return {
      checkIns: checkInsData.data || [],
      checkOuts: checkOutsData.data || [],
      sameDayCheckOuts: sameDayCheckOutsData.data || [],
    };
  } catch (error) {
    console.error("Error fetching check-in/out data:", error);
    return { checkIns: [], checkOuts: [], sameDayCheckOuts: [] };
  }
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const todayStr = new Date().toISOString().split("T")[0];
  fetchReservationsByDate(todayStr);

  // Fetch and log check-in/out data
  fetchCheckInOutData();

  fetchAndDisplayTotalCheckIns(); // Add this line
  fetchAndDisplayTotalCheckOuts(); // Add this line to load check-outs
});

function launchConfettiCelebration() {
  // Create confetti canvas
  const confettiSettings = {
    target: "confetti-canvas",
    max: 150,
    size: 1.5,
    animate: true,
    respawn: true,
    props: [
      { type: "circle" },
      { type: "square" },
      { type: "triangle" },
      { type: "line" },
    ],
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
    clock: 50,
  };

  // Initialize confetti
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();

  // Stop after 5 seconds
  setTimeout(() => {
    confetti.clear();
  }, 5000);
}

// Function to show full house notice
function triggerFullHouseNotice() {
  const notice = document.createElement("div");
  notice.className = "full-house-notice";
  notice.innerHTML = `
    <div class="full-house-content">
      <h2>🎉 Full House! 🎉</h2>
      <p>All listings are booked for today!</p>
      <button onclick="this.parentElement.parentElement.remove()">Close</button>
    </div>
  `;
  document.body.appendChild(notice);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(notice)) {
      document.body.removeChild(notice);
    }
  }, 10000);
}

// Function to load confetti script
function loadConfettiScript(callback) {
  if (window.ConfettiGenerator) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/confetti-js@0.0.18/dist/index.min.js";
  script.onload = () => {
    console.log("Confetti script loaded successfully");
    callback();
  };
  script.onerror = () => {
    console.error("Failed to load confetti script");
  };
  document.head.appendChild(script);
}

// Function to launch confetti celebration
function launchConfettiCelebration() {
  loadConfettiScript(() => {
    try {
      // Create confetti canvas
      const confettiSettings = {
        target: "confetti-canvas",
        max: 150,
        size: 1.5,
        animate: true,
        respawn: true,
        props: [
          { type: "circle" },
          { type: "square" },
          { type: "triangle" },
          { type: "line" },
        ],
        colors: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#ff00ff",
          "#00ffff",
        ],
        clock: 50,
      };

      // Initialize confetti
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();

      // Stop after 5 seconds
      setTimeout(() => {
        confetti.clear();
      }, 5000);
    } catch (error) {
      console.error("Error initializing confetti:", error);
    }
  });
}

// Function to load confetti script
function loadConfettiScript(callback) {
  if (typeof confetti === "function") {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  script.onload = () => {
    console.log("Confetti script loaded successfully");
    callback();
  };
  script.onerror = () => {
    console.error("Failed to load confetti script");
  };
  document.head.appendChild(script);
}

// Function to launch confetti celebration
function launchConfettiCelebration() {
  loadConfettiScript(() => {
    try {
      // Create a confetti effect
      const duration = 5 * 1000; // 5 seconds
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Launch from the left edge
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });

        // Launch from the right edge
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });
      }, 250);

      // Stop after duration
      setTimeout(() => clearInterval(interval), duration);
    } catch (error) {
      console.error("Error initializing confetti:", error);
    }
  });
}
