============================================
// FUNCIÓN PARA GENERAR PDF
// ============================================
function aplicarEstiloPDF() {
    if (document.getElementById("pdf-style")) return;

    const style = document.createElement("style");
    style.id = "pdf-style";
    style.innerHTML = `
        @media print {
            body {
                margin: 0 !important;
                padding: 0 !important;
                text-align: center; /* centrado horizontal */
            }

            #Hoja1 {
                display: inline-block; /* importante para centrar en body */
                width: 210mm !important;
                min-height: 297mm !important;
                padding: 15mm !important;
                box-sizing: border-box !important;
                background: white;
            }
        }
    `;
    document.head.appendChild(style);
}

function quitarEstiloPDF() {
    const style = document.getElementById("pdf-style");
    if (style) style.remove();
}

function saveAsPDF(event) {
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>⏳</span> Generando PDF...';
    btn.disabled = true;

    const element = document.getElementById('Hoja1');

    // 🔹 Aplicar estilo temporal para PDF
    element.style.width = '210mm';
    element.style.minHeight = '297mm';
    element.style.padding = '15mm';
    element.style.background = 'white';
    element.style.boxSizing = 'border-box';
    element.style.margin = '0 auto';   // centrado

    // 🔹 Esperar un momento para que renderice todo
    setTimeout(() => {
        const opt = {
            margin: 0,
            filename: 'recibo-reserva.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css'], before: '#pagina2, #pagina3' }
        };

        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                // Limpiar estilos temporales
                element.style.width = '';
                element.style.minHeight = '';
                element.style.padding = '';
                element.style.background = '';
                element.style.boxSizing = '';
                element.style.margin = '';

                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                element.style.width = '';
                element.style.minHeight = '';
                element.style.padding = '';
                element.style.background = '';
                element.style.boxSizing = '';
                element.style.margin = '';

                console.error('Error al generar PDF:', error);
                alert('Ocurrió un error al generar el PDF:\n' + error.message);
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    }, 700); // ⏱ 700ms para asegurar render
}
