const BACKEND_URL = "http://localhost:3000";

document.getElementById("search-btn").addEventListener("click", searchTrips);

async function searchTrips() {
  const departure = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;
  const date = document.getElementById("date").value;

  if (!departure || !arrival || !date) {
    alert("Please fill all fields");
    return;
  }

  const response = await fetch(
    `${BACKEND_URL}/trips/${departure}/${arrival}/${date}`
  );
  const data = await response.json();

  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  if (data.result && data.trips.length > 0) {
    data.trips.forEach((trip) => {
      const tripCard = createTripCard(trip);
      resultsContainer.appendChild(tripCard);
    });
  } else {
    resultsContainer.innerHTML = `
      <img src="images/notfound.png" alt="Not found" class="placeholder-icon">
      <p>No trip found.</p>
    `;
  }
}

function createTripCard(trip) {
  const div = document.createElement("div");
  div.className = "trip-card";

  const date = new Date(trip.date);
  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  div.innerHTML = `
    <div class="trip-info">
      <span>${trip.departure} > ${trip.arrival}</span>
      <span>${time}</span>
      <span>${trip.price}€</span>
    </div>
    <button class="btn-book" data-trip='${JSON.stringify(trip)}'>Book</button>
  `;

  div.querySelector(".btn-book").addEventListener("click", addToCart);

  return div;
}

async function addToCart(e) {
  const trip = JSON.parse(e.target.dataset.trip);

  const response = await fetch(`${BACKEND_URL}/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip),
  });

  const data = await response.json();

  if (data.result) {
    alert("Trip added to cart!");
  }
}
