const apiKey = 'fa51bc7c-c34b-4993-be26-5bc7eb8f9c06'; // Substitua pela sua chave da API DeepAI

document.getElementById('generate-btn').addEventListener('click', async function() {
    const inputText = document.getElementById('input-text').value;
    const loader = document.getElementById('loader');
    const illustrationContainer = document.getElementById('illustration-container');
    const imageElement = document.createElement('img');

    if (!inputText.trim()) {
        alert("Por favor, digite algo!");
        return;
    }

    // Exibir o carregamento e ocultar a ilustração anterior
    loader.style.display = 'block';
    illustrationContainer.style.display = 'none';

    try {
        // Enviar solicitação para DeepAI para gerar a imagem (com estilo line art)
        const response = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'Api-Key': apiKey
            },
            body: new URLSearchParams({
                'text': inputText + " line art" // Garantir que a descrição seja interpretada como line art
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao conectar com a API DeepAI');
        }

        const data = await response.json();

        if (data && data.output_url) {
            const imageUrl = data.output_url;

            // Exibir a imagem gerada
            imageElement.src = imageUrl;
            illustrationContainer.innerHTML = '';
            illustrationContainer.appendChild(imageElement);
            loader.style.display = 'none';
            illustrationContainer.style.display = 'block';
        } else {
            throw new Error('Não foi possível gerar a imagem');
        }

    } catch (error) {
        loader.style.display = 'none';
        alert(`Erro: ${error.message}`);
    }
});
