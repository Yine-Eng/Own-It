let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-x');
    navbar.classList.remove('active');
};

let rentButtons = document.querySelectorAll('.services-container .btn');
let dropdown = document.querySelector('.form-container select');

rentButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        let carName = button.closest('.box').querySelector('h3').innerText;
        for (let option of dropdown.options) {
            if (option.text === carName) {
                option.selected = true;
                break;
            }
        }
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    });
});

// Get the date inputs
const pickUpDate = document.getElementById('pickUpDate');
const returnDate = document.getElementById('returnDate');

// Disable the return date input until a pick-up date is selected
returnDate.disabled = true;

// Disable past dates for the pick-up date
const today = new Date().toISOString().split('T')[0];
pickUpDate.setAttribute('min', today);

// Enable and set constraints on the return date when the pick-up date changes
pickUpDate.addEventListener('input', () => {
    if (pickUpDate.value) {
        returnDate.disabled = false;
        returnDate.setAttribute('min', pickUpDate.value);

        if (new Date(returnDate.value) < new Date(pickUpDate.value)) {
            returnDate.value = '';
        }
    } else {
        returnDate.disabled = true;
        returnDate.value = '';
    }
});

// Add a listener to ensure the return date is after the pick-up date
returnDate.addEventListener('change', () => {
    if (new Date(returnDate.value) < new Date(pickUpDate.value)) {
        returnDate.value = '';
        alert('Return date cannot be before pick-up date.');
    }
});

fetch('/api/google-maps-key')
    .then(response => response.json())
    .then(data => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places&callback=initAutocomplete`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    })
    .catch(error => {
        console.error('Error fetching the API key:', error);
    });