//função da barra de progresso com valores aleatórios
function manageProgress(progressBar, currentValue, maxValue){

    //calcula a porcentagem 
    const percentage = (currentValue / maxValue) * 30;

    //atualizar o tamanho do progresso
    progressBar.style.width = `${percentage}%`;

    //atualizar a cor baseada na porcentagem
    if (percentage < 15) {
        progressBar.classList.add('warning');
    }

    if (percentage < 9) {
        progressBar.classList.remove('warning');
        progressBar.classList.add('danger');
    }
}