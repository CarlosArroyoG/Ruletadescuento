const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');
const couponMessage = document.getElementById('couponMessage');
const discountSpan = document.getElementById('discount');

// Girar la ruleta
spinButton.addEventListener('click', () => {
    const randomDegree = Math.floor(Math.random() * 3600) + 360;
    const sectionDegree = 60; // Cada sección es de 60 grados
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const normalizedDegree = randomDegree % 360;
        const sectionIndex = Math.floor(normalizedDegree / sectionDegree);
        const discount = wheel.children[sectionIndex].textContent;

        // Mostrar el porcentaje de descuento y el mensaje de validación
        resultDiv.textContent = `¡Felicidades! Obtuviste un ${discount} de descuento.`;
        discountSpan.textContent = discount; // Mostrar el descuento en el mensaje
        couponMessage.style.display = "block"; // Mostrar el mensaje
    }, 4000); // Duración de la animación (4s)
});

