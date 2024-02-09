
function manageProgress(progressBar, currentValue, maxValue){

    // Calcular a porcentagem 
    const percentage = (currentValue / maxValue) * 30;

    // Atualizar o tamanho do progresso
    progressBar.style.width = `${percentage}%`;

    // Atualizar a cor baseada na porcentagem
    if (percentage < 15) {
        progressBar.classList.add('warning');
    }

    if (percentage < 9) {
        progressBar.classList.remove('warning');
        progressBar.classList.add('danger');
    }
}