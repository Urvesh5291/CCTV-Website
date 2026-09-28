// Complete Camera Models Data in English (2MP to 16MP)
let cameras = JSON.parse(localStorage.getItem('hv_cameras')) || [
    // HD Cameras
    { id: 1, name: "HD Pro Camera 2MP", category: "hd", resolution: "2 Megapixel", price: "$45.00", img: "28257.jpg" },
    { id: 2, name: "HD Pro Camera 4MP", category: "hd", resolution: "4 Megapixel", price: "$65.00", img: "28257.jpg" },
    { id: 3, name: "HD Pro Camera 8MP", category: "hd", resolution: "8 Megapixel (4K)", price: "$95.00", img: "28257.jpg" },
    { id: 4, name: "HD Pro Camera 16MP", category: "hd", resolution: "16 Megapixel", price: "$150.00", img: "28257.jpg" },

    // IP Cameras
    { id: 5, name: "Smart IP Camera 2MP", category: "ip", resolution: "2 Megapixel", price: "$60.00", img: "28258.jpg" },
    { id: 6, name: "Smart IP Camera 4MP", category: "ip", resolution: "4 Megapixel", price: "$85.00", img: "28258.jpg" },
    { id: 7, name: "Smart IP Camera 8MP", category: "ip", resolution: "8 Megapixel (4K)", price: "$120.00", img: "28258.jpg" },
    { id: 8, name: "Smart IP Camera 16MP", category: "ip", resolution: "16 Megapixel", price: "$190.00", img: "28258.jpg" },

    // PTZ Cameras
    { id: 9, name: "PTZ Dome Camera 2MP", category: "ptz", resolution: "2 Megapixel", price: "$110.00", img: "28259.jpg" },
    { id: 10, name: "PTZ Dome Camera 4MP", category: "ptz", resolution: "4 Megapixel", price: "$145.00", img: "28259.jpg" },
    { id: 11, name: "PTZ Dome Camera 8MP", category: "ptz", resolution: "8 Megapixel (4K)", price: "$210.00", img: "28259.jpg" },
    { id: 12, name: "PTZ Dome Camera 16MP", category: "ptz", resolution: "16 Megapixel", price: "$320.00", img: "28259.jpg" }
];

let cart = [];
let orders = JSON.parse(localStorage.getItem('hv_orders')) || [];
let activeCategory = null;

function toggleCategory(categoryKey) {
    const container = document.getElementById('dynamicModelsContainer');
    const title = document.getElementById('activeCategoryTitle');
    const grid = document.getElementById('productGrid');

    if (activeCategory === categoryKey) {
        // Toggle off if already open
        container.style.display = 'none';
        activeCategory = null;
        return;
    }

    activeCategory = categoryKey;
    container.style.display = 'block';

    let titleText = "";
    if(categoryKey === 'hd') titleText = "HD Camera Models (2MP - 16MP)";
    if(categoryKey === 'ip') titleText = "IP Camera Models (2MP - 16MP)";
    if(categoryKey === 'ptz') titleText = "PTZ Camera Models (2MP - 16MP)";
    
    title.innerText = titleText;
    grid.innerHTML = '';

    const filtered = cameras.filter(c => c.category === categoryKey);
    filtered.forEach(cam => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${cam.img}" alt="${cam.name}">
            <h3>${cam.name}</h3>
            <p>Resolution: ${cam.resolution}</p>
            <p class="price">Price: ${cam.price}</p>
            <button class="btn-primary" onclick="addToCart(${cam.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });

    container.scrollIntoView({ behavior: 'smooth' });
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
    cart.forEach(c => {
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

    const newOrder = { items: [...cart], total: `$${total.toFixed(2)}`, date: new Date().toLocaleString() };
    orders.push(newOrder);
    localStorage.setItem('hv_orders', JSON.stringify(orders));

    let whatsappUrl = `https://wa.me/919876543210?text=${orderText}`;
    window.open(whatsappUrl, '_blank');
    
    cart = [];
    document.getElementById('cartCount').innerText = 0;
    updateCartDisplay();
}

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
        img: category === 'hd' ? '28257.jpg' : (category === 'ip' ? '28258.jpg' : '28259.jpg')
    };

    cameras.push(newCam);
    localStorage.setItem('hv_cameras', JSON.stringify(cameras));
    alert("New product added successfully!");
    document.getElementById('newTitle').value = '';
    document.getElementById('newRes').value = '';
    document.getElementById('newPrice').value = '';
    
    if(activeCategory === category) {
        toggleCategory(category);
        toggleCategory(category);
    }
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
            <b>Order #${i+1}</b> (${ord.date})<br>Total: <b>${ord.total}</b>
        </div>`;
    });
    listDiv.innerHTML = html;
}
