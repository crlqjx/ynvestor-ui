import { loadRiskPage } from "./load_risk_page"


export function addRiskEventListener() {
    const riskURL = "/risk"
    const riskLink = document.querySelector('.risk-link')
    const riskContainer = document.createElement('div')
    const mainFrame = document.querySelector('.main-frame')

    riskContainer.classList.add('risk-container')

    function handleNavigation() {
        const currentPath = window.location.pathname
        if (currentPath === riskURL) {
            loadRiskPage()
        }
    }

    window.addEventListener("popstate", function() {
        handleNavigation
    })

    document.addEventListener('DOMContentLoaded', handleNavigation)

    riskLink.addEventListener('click', function(event) {
        event.preventDefault()
        history.pushState(null, null, riskURL)
        handleNavigation()
    })

    handleNavigation()
}
