import { getOptimizerData } from "./get_optimizer_data"


export async function loadOptimizerPage() {
    const optimizerParams = { "risk_free_rate": 0.04 }
    const mainFrame = document.querySelector('.main-frame')
    const optimizerChartContainer = document.createElement('div')
    const optimizedWeightsContainer = document.createElement('div')

    // Get optimizer data
    const optimizerData = await getOptimizerData(optimizerParams)
    const efficientFrontierData = optimizerData['efficient_frontier_data']
    const scatterPoints = [
        {
            'weights': optimizerData['global_mean_variance_weights'],
            'x': optimizerData['global_mean_variance_volatility'],
            'y': optimizerData['global_mean_variance_expected_return'],
            'name': 'Global Mean Variance Portfolio',
            'color': 'green',
            'marker': { 'radius': 5 }
        },
        {
            'weights': optimizerData['portfolio_asset_weights'],
            'x': optimizerData['portfolio_annualized_volatility'],
            'y': optimizerData['portfolio_expected_return'],
            'name': 'Current Portfolio',
            'color': 'red',
            'marker': { 'radius': 5 }
        },
        {
            'weights': optimizerData['optimized_weights'],
            'x': optimizerData['optimized_volatility'],
            'y': optimizerData['optimized_expected_return'],
            'name': 'Portfolio Optimized',
            'color': 'green',
            'marker': { 'radius': 5 }
        }
    ]

    // Get optimizer chart params
    const chartParams = {
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function() {
                            // behavior when clicking on scatter point
                            console.log(this.weights)
                        }
                    }
                }
            }
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'Efficient Frontier'
        },
        series: [{
            type: 'line',
            name: 'Efficient Frontier',
            data: efficientFrontierData
        },
        {
            type: 'scatter',
            opacity: 0.5,
            tooltype:
            {
                headerFormat: '{point.key}<br>'
            },
            marker:
            {
                symbol: 'circle'
            },
            data: scatterPoints
        }]
    }

    // Plot chart
    Highcharts.chart(optimizerChartContainer, chartParams)

    mainFrame.appendChild(optimizerChartContainer)
}

