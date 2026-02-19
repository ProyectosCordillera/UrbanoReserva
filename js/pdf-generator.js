function saveAsPDF(event) {

    window.scrollTo(0, 0);

    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Generando PDF...';
    btn.disabled = true;

    setTimeout(() => {

        const element = document.getElementById('Hoja1');

        const opt = {
            margin: 0,   // 🔥 IMPORTANTE: cero margen externo
            filename: 'recibo-reserva.pdf',

            image: {
                type: 'jpeg',
                quality: 0.98
            },

            html2canvas: {
                scale: 0.98,
                useCORS: true,
                backgroundColor: "#ffffff", // 🔥 QUITA FONDO GRIS
                scrollY: 0
            },

            jsPDF: {
                unit: 'mm',
                format: 'letter',
                orientation: 'portrait'
            },

            pagebreak: {
                mode: ['legacy'],
                after: ['#PAgina1', '#pagina2'] // 🔥 CLAVE
            }
        };

        html2pdf().set(opt).from(element).save()
            .then(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });

    }, 200);
}
