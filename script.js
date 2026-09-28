// Cameras Products Data including HD, IP, and PTZ Cameras
const products = [
    { id: 1, name: "HD Security Camera", price: 2499, image: "28257.jpg", desc: "High-definition crystal clear night vision camera." },
    { id: 2, name: "IP Smart Camera", price: 3999, image: "28258.jpg", desc: "Wi-Fi enabled network camera with remote mobile view." },
    { id: 3, name: "PTZ Dome Camera", price: 6499, image: "28259.jpg", desc: "Pan, Tilt & Zoom coverage with 360-degree rotation." }
];

let cart = [];

// Load Products dynamically
function displayProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = "";
    products.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="price">₹${product.price}</div>
                <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;
    renderCartItems();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        container.innerHTML += `
            <div class="cart-item-row">
                <span>${item.name} (x${item.quantity})</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
    });

    document.getElementById('cart-total').innerText = total;
}

function checkout() {
    if(cart.length === 0) {
        alert("Tamaro cart khali che!");
        return;
    }
    alert("Tamaro order સફળતાપૂર્વક place thai gayo che!");
    cart = [];
    updateCartCount();
    toggleCart();
}

function handleSubmit(event) {
    event.preventDefault();
    alert("Tamari araj maligayi che! Ame jaldij sampark karisu.");
    document.getElementById('contactForm').reset();
}

// Initialize products on load
window.onload = displayProducts;
