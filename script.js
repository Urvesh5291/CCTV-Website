// Initial Products Array
let cameras = JSON.parse(localStorage.getItem('hv_cameras')) || [
    { id: 1, name: "HD Pro Camera 4MP", category: "hd", resolution: "4 Megapixel", price: "$65.00", img: "28258.jpg" },
    { id: 2, name: "Smart IP Camera 8MP", category: "ip", resolution: "8 Megapixel", price: "$120.00", img: "28259.jpg" },
    { id: 3, name: "PTZ Dome Camera 16MP", category: "ptz", resolution: "16 Megapixel", price: "$320.00", img: "28257.jpg" }
];

let cart = [];
let orders = JSON.parse(localStorage.getItem('hv_orders')) || [];

function displayCameras(filter = 'all') {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    const filtered = filter === 'all' ? cameras : cameras.filter(c => c.category === filter);

    filtered.forEach(cam => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${cam.img || '28259.jpg'}" alt="${cam.name}">
            <h3>${cam.name}</h3>
            <p>${cam.resolution}</p>
            <p class="price">${cam.price}</p>
            <button class="btn-primary" onclick="addToCart(${cam.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayCameras(category);
}

function addToCart(id) {
    const item = cameras.find(c => c.id === id);
    cart.push(item);
    document.getElementById('cartCount').innerText = cart.length;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cartItems');
    const totalContainer = document.getElementById('cartTotal');
    if(cart.length === 0) {
        cartContainer.innerHTML = "Your cart is empty.";
        totalContainer.innerHTML = "";
        return;
    }
    
    let html = "";
    let total = 0;
    cart.forEach((c, index) => {
        html += `<p>${c.name} - ${c.price}</p>`;
        total += parseFloat(c.price.replace('$', ''));
    });
    cartContainer.innerHTML = html;
    totalContainer.innerHTML = `Total Amount: $${total.toFixed(2)}`;
}

function checkoutWhatsApp() {
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    let orderText = "Hello HV Tech Solutions, I want to order:%0A";
    let total = 0;
    cart.forEach(c => {
        orderText += `- ${c.name} (${c.price})%0A`;
        total += parseFloat(c.price.replace('$', ''));
    });
    orderText += `%0ATotal: $${total.toFixed(2)}`;

    // Save order locally for Owner Hub
    const newOrder = { items: [...cart], total: `$${total.toFixed(2)}`, date: new Date().toLocaleString() };
    orders.push(newOrder);
    localStorage.setItem('hv_orders', JSON.stringify(orders));

    // Redirect to WhatsApp (replace with your WhatsApp number)
    let whatsappUrl = `https://wa.me/919876543210?text=${orderText}`;
    window.open(whatsappUrl, '_blank');
    
    cart = [];
    document.getElementById('cartCount').innerText = 0;
    updateCartDisplay();
}

// Login & Owner Hub Logic
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function handleLogin() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    if(user === 'owner' && pass === 'admin123') {
        closeLoginModal();
        openOwnerHub();
    } else {
        alert("Invalid credentials! Use user: owner, pass: admin123");
    }
}

function openOwnerHub() {
    document.getElementById('ownerHubModal').style.display = 'flex';
    loadAdminOrders();
}

function closeOwnerHub() {
    document.getElementById('ownerHubModal').style.display = 'none';
}

function addNewProduct() {
    const title = document.getElementById('newTitle').value;
    const category = document.getElementById('newCategory').value;
    const res = document.getElementById('newRes').value;
    const price = document.getElementById('newPrice').value;

    if(!title || !price) {
        alert("Please enter title and price.");
        return;
    }

    const newCam = {
        id: cameras.length + 1,
        name: title,
        category: category,
        resolution: res,
        price: price,
        img: '28259.jpg'
    };

    cameras.push(newCam);
    localStorage.setItem('hv_cameras', JSON.stringify(cameras));
    displayCameras();
    alert("New product added successfully!");
    document.getElementById('newTitle').value = '';
    document.getElementById('newRes').value = '';
    document.getElementById('newPrice').value = '';
}

function loadAdminOrders() {
    const listDiv = document.getElementById('adminOrdersList');
    if(orders.length === 0) {
        listDiv.innerHTML = "No orders received yet.";
        return;
    }
    let html = "";
    orders.forEach((ord, i) => {
        html += `<div style="background:#eee; padding:8px; margin:5px 0; border-radius:4px;">
            <b>Order #${i+1}</b> (${ord.date})<br>
            Total: <b>${ord.total}</b>
        </div>`;
    });
    listDiv.innerHTML = html;
}

window.onload = () => displayCameras();
