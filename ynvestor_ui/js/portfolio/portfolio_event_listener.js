import { getCurrentPortfolio } from './get_portfolio.js'


export function addPortfolioEventListener () {
    const portfolioLink = document.querySelector('.portfolio-link')
    const portfolioContainer = document.createElement('div')
    const mainFrame = document.getElementById('main-frame')

    portfolioContainer.classList.add('portfolio-container')

    portfolioLink.addEventListener('click', function (event) {
        event.preventDefault() // Prevent the default behavior of the link (i.e., navigating to another page)

        mainFrame.innerHTML = 'Loading portfolio...'

        // Function to get the current portfolio and put it in the body of the html
        getCurrentPortfolio()
            .then(data => {
                mainFrame.innerHTML = ''
                portfolioContainer.innerHTML = JSON.stringify(data)
                mainFrame.appendChild(portfolioContainer)
            })
            .catch(error => {
                console.log(error)
            })
    })

}
