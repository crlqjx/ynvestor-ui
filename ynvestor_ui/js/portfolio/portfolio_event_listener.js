import { getPortfolioGridData } from "./get_portfolio_grid_data.js"
import { getPortfolioChartData } from "./get_portfolio_chart_data.js"


export function addPortfolioEventListener() {
    const portfolioURL = "/portfolio"
    const portfolioLink = document.querySelector('.portfolio-link')
    const mainFrame = document.querySelector('.main-frame')
    const portfolioChart = document.createElement('div')
    const portfolioGrid = document.createElement('div')


    function loadPortfolioPage() {


        mainFrame.innerHTML = ""
        portfolioGrid.innerHTML = ""
        portfolioChart.innerHTML = ""

        portfolioChart.id = 'portfolio-chart'
        getPortfolioChartData()
            .then(function(portfolioChartData) {
                Highcharts.stockChart(portfolioChart, portfolioChartData)
                mainFrame.appendChild(portfolioChart)
            })

        portfolioGrid.id = 'portfolio-grid'
        portfolioGrid.classList = "ag-theme-alpine"


        getPortfolioGridData()
            .then(function(portfolioGridData) {

                const columnDefs = Object.keys(portfolioGridData[0]).map(key => ({ field: key }))
                const gridOptions = {
                    columnDefs: columnDefs,
                    rowData: portfolioGridData
                }

                mainFrame.appendChild(portfolioGrid)
                new agGrid.Grid(portfolioGrid, gridOptions)

            })
    }

    function handleNavigation() {
        const currentPath = window.location.pathname
        if (currentPath === portfolioURL) {
            loadPortfolioPage()
        }
    }

    // To deal with next/previous page buttons behaviors
    window.addEventListener('popstate', handleNavigation)

    // To reload the page when refreshing the page
    document.addEventListener('DOMContentLoaded', handleNavigation)
 

    portfolioLink.addEventListener('click', function(event) {
        // Prevent the default behavior of the link (i.e., navigating to another page)
        event.preventDefault()         
        // Push portfolio URL to the browser's history without reloading the page
        history.pushState(null, null, portfolioURL)
        handleNavigation()
    })

    // Load the page if we are on the right URL
    handleNavigation()

}

