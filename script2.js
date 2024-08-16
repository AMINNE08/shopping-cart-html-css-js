// Selecting DOM elements
const cartItemsContainer = document.getElementById('carditemm');
const totalPriceElement = document.getElementById('total');
const addToCartButtons = document.querySelectorAll('.CartBtn');
const likeButtons = document.querySelectorAll('.like-button');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cart = document.getElementById('cart');

let cartItems = [];

// Function to calculate the total price
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

// Function to render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    if (cartItems.length === 0) {
        cartItemsContainer.innerText = 'Your cart is empty';
        cart.classList.add('hidden');
    } else {
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}" />
                <div class="item-details">
                    <h2>${item.name}</h2>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="delete-button" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }
    calculateTotal();
    updateCartCount();
}

// Function to update the cart icon count and manage cart visibility
function updateCartCount() {
    cartCount.textContent = cartItems.length;
    if (cartItems.length === 0) {
        cart.classList.add('hidden');
    }
}

// Function to show the cart
function showCart() {
    if (cartItems.length > 0) {
        cart.classList.remove('hidden');
    }
}

// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const cartItem = cartItems.find(item => item.id === index);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            const newItem = {
                id: index,
                name: button.parentElement.parentElement.querySelector('h2').innerText,
                price: parseFloat(button.parentElement.parentElement.querySelector('.price').innerText.replace('$', '')),
                quantity: 1,
                imgSrc: button.parentElement.parentElement.parentElement.querySelector('img').src
            };
            cartItems.push(newItem);
        }
        renderCartItems();
        showCart();
    });
});

// Add event listeners to quantity control buttons
cartItemsContainer.addEventListener('click', (e) => {
    const itemId = parseInt(e.target.getAttribute('data-id'));
    if (e.target.classList.contains('minus')) {
        const cartItem = cartItems.find(item => item.id === itemId);
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            cartItems = cartItems.filter(item => item.id !== itemId);
        }
        renderCartItems();
    } else if (e.target.classList.contains('plus')) {
        const cartItem = cartItems.find(item => item.id === itemId);
        cartItem.quantity += 1;
        renderCartItems();
    } else if (e.target.classList.contains('delete-button')) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        renderCartItems();
    }
});

// Add event listeners to like buttons
likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('liked');
    });
});

// Toggle cart visibility when clicking the cart icon
cartIcon.addEventListener('click', function() {
    cart.classList.toggle('hidden');
});
