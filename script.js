document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            if(name && phone && message) {
                alert(`Thank you ${name}! Tamaro message malyo chhe. Ame jaldaj tamaro sampark karisu.`);
                contactForm.reset();
            } else {
                alert('Kruba kari badhi details bharo.');
            }
        });
    }
});
