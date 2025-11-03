const BACKEND_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", loadCart);
document.getElementById("purchase-btn").addEventListener("click", purchase);

async function loadCart() {
  const response = await fetch(`${BACKEND_URL}/carts`);
  const data = await response.json();

  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  if (data.result && data.carts.length > 0) {
    let total = 0;

    data.carts.forEach((cart) => {
      total += cart.price;
      const cartItem = createCartItem(cart);
      cartContainer.appendChild(cartItem);
    });

    document.getElementById("total-price").textContent = `${total}€`;
  } else {
    cartContainer.innerHTML = "<p>No tickets in your cart.</p>";
  }
}

function createCartItem(cart) {
  const div = document.createElement("div");
  div.className = "cart-item";

  const date = new Date(cart.date);
  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  div.innerHTML = `
    <span>${cart.departure} > ${cart.arrival}</span>
    <span>${time}</span>
    <span>${cart.price}€</span>
    <button class="btn-delete" data-id="${cart._id}">X</button>
  `;

  div.querySelector(".btn-delete").addEventListener("click", deleteFromCart);

  return div;
}

async function deleteFromCart(e) {
  const id = e.target.dataset.id;

  await fetch(`${BACKEND_URL}/carts/${id}`, {
    method: "DELETE",
  });

  loadCart();
}

async function purchase() {
  const response = await fetch(`${BACKEND_URL}/bookings`, {
    method: "POST",
  });

  const data = await response.json();

  if (data.result) {
    window.location.href = "bookings.html";
  }
}
