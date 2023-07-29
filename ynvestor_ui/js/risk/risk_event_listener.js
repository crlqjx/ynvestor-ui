

export function addRiskEventListener () {
    const riskLink = document.querySelector('.risk-link')
    const riskContainer = document.createElement('div')
    const mainFrame = document.getElementById('main-frame')

    riskContainer.classList.add('risk-container')

    riskLink.addEventListener('click', function (event) {
        event.preventDefault()
        
        mainFrame.innerHTML = ''
        riskContainer.innerHTML = 'RISK PART'

        mainFrame.appendChild(riskContainer)
    })
}
