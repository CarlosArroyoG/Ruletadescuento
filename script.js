const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');
const couponForm = document.getElementById('couponForm');
const formMessage = document.getElementById('formMessage');

spinButton.addEventListener('click', () => {
    const randomDegree = Math.floor(Math.random() * 3600) + 360;
    const sectionDegree = 60; // Cada sección es de 60 grados
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const normalizedDegree = randomDegree % 360;
        const sectionIndex = Math.floor(normalizedDegree / sectionDegree);
        const discount = wheel.children[sectionIndex].textContent;

        resultDiv.textContent = `¡Felicidades! Obtuviste un ${discount} de descuento.`;
        
        // Mostrar el formulario después de que la ruleta termina de girar
        couponForm.style.display = "block";
    }, 4000); // Duración de la animación (4s)
});

// Función para manejar el envío del formulario
function submitForm(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // URL de Google Apps Script (cambia esta URL por la tuya)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxLpPh7iAf7LpsNmbl9FB8Yh1zg1bJ7xWRsqO1U05dHAVxn9C_JLNHUyZa1P5gdMJRioA/exec';

    // Enviar datos a Google Sheets
    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, phone: phone })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            formMessage.textContent = `Gracias, ${name}. Tu cupón ha sido validado. Te contactaremos al ${phone}.`;
            couponForm.style.display = "none"; // Ocultar el formulario después de enviarlo
        } else {
            formMessage.textContent = 'Error al enviar el formulario. Inténtalo de nuevo.';
        }
    })
    .catch(error => console.error('Error!', error.message));
}

