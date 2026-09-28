// Search filter function for interactive elements
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if(query.includes('hd') || query.includes('ip') || query.includes('ptz') || query.includes('camera')) {
        document.getElementById('cameras').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Showing results for: " + query);
    }
}

// Modal open and close functions
function openBooking(serviceName) {
    document.getElementById('selectedService').innerText = serviceName;
    document.getElementById('bookingModal').style.display = 'block';
}

function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Accordion toggle for FAQ section
function toggleFaq(element) {
    element.classList.toggle('active');
}

// Form submission handler
function handleContact(event) {
    event.preventDefault();
    alert("Thank you! Your message has been sent successfully to HV Tech Solutions.");
    document.getElementById('contactForm').reset();
}

function handleModalSubmit(event) {
    event.preventDefault();
    alert("Booking confirmed successfully! Our technician will reach out soon.");
    closeBooking();
}

// Close modal if clicked outside content window
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
