function saveAsPDF(event) {

    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Generando PDF...';
    btn.disabled = true;

    setTimeout(() => {

        const element = document.getElementById('Hoja1');

        // 👉 MÁRGENES CONTROLADOS EN TIEMPO REAL
        const marginTop = 12;
        const marginBottom = 12;
        const marginLeft = 15;
        const marginRight = 15;

        const opt = {

            margin: [marginTop, marginLeft, marginBottom, marginRight],

            filename: 'recibo-reserva.pdf',

            image: { type: 'jpeg', quality: 1 },

            html2canvas: {
                scale: 1,
                useCORS: true,
                backgroundColor: "#ffffff",
                scrollY: 0
            },

            jsPDF: {
                unit: 'mm',
                format: 'letter',
                orientation: 'portrait'
            },

            // 👉 CORTE CONTROLADO EXACTO
            pagebreak: {
                mode: ['css', 'legacy'],
                after: ['#PAgina1', '#pagina2']
            }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });

    }, 150);
}
