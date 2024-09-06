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

    // Mostrar mensaje de confirmación
    formMessage.textContent = `Gracias, ${name}. Tu cupón ha sido validado. Te contactaremos al ${phone}.`;
    
    // Ocultar el formulario después del envío
    couponForm.style.display = "none";
}
