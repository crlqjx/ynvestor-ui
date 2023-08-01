import { getPortfolio } from "./get_portfolio.js"


export function addPortfolioEventListener() {
    const portfolioLink = document.querySelector('.portfolio-link')
    const mainFrame = document.getElementById('main-frame')
    const portfolioContainer = document.createElement('div')

    portfolioLink.addEventListener('click', function(event) {
        event.preventDefault() // Prevent the default behavior of the link (i.e., navigating to another page)

        mainFrame.innerHTML = ""

        portfolioContainer.id = 'portfolio-container'

        mainFrame.appendChild(portfolioContainer)

        getPortfolio()
            .then(function(portfolioData) {
                console.log(portfolioData)

                const columnDefs = Object.keys(portfolioData[0]).map(key => ({field: key}))
                const gridOptions = {
                    columnDefs: columnDefs,
                    rowData: portfolioData
                }

                new agGrid.Grid(portfolioContainer, gridOptions)

            })
    })

}
