function saveAsPDF(event) {

    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Generando PDF...';
    btn.disabled = true;

    setTimeout(() => {

        const element = document.getElementById('Hoja1');

        const opt = {

            margin: [0, 0, 0, 0],

            filename: 'recibo-reserva.pdf',

            image: { type: 'jpeg', quality: 1 },

            html2canvas: {
                scale: 1,
                useCORS: true,
                scrollY: 0,

                // ⭐ ELIMINA FONDO GRIS
                backgroundColor: "#ffffff",

                // ⭐ EVITA QUE SE EXPANDA EL CANVAS
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            },

            jsPDF: {
                unit: 'mm',
                format: 'letter',
                orientation: 'portrait'
            },

            // ⭐ CONTROL REAL DE PAGINACIÓN
            pagebreak: {
                mode: ['css'],

                // SOLO cortar donde tú lo indiques
                before: ['#pagina2', '#pagina3'],

                // EVITA hojas vacías
                avoid: ['.signature-section']
            }
        };

       html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });

    }, 150);
}
