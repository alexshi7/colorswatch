function analyzeImageColors() {
    console.log("Analyze Colors button clicked");

    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (file) {
        console.log("File selected:", file.name);

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                console.log("Image loaded for analysis");

                // Set the preview image
                const imagePreview = document.getElementById('imagePreview');
                imagePreview.src = img.src;

                // Vibrant.js processing
                try {
                    Vibrant.from(img).getPalette((err, palette) => {
                        if (err) {
                            console.error("Vibrant.js error:", err);
                            return;
                        }

                        console.log("Palette:", palette);

                        const colorPalette = document.getElementById('colorPalette');
                        colorPalette.innerHTML = ''; // Clear any previous results

                        for (const swatch in palette) {
                            if (palette[swatch]) {
                                const hexCode = palette[swatch].getHex();
                                console.log("Swatch found:", hexCode);

                                const colorBoxContainer = document.createElement('div');
                                colorBoxContainer.style.display = 'inline-block';
                                colorBoxContainer.style.textAlign = 'center';
                                colorBoxContainer.style.margin = '5px';

                                const colorBox = document.createElement('div');
                                colorBox.className = 'color-box';
                                colorBox.style.backgroundColor = hexCode;

                                const hexText = document.createElement('p');
                                hexText.style.margin = '5px 0 0 0';
                                hexText.style.fontSize = '12px';
                                hexText.style.color = '#333';
                                hexText.textContent = hexCode;

                                colorBoxContainer.appendChild(colorBox);
                                colorBoxContainer.appendChild(hexText);
                                colorPalette.appendChild(colorBoxContainer);
                            }
                        }
                    });
                } catch (error) {
                    console.error("Vibrant.js error:", error);
                }
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
}
