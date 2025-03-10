export let cart = JSON.parse(localStorage.getItem("cart")) || {}

// HTML elements
const cartContainer = document.getElementById("cart-container");
const cartModal = document.getElementById("cart-modal");
const cartItemsList = document.getElementById("cart-items");
const closeModalButton = document.querySelector(".close");
const clearCartButton = document.getElementById("clear-cart");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const totalAmountDisplay = document.getElementById("total-amount");

// Update count in cart icon
export function updateCartCount() {
    if (!cartCount) return;
    const totalCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalCount;
}

// Save cart to Local Storage
export function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update the total price in the menu and modal
export function updateTotal() {
    let totalAmount = 0;
    Object.values(cart).forEach(item => {
        let price = item.menuPrice;
        if (item.menuName.toLowerCase().includes("milkshake")) {
            price *= 0.8;  // Apply discount for milkshakes
        }
        totalAmount += price * item.quantity;
    });

    const totalWithVAT = totalAmount * 1.21;  // Apply VAT (21%)

    // Update the total in the menu section
    if (totalAmountDisplay) {
        totalAmountDisplay.textContent = totalWithVAT.toFixed(2);
    }

    // Update the modal total
    if (cartTotal) {
        cartTotal.textContent = totalWithVAT.toFixed(2);
    }

    updateCartCount();  // Update the cart count next to the cart icon
}

// Add item to cart
export function addToCart(item) {
    const { menuId, quantity = 1 } = item;
    if (cart[item.menuId]) {
        cart[item.menuId].quantity += quantity;
    } else {
        cart[item.menuId] = { ...item, quantity };
    }
    updateLocalStorage();
    updateCartCount();
    updateTotal();
}

// Open modal to show cart items
export function openCartModal() {
    // Show modal
    cartModal.style.display = "block";

    // Clear previous items in the modal
    cartItemsList.innerHTML = "";

    Object.values(cart).forEach(item => {
        let price = item.menuPrice;

        const li = document.createElement("li");
        li.textContent = `${item.menuName} x${item.quantity} - $${(price * item.quantity).toFixed(2)}`;
        cartItemsList.appendChild(li);
    });

    updateTotal();  // Ensure the total is updated when the modal opens
}

// Close the modal
export function closeCartModal() {
    cartModal.style.display = "none";
}

// Clear the cart
export function clearCart() {
    cart = {};
    updateLocalStorage();
    updateCartCount();
    updateTotal();
    closeCartModal();
}

// Event listeners
closeModalButton.addEventListener("click", closeCartModal);
cartContainer.addEventListener("click", openCartModal);
clearCartButton.addEventListener("click", clearCart);
