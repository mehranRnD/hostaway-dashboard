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
    const todayReservations = reservations.filter((reservation) => {
      if (!reservation.reservationDate) return false;
      const reservationDate = new Date(reservation.reservationDate)
        .toISOString()
        .split("T")[0];
      return reservationDate === today;
    });

    displayReservations(todayReservations);

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
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: "easeOutQuad",
    });
  }
}

// Function to categorize reservations
function categorizeReservations(reservations) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  return reservations.reduce(
    (acc, reservation) => {
      const arrivalDate = new Date(reservation.arrivalDate);
      const departureDate = new Date(reservation.departureDate);

      // Actual Check-ins (already checked in)
      if (reservation.status === "checked_in") {
        acc.actualCheckIns.push(reservation);
      }
      // Actual Check-outs (already checked out)
      else if (reservation.status === "checked_out") {
        acc.actualCheckOuts.push(reservation);
      }
      // Expected Check-ins (arriving today)
      else if (arrivalDate.toISOString().split("T")[0] === todayStr) {
        acc.expectedCheckIns.push(reservation);
      }
      // Expected Check-outs (departing today)
      else if (departureDate.toISOString().split("T")[0] === todayStr) {
        acc.expectedCheckOuts.push(reservation);
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
        const card = createReservationCard(reservation);
        container.appendChild(card);
      });
    }
  });
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
      delay: anime.stagger(100),
      easing: "easeOutQuad",
    });
  }
}

// Create a reservation card
function createReservationCard(reservation) {
  const card = document.createElement("div");
  card.className = "reservation-card";

  const statusIndicator = document.createElement("div");
  statusIndicator.className =
    "status-indicator " +
    (reservation.status === "checked_in" || reservation.status === "checked_out"
      ? "status-completed"
      : "status-pending");

  const checkInBtn = document.createElement("button");
  checkInBtn.className = "check-in-btn";
  checkInBtn.textContent = "Mark Check-in";
  checkInBtn.onclick = () => handleCheckIn(reservation.id);

  const checkOutBtn = document.createElement("button");
  checkOutBtn.className = "check-out-btn";
  checkOutBtn.textContent = "Check Out";
  checkOutBtn.onclick = () => handleCheckOut(reservation.id);

  card.innerHTML = `
    <div class="reservation-header">
      <div class="status-indicator-container">
        ${statusIndicator.outerHTML}
      </div>
      <h3>${reservation.guestName}</h3>
    </div>
    <div class="reservation-details">
      <div class="detail-row">
        <span>Hostaway ID:</span>
        <span>${reservation.hostawayId}</span>
      </div>
      <div class="detail-row">
        <span>Listing:</span>
        <span>${listingsMap.get(reservation.listingId)}</span>
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
    <div class="reservation-buttons">
      ${reservation.status !== "checked_in" ? checkInBtn.outerHTML : ""}
      ${reservation.status !== "checked_out" ? checkOutBtn.outerHTML : ""}
    </div>
  `;

  return card;
}

// Update check-in and check-out handlers
async function handleCheckIn(reservationId) {
  try {
    const response = await fetch(`${API_URL}/${reservationId}/check-in`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to check in");
    }

    // Refresh the display
    await fetchAndDisplayListings();
  } catch (error) {
    console.error("Error checking in:", error);
    alert("Failed to check in. Please try again.");
  }
}

async function handleCheckOut(reservationId) {
  try {
    const response = await fetch(`${API_URL}/${reservationId}/check-out`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to check out");
    }

    // Refresh the display
    await fetchAndDisplayListings();
  } catch (error) {
    console.error("Error checking out:", error);
    alert("Failed to check out. Please try again.");
  }
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
  animateNumber(
    document.querySelector("#upcomingReservations .value"),
    stats.upcoming
  );
  animateNumber(
    document.querySelector("#completedReservations .value"),
    stats.completed
  );
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

// Call the function to fetch and display listings
fetchAndDisplayListings();

// Initialize
fetchReservations();
