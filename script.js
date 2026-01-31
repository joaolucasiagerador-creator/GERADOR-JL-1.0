const imageContainer = document.getElementById('imageContainer');
const imageResultElement = document.getElementById('imageResult');

// Função para gerar imagem
function generateImage() {
    const promptValue = document.getElementById('prompt').value;
    const ratioValue = document.getElementById('dropdownRatio').value;

    if (!promptValue) {
        alert('Digita para poder gerar imagem');
        return;
    }

    setLoadingState(true);

    let width = 1024;
    let height = 1024;

    if (ratioValue === '16:9') {
        width = 1280;
        height = 720;
    } else if (ratioValue === '9:16') {
        width = 720;
        height = 1280;
    }

    const seed = Math.floor(Math.random() * 100000);

    const imageUrl =
        `https://image.pollinations.ai/prompt/${encodeURIComponent(promptValue)}` +
        `?width=${width}&height=${height}&seed=${seed}`;

    imageResultElement.onload = () => {
        setLoadingState(false);
    };

    imageResultElement.onerror = () => {
        alert('Erro ao gerar imagem');
        setLoadingState(false);
    };

    imageResultElement.src = imageUrl;
}

// Controle do loading
function setLoadingState(isLoading) {
    if (isLoading) {
        imageResultElement.style.display = 'none';
        imageContainer.classList.add('loading');
    } else {
        imageResultElement.style.display = 'block';
        imageContainer.classList.remove('loading');
    }
}

// Download da imagem
function downloadImage() {
    const imageUrl = imageResultElement.src;

    if (!imageUrl) {
        alert('No image to download');
        return;
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'ia-imagem.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
