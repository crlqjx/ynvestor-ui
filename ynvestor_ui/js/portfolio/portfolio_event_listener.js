import { getPortfolioGrid } from "./get_portfolio_grid.js"
import { getPortfolioChart } from "./get_portfolio_chart.js"


export function addPortfolioEventListener() {
    const portfolioLink = document.querySelector('.portfolio-link')
    const mainFrame = document.querySelector('.main-frame')
    const portfolioChart = document.createElement('div')
    const portfolioGrid = document.createElement('div')

    portfolioLink.addEventListener('click', function(event) {
        event.preventDefault() // Prevent the default behavior of the link (i.e., navigating to another page)

        mainFrame.innerHTML = ""
        portfolioGrid.innerHTML = ""
        portfolioChart.innerHTML = ""

        portfolioChart.id = 'portfolio-chart'
        getPortfolioChart()
        mainFrame.appendChild(portfolioChart)

        portfolioGrid.id = 'portfolio-grid'
        portfolioGrid.classList = "ag-theme-alpine"


        getPortfolioGrid()
            .then(function(portfolioData) {

                const columnDefs = Object.keys(portfolioData[0]).map(key => ({field: key}))
                const gridOptions = {
                    columnDefs: columnDefs,
                    rowData: portfolioData
                }

                mainFrame.appendChild(portfolioGrid)
                new agGrid.Grid(portfolioGrid, gridOptions)

            })
    })

}

