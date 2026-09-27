// Smooth scrolling ane basic interactivity mate nu script
document.addEventListener('DOMContentLoaded', () => {
    console.log("HV CCTV Website Successfully Loaded!");

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
