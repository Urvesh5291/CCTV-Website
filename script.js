// Database for HD, IP, and PTZ Cameras from 2MP to 16MP in English
const cameras = [
    // HD Cameras
    { id: 1, name: "HD Pro Camera 2MP", category: "hd", resolution: "2 Megapixel", price: "$45.00", img: "28257.jpg", desc: "Crystal clear 2MP resolution with night vision support for home security." },
    { id: 2, name: "HD Pro Camera 4MP", category: "hd", resolution: "4 Megapixel", price: "$65.00", img: "28258.jpg", desc: "Enhanced clarity 4MP HD camera with weather-resistant build." },
    { id: 3, name: "HD Pro Camera 8MP", category: "hd", resolution: "8 Megapixel (4K)", price: "$95.00", img: "28259.jpg", desc: "Ultra HD 8MP resolution providing extreme detail for large areas." },
    { id: 4, name: "HD Pro Camera 16MP", category: "hd", resolution: "16 Megapixel", price: "$150.00", img: "28257.jpg", desc: "Supreme grade 16MP high definition camera for professional surveillance." },

    // IP Cameras
    { id: 5, name: "Smart IP Camera 2MP", category: "ip", resolution: "2 Megapixel", price: "$60.00", img: "28258.jpg", desc: "Network-ready 2MP IP camera with remote mobile streaming." },
    { id: 6, name: "Smart IP Camera 4MP", category: "ip", resolution: "4 Megapixel", price: "$85.00", img: "28259.jpg", desc: "Advanced 4MP IP camera with motion detection and cloud storage support." },
    { id: 7, name: "Smart IP Camera 8MP", category: "ip", resolution: "8 Megapixel (4K)", price: "$120.00", img: "28257.jpg", desc: "High performance 4K IP security camera with smart AI alerts." },
    { id: 8, name: "Smart IP Camera 16MP", category: "ip", resolution: "16 Megapixel", price: "$190.00", img: "28258.jpg", desc: "Enterprise-class 16MP IP network camera with supreme bandwidth optimization." },

    // PTZ Cameras
    { id: 9, name: "PTZ Dome Camera 2MP", category: "ptz", resolution: "2 Megapixel", price: "$110.00", img: "28259.jpg", desc: "Pan-Tilt-Zoom 2MP camera with 360-degree coverage." },
    { id: 10, name: "PTZ Dome Camera 4MP", category: "ptz", resolution: "4 Megapixel", price: "$145.00", img: "28257.jpg", desc: "Dynamic 4MP PTZ camera with optical zoom capabilities." },
    { id: 11, name: "PTZ Dome Camera 8MP", category: "ptz", resolution: "8 Megapixel (4K)", price: "$210.00", img: "28258.jpg", desc: "Professional 4K PTZ security camera for broad perimeter tracking." },
    { id: 12, name: "PTZ Dome Camera 16MP", category: "ptz", resolution: "16 Megapixel", price: "$320.00", img: "28259.jpg", desc: "Ultimate 16MP PTZ tracking system with heavy-duty exterior casing." }
];

// Display products on load
function displayCameras(filter = 'all') {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? cameras : cameras.filter(c => c.category === filter);

    filtered.forEach(cam => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openModal(cam);
        card.innerHTML = `
            <img src="${cam.img}" alt="${cam.name}">
            <h3>${cam.name}</h3>
            <p>${cam.resolution}</p>
            <p class="price">${cam.price}</p>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayCameras(category);
}

function openModal(cam) {
    document.getElementById('modalImg').src = cam.img;
    document.getElementById('modalTitle').innerText = cam.name;
    document.getElementById('modalCategory').innerText = "Category: " + cam.category.toUpperCase();
    document.getElementById('modalResolution').innerText = "Resolution: " + cam.resolution;
    document.getElementById('modalDesc').innerText = cam.desc;
    document.getElementById('modalPrice').innerText = "Price: " + cam.price;
    document.getElementById('cameraModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('cameraModal').style.display = 'none';
}

function handleSubmit(event) {
    event.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
    document.getElementById('contactForm').reset();
}

// Initialize grid on load
window.onload = () => displayCameras();
