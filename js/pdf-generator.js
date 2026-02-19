// ============================================
// FUNCIÓN PARA GENERAR PDF
// ============================================

function saveAsPDF(event) {

    // 🔥 Forzar scroll arriba antes de capturar
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Mostrar feedback al usuario
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>⏳</span> Generando PDF...';
    btn.disabled = true;

    // Pequeño delay para asegurar que el navegador esté arriba
    setTimeout(() => {

        const element = document.getElementById('Hoja1');

        const opt = {
            margin: [3, 2, 3, 2],
            filename: 'recibo-reserva.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 1,
                useCORS: true,
                logging: false,
                letterRendering: true,
                allowTaint: false,
                scrollY: 0   // 🔥 Muy importante
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: {
                mode: ['css'],
                before: '#pagina2, #pagina3'
            }
        
        };

        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                console.error('Error al generar PDF:', error);
                alert('Ocurrió un error al generar el PDF:\n' + error.message);
                btn.innerHTML = originalText;
                btn.disabled = false;
            });

    }, 300); // 🔥 tiempo suficiente para estabilizar scroll
}
