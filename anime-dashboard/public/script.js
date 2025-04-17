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

    displayReservations(reservations);

    const todayArrivals = reservations.filter((res) => {
      const arrivalDateStr = new Date(res.arrivalDate)
        .toISOString()
        .split("T")[0];
      return arrivalDateStr === today;
    });
    console.log(todayArrivals);

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
  const todayStr = new Date().toISOString().split("T")[0];

  return reservations.reduce(
    (acc, reservation) => {
      const arrivalDateStr = new Date(reservation.arrivalDate)
        .toISOString()
        .split("T")[0];
      const departureDateStr = new Date(reservation.departureDate)
        .toISOString()
        .split("T")[0];

      //
      if (reservation.status === "checked_in") {
        acc.actualCheckIns.push(reservation);
      }

      //
      else if (reservation.status === "checked_out") {
        acc.actualCheckOuts.push(reservation);
      }

      // (arrival today, not checked in/out)
      else if (
        arrivalDateStr === todayStr &&
        reservation.status !== "checked_in" &&
        reservation.status !== "checked_out" &&
        (reservation.status === "new" || reservation.status === "modified")
      ) {
        console.log("✅ Expected Check-in:", {
          guest: reservation.guestName,
          arrivalDate: arrivalDateStr,
          status: reservation.status,
        });
        acc.expectedCheckIns.push(reservation);
      }

      // (departure today)
      if (
        departureDateStr === todayStr &&
        (reservation.status === "new" || reservation.status === "modified")
      ) {
        console.log(" Expected Check-out:", {
          guest: reservation.guestName,
          departureDate: departureDateStr,
          status: reservation.status,
        });
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
function createReservationCard(reservation) {
  const card = document.createElement("div");
  card.className =
    "reservation-card" + (reservation.isOverdue ? " overdue" : "");

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
  checkOutBtn.textContent = "Mark Check-out";
  checkOutBtn.onclick = () => handleCheckOut(reservation.id);

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

// Call the function to fetch and display listings
fetchAndDisplayListings();

// Initialize
fetchReservations();

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

    // 🎯 Only keep reservations with status "new" or "modified"
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
        hostawayReservationId: res.hostawayReservationId || "Unknown ID",
        guestName: res.guestName || "Unknown Guest",
        listingMapId: res.listingMapId || "N/A",
        listingName: listingsMap.get(res.listingMapId) || res.listingMapId,
        arrivalDate: res.arrivalDate,
        departureDate: res.departureDate,
        nights: Math.ceil(
          (new Date(res.departureDate) - new Date(res.arrivalDate)) /
            (1000 * 60 * 60 * 24)
        ),
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
        const card = createReservationCard(reservation);
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

    // Add event marker if there are events for this day
    if (hasEvents(day, month, year)) {
      dayElement.classList.add("has-event");
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
  // Remove selected class from all days
  document.querySelectorAll(".calendar-day.selected").forEach((day) => {
    day.classList.remove("selected");
  });

  // Update selected date
  selectedDate = date;

  // Add selected class to the clicked date
  const selectedDay = document.querySelector(
    `[data-date="${date.toISOString().split("T")[0]}"]`
  );
  if (selectedDay) {
    selectedDay.classList.add("selected");
  }

  // Update button text
  selectedDateText.textContent = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Close dropdown
  calendarDropdown.classList.remove("active");

  // Log the selected date
  console.log("Selected date:", date);

  // Trigger any event handlers for date selection
  const event = new CustomEvent("dateSelected", {
    detail: { date: date },
  });
  document.dispatchEvent(event);
}

// Function to check if a day has events
function hasEvents(day, month, year) {
  // For now, just return true for some random days
  // You can modify this to check your actual events data
  const randomDays = [1, 7, 15, 22];
  return randomDays.includes(day);
}

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
