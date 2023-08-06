

export function addScreenerEventListener () {
    const screenerURL = "/screener"
    const screenerLink = document.querySelector('.screener-link')
    const screenerContainer = document.createElement('div')
    const mainFrame = document.querySelector('.main-frame')

    screenerContainer.classList.add('screener-container')

    function loadScreenerPage() {



        mainFrame.innerHTML = ''

        screenerContainer.innerHTML = 'SCREENER PART'
        mainFrame.appendChild(screenerContainer)

    }

    function handleNavigation() {
        const currentPath = window.location.pathname
        if (currentPath === screenerURL) {
            loadScreenerPage()
        }
    }

    window.addEventListener("popstate", handleNavigation)

    document.addEventListener('DOMContentLoaded', handleNavigation)

    screenerLink.addEventListener('click', function (event) {
        event.preventDefault()
        history.pushState(null, null, screenerURL)
        handleNavigation()
    })

    handleNavigation()
}
