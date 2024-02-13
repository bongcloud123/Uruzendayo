document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    const typedarray = new Uint8Array(this.result);
    renderPDF(typedarray);
  };

  reader.readAsArrayBuffer(file);
});

function renderPDF(data) {
  pdfjsLib.getDocument({ data: data }).promise.then(function(pdf) {
    pdf.getPage(1).then(function(page) {
      const scale = 1.5;
      const viewport = page.getViewport({ scale: scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      page.render(renderContext).promise.then(function() {
        document.getElementById('pdfViewer').innerHTML = '';
        document.getElementById('pdfViewer').appendChild(canvas);
      });
    });
  });
}
