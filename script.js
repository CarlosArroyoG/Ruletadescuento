// Función para manejar el envío del formulario
function submitForm(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // URL de Google Apps Script (Reemplaza con tu propia URL de Apps Script)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxLpPh7iAf7LpsNmbl9FB8Yh1zg1bJ7xWRsqO1U05dHAVxn9C_JLNHUyZa1P5gdMJRioA/exec';

    // Enviar los datos al Google Sheet usando fetch
    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, phone: phone })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            // Mostrar mensaje de éxito y ocultar el formulario
            document.getElementById('formMessage').textContent = `Gracias, ${name}. Tu cupón ha sido validado. Te contactaremos al ${phone}.`;
            document.getElementById('couponForm').style.display = "none";
        } else {
            // Mostrar mensaje de error
            document.getElementById('formMessage').textContent = 'Error al enviar el formulario. Inténtalo de nuevo.';
        }
    })
    .catch(error => {
        console.error('Error!', error.message);
        document.getElementById('formMessage').textContent = 'Error al enviar el formulario. Inténtalo de nuevo.';
    });
}

