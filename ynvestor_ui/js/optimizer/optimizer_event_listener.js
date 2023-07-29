

export function addOptimizerEventListener () {
    const optimizerLink = document.querySelector('.optimizer-link')
    const optimizerContainer = document.createElement('div')
    const mainFrame = document.getElementById('main-frame')

    optimizerContainer.classList.add('optimizer-container')

    optimizerLink.addEventListener('click', function (event) {
        event.preventDefault()

        mainFrame.innerHTML = ''

        optimizerContainer.innerHTML = 'OPTIMIZER PART'
        mainFrame.appendChild(optimizerContainer)
    })
}
