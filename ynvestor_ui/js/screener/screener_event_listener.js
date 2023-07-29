

export function addScreenerEventListener () {
    const screenerLink = document.querySelector('.screener-link')
    const screenerContainer = document.createElement('div')
    const mainFrame = document.getElementById('main-frame')

    screenerContainer.classList.add('screener-container')

    screenerLink.addEventListener('click', function (event) {
        event.preventDefault()

        mainFrame.innerHTML = ''

        screenerContainer.innerHTML = 'SCREENER PART'
        mainFrame.appendChild(screenerContainer)
    })
}
