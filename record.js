//descrição
document.getElementById('recordAudio').addEventListener('click', function () {
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window
      .mozSpeechRecognition || window.msSpeechRecognition)();
  
    const recordButton = document.getElementById('recordAudio');
  
    recognition.lang = 'pt-BR';
    recognition.start();

    // Mostrar "Gravando..." no botão ao iniciar a gravação
    recordButton.textContent = 'Gravando...';
  
    recognition.onresult = function (event) {
      texto.value = event.results[0][0].transcript;
      // Retornar o texto original do botão após a gravação estar completa
      recordButton.textContent = 'Gravar Áudio';
    };
  
    recognition.onerror = function (event) {
      alert('Erro ao gravar o áudio: ' + event.error);
      // Retornar o texto original do botão se ocorrer um erro
      recordButton.textContent = 'Gravar Áudio';
    };
});
