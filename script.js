const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');
const couponForm = document.getElementById('couponForm');
const formMessage = document.getElementById('formMessage');

// Girar la ruleta
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

// Enviar los datos del formulario a Google Sheets
function submitForm(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // URL de Google Apps Script (Reemplaza con tu propia URL de Apps Script)
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    // Enviar los datos al Google Sheet usando fetch
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
    .catch(error => {
        console.error('Error!', error.message);
        formMessage.textContent = 'Error al enviar el formulario. Inténtalo de nuevo.';
    });
}

// Asegúrate de que el evento del formulario esté enlazado correctamente
document.getElementById('form').addEventListener('submit', submitForm);
