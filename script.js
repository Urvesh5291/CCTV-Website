// Scroll animation & Interactive elements
document.addEventListener("DOMContentLoaded", function() {
    console.log("CCTV Service Website Loaded Successfully with WhatsApp Integration!");

    // Intersection Observer for scroll reveal effect on service boxes
    const serviceBoxes = document.querySelectorAll('.service-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    serviceBoxes.forEach(box => {
        box.style.opacity = 0;
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'all 0.6s ease-out';
        observer.observe(box);
    });
});
