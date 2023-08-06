

export function addOptimizerEventListener () {
    const optimizerURL = "/optimizer"
    const optimizerLink = document.querySelector('.optimizer-link')
    const optimizerContainer = document.createElement('div')
    const mainFrame = document.querySelector('.main-frame')

    optimizerContainer.classList.add('optimizer-container')

    function loadOptimizerPage() {

        mainFrame.innerHTML = ''

        optimizerContainer.innerHTML = 'OPTIMIZER PART'
        mainFrame.appendChild(optimizerContainer)
    }

    function handleNavigation() {
        const currentPath = window.location.pathname
        if (currentPath === optimizerURL) {
            loadOptimizerPage()
        }
    }

    window.addEventListener('popstate', function () {
        handleNavigation()
    })

    document.addEventListener('DOMContentLoaded', handleNavigation)

    optimizerLink.addEventListener('click', function (event) {
        event.preventDefault()
        history.pushState(null, null, optimizerURL)
        handleNavigation()
    })

    handleNavigation()
}
