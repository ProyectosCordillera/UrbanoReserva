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
            // ✅ MÁRGENES AJUSTADOS A 1.5CM (15mm)
            // Formato: [superior, derecho, inferior, izquierdo] en mm
            margin: [10, 10, 10, 10],
            
            filename: 'recibo-reserva.pdf',
            
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            
            html2canvas: {
                scale: 2,  // ✅ Aumentado para mejor calidad
                useCORS: true,
                logging: false,
                letterRendering: true,
                allowTaint: false,
                scrollY: 0,
                windowWidth: 800  // ✅ Ancho fijo para consistencia
            },
            
            jsPDF: {
                unit: 'mm',
                format: 'letter',
                orientation: 'portrait'
            },
            
            // ✅ CONFIGURACIÓN DE SALTOS DE PÁGINA
            pagebreak: {
                mode: ['css'],
                before: ['.page-break'],      // ✅ Salta antes de .page-break
                after: [],                     // ✅ Evita saltos después
                avoid: ['.signature-section']  // ✅ Evita cortar firmas
            }
        };

        html2pdf()
            .set(opt)
            .from(element)
            .toPdf()
            .get('pdf')
            .then(function(pdf) {
                // ✅ Eliminar páginas en blanco al final
                const totalPages = pdf.internal.getNumberOfPages();
                for (let i = totalPages; i > 0; i--) {
                    const page = pdf.internal.pages[i];
                    if (page === undefined || page.trim() === '') {
                        pdf.deletePage(i);
                    }
                }
            })
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

    }, 300);
}
