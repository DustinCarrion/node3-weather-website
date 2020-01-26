const weatherForm = document.getElementById('weatherForm');
const msg_1 = document.getElementById('msg-1');
const msg_2 = document.getElementById('msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const address = weatherForm.querySelector('input').value;

    msg_1.textContent = 'Loading forecast...';
    msg_2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + address).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                msg_1.textContent = data.error;
                msg_2.textContent = '';
                return;
            }
            msg_1.innerHTML = '<strong>Location:</strong> ' + data.location;
            msg_2.innerHTML = '<strong>Forecast:</strong> ' + data.forecast;
        });
    });

});
