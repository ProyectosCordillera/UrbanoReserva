// ============================================
// FUNCIÓN PARA GENERAR PDF
// ============================================
function aplicarEstiloPDF() {

      if (document.getElementById("pdf-style")) return;
    
    const style = document.createElement("style");
    style.id = "pdf-style";

    style.innerHTML = `
        #Hoja1 {
            width: 210mm !important;
            min-height: auto !important;
            height: auto !important;
            margin: 0 !important;
            padding: 10mm !important;
            box-sizing: border-box !important;
        }

        #Hoja1 * {
            page-break-inside: avoid;
        }

        body {
            background: white !important;
        }
    `;

    document.head.appendChild(style);
}

function quitarEstiloPDF() {
    const style = document.getElementById("pdf-style");
    if (style) style.remove();
}

function saveAsPDF(event) {

       aplicarEstiloPDF();   // ⭐ AGREGAR ESTA LÍNEA
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
                quitarEstiloPDF();   // ⭐ AGREGAR
            
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                
                quitarEstiloPDF();   // ⭐ AGREGAR
                console.error('Error al generar PDF:', error);
                alert('Ocurrió un error al generar el PDF:\n' + error.message);
                btn.innerHTML = originalText;
                btn.disabled = false;
            });

    }, 300); // 🔥 tiempo suficiente para estabilizar scroll
}
