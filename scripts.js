document.getElementById('generate-btn').addEventListener('click', function() {
  const inputText = document.getElementById('input-text').value;
  const loader = document.getElementById('loader');
  const illustrationContainer = document.getElementById('illustration-container');
  const canvas = document.getElementById('canvas');
  
  if (!inputText.trim()) {
    alert("Por favor, digite algo!");
    return;
  }

  // Exibir o carregamento e ocultar a ilustração anterior
  loader.style.display = 'block';
  illustrationContainer.style.display = 'none';

  // Criar um efeito de animação na ilustração
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Iniciar uma animação (geração de ilustração fictícia)
  let drawProgress = 0;
  
  function animateDrawing() {
    if (drawProgress < 100) {
      drawProgress += 2; // Acelera a animação
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(50, 50, drawProgress * 2, 20); // Exemplo de um "desenho" sendo feito
      requestAnimationFrame(animateDrawing);
    } else {
      loader.style.display = 'none';
      illustrationContainer.style.display = 'block';
    }
  }

  // Começar a animação
  animateDrawing();
});
