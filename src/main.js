import './main.scss'
import './assets/fonts/Marcheile-Bold-Condensed.woff'
import './assets/fonts/Marcheile-Bold-Condensed.woff2'
import './function/menu'
import './function/map'
import { updateCartCount, openCartModal, closeCartModal, clearCart } from "./function/cart.js"

const cartModal = document.getElementById("cart-modal")
window.addEventListener("load", function() {
    cartModal.style.display = "none"
})

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount() 

    // Open cart from icon
    document.getElementById("cart-container")?.addEventListener("click", openCartModal)

    // Close cart
    document.querySelector(".close")?.addEventListener("click", closeCartModal)

    // Clear cart
    document.getElementById("clear-cart")?.addEventListener("click", clearCart)

})

