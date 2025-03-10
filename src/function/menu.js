import menuData from '../menu.json' 
import { addToCart } from "./cart.js"

document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.querySelector(".menu-items") 

    menuData.menuList.forEach(item => {
        const imgName = item.menuName.toLowerCase().replace(/\s+/g, "-")
        const imagePath = new URL(`/assets/images/gastro/gasto-item-${imgName}.JPG`, import.meta.url).href
        
        const menuItem = document.createElement("div") 
        
        // Insert HTML with menu data into menu item container
        menuItem.innerHTML = `
            <div class="menu-item">
                <div class="image-container">
                    <img src="${imagePath}" alt="${item.menuName}">
                    <div class="price-tag">$${item.menuPrice.toFixed(2)}</div>
                </div>
                <div class="menu-content">
                    <h3>${item.menuName}</h3>
                    <p data-full-description="${item.menuDescription}">${item.menuDescription}</p>
                    <div class="actions-container">
                        <div class="quantity-controls">
                            <button class="decrease">-</button>
                            <span class="quantity">1</span>
                            <button class="increase">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>    
        ` 

        //Discount case
        if (item.menuName.toLowerCase().includes("milkshake")) {
            const discountBadge = document.createElement('div');
            discountBadge.classList.add('discount-badge');
            discountBadge.textContent = '20% OFF!';
            menuItem.querySelector('.image-container').appendChild(discountBadge);
        }

        menuContainer.appendChild(menuItem) 

        const quantityElement = menuItem.querySelector(".quantity")
        let quantity = 1

        menuItem.querySelector(".increase").addEventListener("click", () => {
            quantityElement.textContent = ++quantity
        })

        menuItem.querySelector(".decrease").addEventListener("click", () => {
            if (quantity > 1) {
                quantityElement.textContent = --quantity
            }
        })

        menuItem.querySelector(".add-to-cart").addEventListener("click", () => {
            addToCart({ ...item, quantity }) 
            alert(`${quantity} ${item.menuName} added to cart!`)
            updateCartCount()
            updateTotal()
            quantity = 1
            quantityElement.textContent = quantity
        })
    })
})
