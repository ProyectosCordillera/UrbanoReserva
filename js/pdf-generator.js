function saveAsPDF(event) {

    window.scrollTo(0, 0);

    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Generando PDF...';
    btn.disabled = true;

    setTimeout(() => {

        const element = document.getElementById('Hoja1');

        const opt = {

            // 👉 AQUÍ CONTROLAS LOS MÁRGENES
            margin: [15, 15, 15, 15],

            filename: 'recibo-reserva.pdf',

            image: {
                type: 'jpeg',
                quality: 0.98
            },

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

            // 👉 CLAVE: usar AFTER, nunca BEFORE
            pagebreak: {
                mode: ['legacy'],
                after: ['#PAgina1', '#pagina2']
            }
        };

        html2pdf().set(opt).from(element).save()
            .then(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });

    }, 200);
}
