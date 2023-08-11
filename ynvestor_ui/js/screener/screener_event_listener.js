import {loadScreenerPage} from './load_screener_page.js'

export function addScreenerEventListener() {
    const screenerURL = "/screener"
    const screenerLink = document.querySelector('.screener-link')
    const screenerContainer = document.createElement('div')

    screenerContainer.classList.add('screener-container')



    function handleNavigation() {

        if (window.location.pathname === screenerURL) {
            screenerContainer.innerHTML = ""
            loadScreenerPage(screenerContainer)
        }
    }

    window.addEventListener("popstate", handleNavigation)

    document.addEventListener('DOMContentLoaded', handleNavigation)

    screenerLink.addEventListener('click', function(event) {
        event.preventDefault()
        history.pushState(null, null, screenerURL)
        handleNavigation()
    })
    handleNavigation()
}
