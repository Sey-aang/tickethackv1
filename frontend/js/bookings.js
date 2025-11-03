const BACKEND_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", loadBookings);

async function loadBookings() {
  const response = await fetch(`${BACKEND_URL}/bookings`);
  const data = await response.json();

  const bookingsContainer = document.getElementById("bookings-container");
  bookingsContainer.innerHTML = "";

  if (data.result && data.bookings.length > 0) {
    data.bookings.forEach((booking) => {
      const bookingItem = createBookingItem(booking);
      bookingsContainer.appendChild(bookingItem);
    });
  } else {
    bookingsContainer.innerHTML = "<p>No booking yet.</p>";
  }
}

function createBookingItem(booking) {
  const div = document.createElement("div");
  div.className = "booking-item";

  const date = new Date(booking.date);
  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const now = new Date();
  const timeDiff = date - now;
  const hoursUntilDeparture = Math.floor(timeDiff / (1000 * 60 * 60));

  div.innerHTML = `
    <span>${booking.departure} > ${booking.arrival}</span>
    <span>${time}</span>
    <span>${booking.price}€</span>
    <span class="departure-time">Departure in ${hoursUntilDeparture} hours</span>
  `;

  return div;
}
