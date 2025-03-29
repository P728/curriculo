// URL do modelo de transferência de estilo
const MODEL_URL = "https://tfhub.dev/google/tfjs-model/arbitrary-image-stylization-v1-256/1/default/1";

// Carregar o modelo
let model;
async function loadModel() {
    model = await tf.loadGraphModel(MODEL_URL, {fromTFHub: true});
}

// Função para aplicar a transferência de estilo
async function applyStyle(imageElement) {
    // Mostrar o carregamento
    document.getElementById('loading').style.display = 'block';

    // Converter a imagem para tensor e normalizar
    const tensorImage = tf.browser.fromPixels(imageElement).toFloat();
    const normalizedImage = tensorImage.div(tf.scalar(255));

    // Definir a imagem de estilo (vamos usar uma imagem fixa para esse exemplo)
    const styleImage = new Image();
    styleImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Sen_to_Chihiro_no_Kamikakushi_logo.svg/330px-Sen_to_Chihiro_no_Kamikakushi_logo.svg.png';  // Exemplo de imagem de estilo
    await new Promise(resolve => {
        styleImage.onload = resolve;
    });

    const styleTensor = tf.browser.fromPixels(styleImage).toFloat().div(tf.scalar(255));

    // Aplicar a transformação de estilo
    const stylizedImage = await model.stylize(normalizedImage, styleTensor);

    // Exibir a imagem estilizada no canvas
    const outputCanvas = document.getElementById('canvas-stylized');
    await tf.browser.toPixels(stylizedImage, outputCanvas);

    // Esconder o indicador de carregamento
    document.getElementById('loading').style.display = 'none';
}

// Função para lidar com o upload de imagem
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = new Image();
            image.src = e.target.result;
            image.onload = function() {
                // Exibir a imagem original no canvas
                const originalCanvas = document.getElementById('canvas-original');
                originalCanvas.width = image.width;
                originalCanvas.height = image.height;
                const ctx = originalCanvas.getContext('2d');
                ctx.drawImage(image, 0, 0);

                // Aplicar o estilo após a imagem carregar
                applyStyle(image);
            }
        };
        reader.readAsDataURL(file);
    }
}

// Adicionar evento para carregar a imagem
document.getElementById('image-upload').addEventListener('change', handleImageUpload);

// Carregar o modelo quando a página carregar
loadModel();
