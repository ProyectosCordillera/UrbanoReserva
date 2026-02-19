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
                backgroundColor: "#ffffff",
                scrollY: 0
            },

            jsPDF: {
                unit: 'mm',
                format: 'letter',
                orientation: 'portrait'
            },

            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy']
            }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });

    }, 150);
}
