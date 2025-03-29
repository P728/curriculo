document.getElementById('generate-btn').addEventListener('click', async () => {
    const description = document.getElementById('description').value;
    if (!description.trim()) {
        alert("Por favor, forneça uma descrição!");
        return;
    }

    // Exibe a mensagem de carregamento
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('generated-image').src = ''; // Limpa imagem anterior

    try {
        // Substitua com a URL da sua API de Text to Image
        const response = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'Api-Key': 'fa51bc7c-c34b-4993-be26-5bc7eb8f9c06', // Substituímos pela chave fornecida
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: description
            })
        });

        const data = await response.json();

        if (data && data.output_url) {
            // Exibe a imagem gerada
            document.getElementById('generated-image').src = data.output_url;
        } else {
            alert('Erro ao gerar imagem. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao processar a imagem.');
    } finally {
        // Esconde a mensagem de carregamento
        document.getElementById('loading').classList.add('hidden');
    }
});
