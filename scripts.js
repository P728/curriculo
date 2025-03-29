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
        // Chama a API de geração de imagens (substitua pela sua API real)
        const response = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'Api-Key': 'SUA_API_KEY_AQUI', // Substitua pela sua chave de API
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: description,
                style: 'line_art' // Defina o estilo como line art, caso o modelo da API suporte isso
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
