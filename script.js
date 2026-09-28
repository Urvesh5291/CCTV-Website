// Database containing Dome and Bullet cameras from 2MP to 16MP
let cameras = JSON.parse(localStorage.getItem('hv_cameras')) || [
    // Dome Cameras (2MP to 16MP)
    { id: 1, name: "Analog/IP Dome Camera 2MP", category: "dome", resolution: "2 Megapixel", price: "$35.00", img: "28257.jpg" },
    { id: 2, name: "Analog/IP Dome Camera 4MP", category: "dome", resolution: "4 Megapixel", price: "$50.00", img: "28257.jpg" },
    { id: 3, name: "Analog/IP Dome Camera 8MP", category: "dome", resolution: "8 Megapixel (4K)", price: "$85.00", img: "28257.jpg" },
    { id: 4, name: "Analog/IP Dome Camera 16MP", category: "dome", resolution: "16 Megapixel", price: "$135.00", img: "28257.jpg" },

    // Bullet Cameras (2MP to 16MP)
    { id: 5, name: "Analog/IP Bullet Camera 2MP", category: "bullet", resolution: "2 Megapixel", price: "$40.00", img: "28258.jpg" },
    { id: 6, name: "Analog/IP Bullet Camera 4MP", category: "bullet", resolution: "4 Megapixel", price: "$55.00", img: "28258.jpg" },
    { id: 7, name: "Analog/IP Bullet Camera 8MP", category: "bullet", resolution: "8 Megapixel (4K)", price: "$90.00", img: "28258.jpg" },
    { id: 8, name: "Analog/IP Bullet Camera 16MP", category: "bullet", resolution: "16 Megapixel", price: "$145.00", img: "28258.jpg" },

    // WiFi Camera Models
    { id: 9, name: "Wireless WiFi Smart Camera 2MP", category: "wifi", resolution: "2 Megapixel", price: "$50.00", img: "28259.jpg" },
    { id: 10, name: "Wireless WiFi Pan Camera 5MP", category: "wifi", resolution: "5 Megapixel", price: "$75.00", img: "28259.jpg" },

    // PTZ Camera Models
    { id: 11, name: "PTZ Outdoor Dome Camera 4MP", category: "ptz", resolution: "4 Megapixel", price: "$140.00", img: "28257.jpg" },
    { id: 12, name: "PTZ Heavy Duty Camera 8MP", category: "ptz", resolution: "8 Megapixel (4K)", price: "$220.00", img: "28257.jpg" }
];

let cart = [];
let orders = JSON.parse(localStorage.getItem('hv_orders')) || [];
let currentNavState = 'main'; // 'main', 'wiredSub', or 'products'

function resetToMainCategories() {
    currentNavState = 'main';
    document.getElementById('categories').style.display = 'block';
    document.getElementById('wiredSubCategories').style.display = 'none';
    document.getElementById('productSection').style.display = 'none';
    window.location.hash = '#categories';
}

function selectMainCategory(key) {
    if(key === 'wired') {
        currentNavState = 'wiredSub';
        document.getElementById('categories').style.display = 'none';
        document.getElementById('wiredSubCategories').style.display = 'block';
        window.location.hash = '#wiredSubCategories';
    }
}

function selectWiredType(typeKey) {
    currentNavState = 'products';
    document.getElementById('wiredSubCategories').style.display = 'none';
    showProductGrid(typeKey);
}

function selectCategoryDirect(categoryKey) {
    currentNavState = 'products';
    document.getElementById('categories').style.display = 'none';
    showProductGrid(categoryKey);
}

function showProductGrid(categoryKey) {
    const productSection = document.getElementById('productSection');
    productSection.style.display = 'block';

    let titleText = "";
    if(categoryKey === 'dome') titleText = "Analog/IP Dome Cameras (2MP to 16MP)";
    if(categoryKey === 'bullet') titleText = "Analog/IP Bullet Cameras (2MP to 16MP)";
    if(categoryKey === 'wifi') titleText = "WiFi Wireless Security Cameras";
    if(categoryKey === 'ptz') titleText = "PTZ High-Speed Cameras";
    
    document.getElementById('categoryTitle').innerText = titleText;

    const grid = document.getElementById('productGrid');
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

    window.location.hash = '#productSection';
}

function backToPreviousMenu() {
    if(currentNavState === 'products') {
        // If coming from product grid, check if it was dome/bullet (wired sub) or wifi/ptz (main)
        const activeTitle = document.getElementById('categoryTitle').innerText;
        if(activeTitle.includes('Dome') || activeTitle.includes('Bullet')) {
            document.getElementById('productSection').style.display = 'none';
            document.getElementById('wiredSubCategories').style.display = 'block';
            currentNavState = 'wiredSub';
        } else {
            resetToMainCategories();
        }
    }
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
        img: category === 'dome' ? '28257.jpg' : '28258.jpg'
    };

    cameras.push(newCam);
    localStorage.setItem('hv_cameras', JSON.stringify(cameras));
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
            <b>Order #${i+1}</b> (${ord.date})<br>Total: <b>${ord.total}</b>
        </div>`;
    });
    listDiv.innerHTML = html;
                   }
