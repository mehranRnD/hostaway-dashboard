const HOSTAWAY_API_URL = "https://api.hostaway.com/v1";
const LIMIT = 500;
const MAX_PARALLEL_REQUESTS = 15; // You can adjust this if needed
const ENRICH_CONCURRENCY = 6;
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4MDA2NiIsImp0aSI6ImNhYzRlNzlkOWVmZTBiMmZmOTBiNzlkNTEzYzIyZTU1MDhiYWEwNWM2OGEzYzNhNzJhNTU1ZmMzNDI4OTQ1OTg2YWI0NTVjNmJjOWViZjFkIiwiaWF0IjoxNzM2MTY3ODExLjgzNTUyNCwibmJmIjoxNzM2MTY3ODExLjgzNTUyNiwiZXhwIjoyMDUxNzAwNjExLjgzNTUzMSwic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjUzOTUyfQ.Mmqfwt5R4CK5AHwNQFfe-m4PXypLLbAPtzCD7CxgjmagGa0AWfLzPM_panH9fCbYbC1ilNpQ-51KOQjRtaFT3vR6YKEJAUkUSOKjZupQTwQKf7QE8ZbLQDi0F951WCPl9uKz1nELm73V30a8rhDN-97I43FWfrGyqBgt7F8wPkE"; // use your token

async function fetchReservationsPage(offset) {
  const response = await fetch(
    `${HOSTAWAY_API_URL}/reservations?offset=${offset}&limit=${LIMIT}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    console.error(await response.text());
    throw new Error(`Failed to fetch page at offset ${offset}`);
  }

  const data = await response.json();
  return Object.values(data.result || {});
}

/**
 * Fetch reservation details by ID
 */
async function fetchReservationDetails(reservationId) {
  try {
    const response = await fetch(
      `${HOSTAWAY_API_URL}/reservations/${reservationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) throw new Error(`Status ${response.status}`);

    const data = await response.json();
    return data.result;
  } catch (err) {
    console.warn(`Failed to get details for ${reservationId}:`, err);
    return null;
  }
}

/**
 * Extract Early Check Out field
 */
function extractEarlyCheckOutValue(reservationDetail) {
  if (!reservationDetail || !reservationDetail.customFieldValues) return "N/A";
  for (const cf of reservationDetail.customFieldValues) {
    if (cf.customField?.name === "Early Check Out") {
      return cf.value || "N/A";
    }
  }
  return "N/A";
}

/**
 * Filter relevant reservations
 * Only keep those with:
 * - status new/modified
 * - departureDate in the future
 */
function filterReservations(allReservations) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return allReservations.filter((res) => {
    if (!res.status || !res.departureDate) return false;

    const status = res.status.toLowerCase();
    if (status !== "new" && status !== "modified") return false;

    const departureDate = new Date(res.departureDate);
    departureDate.setHours(0, 0, 0, 0);

    return departureDate > today;
  });
}

/**
 * Fire reservation event to page
 */
function fireReservationEvent(res) {
  document.dispatchEvent(
    new CustomEvent("reservationsLoaded", { detail: [res] })
  );
}

/**
 * Enrich a batch of reservations with Early Check Out field
 */
async function enrichBatch(reservations) {
  const concurrency = ENRICH_CONCURRENCY;
  let index = 0;

  while (index < reservations.length) {
    const batch = reservations.slice(index, index + concurrency);
    const promises = batch.map(async (res) => {
      const details = await fetchReservationDetails(res.id);
      const earlyCheckOut = extractEarlyCheckOutValue(details);
      return { ...res, earlyCheckOut };
    });

    const results = await Promise.allSettled(promises);
    for (const r of results) {
      if (r.status === "fulfilled") {
        const enriched = r.value;
        if (["yes"].includes(enriched.earlyCheckOut.toLowerCase())) {
          fireReservationEvent(enriched);
        } else {
          // console.log(
          //   `Skipping reservation ${enriched.id} with Early Check Out = ${enriched.earlyCheckOut}`
          // );
        }
      } else {
        // console.warn("Failed to enrich:", r.reason);
      }
    }

    index += concurrency;
  }
}

/**
 * Fetch all reservations, paginated, process as they come
 */
async function fetchAllReservations() {
  try {
    // console.log("Fetching first page to estimate total...");

    const firstPage = await fetchReservationsPage(0);
    if (!firstPage.length) {
      console.log("No reservations found.");
      return;
    }

    const estimatedTotal = LIMIT * MAX_PARALLEL_REQUESTS;
    const offsets = [];
    for (let offset = LIMIT; offset < estimatedTotal; offset += LIMIT) {
      offsets.push(offset);
    }

    // Start enrichment for first page immediately
    const filteredFirst = filterReservations(firstPage);
    enrichBatch(filteredFirst); // Don't await - stream immediately

    // Fetch remaining pages in parallel
    const fetchPromises = offsets.map((offset) =>
      fetchReservationsPage(offset).then(
        (page) => filterReservations(page),
        (err) => {
          console.warn(`Failed page at offset ${offset}:`, err);
          return [];
        }
      )
    );

    const pages = await Promise.allSettled(fetchPromises);

    for (const page of pages) {
      if (page.status === "fulfilled") {
        const reservations = page.value;
        if (reservations.length) enrichBatch(reservations);
      }
    }

    console.log("All pages fetched and enrichment started.");
  } catch (error) {
    console.error("Error in fetchAllReservations:", error);
    document.dispatchEvent(
      new CustomEvent("reservationsError", { detail: error.message })
    );
  }
}
// Add the event listener right here, after fetchAllReservations
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("check-out-btn")) {
    const reservationId = e.target.getAttribute("data-res-id");
    if (reservationId) {
      // Create a minimal reservation object with just the ID
      const reservation = {
        hostawayReservationId: reservationId,
      };
      // Call the same handleCheckOut function used in the main app
      if (typeof handleCheckOut === "function") {
        handleCheckOut(reservation);
      }
    }
  }
});
window.fetchAllReservations = fetchAllReservations;

document.addEventListener("DOMContentLoaded", () => {
  fetchAllReservations().catch(console.error);
});
