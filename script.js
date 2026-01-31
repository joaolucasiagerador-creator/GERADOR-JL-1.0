const imageContainer = document.getElementById('imageContainer');
const imageResultElement = document.getElementById('imageResult');

function generateImage() {
    const promptValue = document.getElementById('prompt').value;
    const ratioValue = document.getElementById('dropdownRatio').value;
    const styleValue = document.getElementById('imageStyle').value;

    if (!promptValue) {
        alert('Digite algo para gerar a imagem');
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
    } else if (ratioValue === '4:3') {
        width = 1024;
        height = 768;
    } else if (ratioValue === '21:9') {
        width = 1680;
        height = 720;
    }

    const seed = Math.floor(Math.random() * 100000);

    const finalPrompt = `${promptValue}, ${getStylePrompt(styleValue)}`;

    const imageUrl =
        `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}` +
        `?width=${width}&height=${height}&seed=${seed}`;

    imageResultElement.onload = () => setLoadingState(false);
    imageResultElement.onerror = () => {
        alert('Erro ao gerar imagem');
        setLoadingState(false);
    };

    imageResultElement.src = imageUrl;
}

function setLoadingState(isLoading) {
    if (isLoading) {
        imageResultElement.style.display = 'none';
        imageContainer.classList.add('loading');
    } else {
        imageResultElement.style.display = 'block';
        imageContainer.classList.remove('loading');
    }
}

function getStylePrompt(style) {
    switch (style) {
        case 'anime':
            return 'anime style, detailed anime illustration';
        case 'cartoon':
            return 'cartoon style, colorful, simplified';
        case '3d':
            return '3D render, realistic lighting';
        case 'pixel':
            return 'pixel art, 8-bit style';
        default:
            return 'ultra realistic, high detail';
    }
}

async function downloadImage() {
    const imageUrl = imageResultElement.src;

    if (!imageUrl) {
        alert('Não há imagem para baixar');
        return;
    }

    try {
        const response = await fetch(imageUrl, { mode: 'cors' });
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'imagem-ia.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        alert('Erro ao baixar imagem');
    }
            }
