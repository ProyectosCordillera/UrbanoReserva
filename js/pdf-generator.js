// ============================================
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
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        #Hoja1 {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            image-rendering: -webkit-optimize-contrast !important;
            image-rendering: crisp-edges !important;
        }
    }
    
    /* Evita que el navegador escale imágenes */
    #Hoja1 img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        max-width: 100%;
        height: auto;
    }
    
    /* Texto más nítido */
    #Hoja1 {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }
    
 .pdf-margin {
        padding: 12mm 15mm;
    }
`;
    document.head.appendChild(style);
}

function quitarEstiloPDF() {
    const style = document.getElementById("pdf-style");
    if (style) style.remove();
}

function saveAsPDF(event) {
    aplicarEstiloPDF();
    window.scrollTo({ top: 0, behavior: 'instant' });

    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>⏳</span> Generando PDF...';
    btn.disabled = true;

    setTimeout(() => {
        const element = document.getElementById('Hoja1');

        const opt = {
            margin: [3, 2, 3, 2],
            filename: 'recibo-reserva.pdf',
            
            // 🖼️ Configuración de imagen (CALIDAD)
            image: {
                type: 'png',              // ← PNG para texto nítido (sin compresión con pérdida)
                quality: 1.0              // ← Máxima calidad (solo aplica si usas jpeg)
            },
            
            // 🎨 html2canvas: El corazón de la calidad
            html2canvas: {
                scale: 4,                   // ← ⭐ CLAVE: 2=buena, 3=excelente, 4=máxima (pero más pesado)
                useCORS: true,
                logging: false,
                letterRendering: true,
                allowTaint: false,
                scrollY: -window.scrollY,
                backgroundColor: '#ffffff', // ← Evita fondos transparentes
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                antialias: true,            // ← Suaviza bordes
                removeContainer: true       // ← Limpia memoria después
            },
            
            // 📄 jsPDF: Configuración de salida
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true              // ← Reduce peso sin perder calidad visible
            },
            
            // 📑 Saltos de página
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
                quitarEstiloPDF();
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                quitarEstiloPDF();
                console.error('Error al generar PDF:', error);
                alert('Ocurrió un error al generar el PDF:\n' + error.message);
                btn.innerHTML = originalText;
                btn.disabled = false;
            });

    }, 150); // 150ms es suficiente con estilos aplicados
}
