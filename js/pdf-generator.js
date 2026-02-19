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
    btn.innerHTML = '⏳ Generando PDF...';
    btn.disabled = true;

    const element = document.getElementById('Hoja1');

    // 🔹 Estilos temporales para html2pdf
    element.style.width = '210mm';
    element.style.minHeight = '297mm';
    element.style.padding = '15mm';
    element.style.background = 'white';
    element.style.margin = '0 auto';
    element.style.boxSizing = 'border-box';

    setTimeout(() => {
        if (!html2pdf) {
            alert('html2pdf.js no cargó correctamente.');
            btn.innerHTML = '💾 PDF';
            btn.disabled = false;
            return;
        }

        const opt = {
            margin: 0,
            filename: 'recibo.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, scrollY: 0, logging: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css'], before: '#pagina2, #pagina3' }
        };

        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .finally(() => {
                // 🔹 Limpiar estilos temporales
                element.style.width = '';
                element.style.minHeight = '';
                element.style.padding = '';
                element.style.background = '';
                element.style.margin = '';
                element.style.boxSizing = '';

                btn.innerHTML = '💾 PDF';
                btn.disabled = false;
            });

    }, 800); // ⏱ tiempo para que se renderice todo
}
