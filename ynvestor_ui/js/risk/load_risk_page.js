import { getRiskMetrics } from "./get_risk_metrics"
import { getValueAtRiskChartData } from "./get_value_at_risk_chart_data"


async function getRiskMetricsGridOptions(annualizedVolatility, sharpeRatio, valueAtRisk) {
    const rowData = [
        { metric: 'Annualized Volatility', value: annualizedVolatility},
        { metric: 'Sharpe Ratio', value: sharpeRatio },
        { metric: 'Value At Risk', value: valueAtRisk }
    ]

    const columnDefs = [
        { field: 'metric', headerName: ''},
        { field: 'value', headerName: '' },
    ]

    const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
    }

    return gridOptions
}


export async function loadRiskPage() {
    const mainFrame = document.querySelector('.main-frame')
    const valueAtRiskChartContainer = document.createElement('div')
    const riskMetricsContainer = document.createElement('div')
    riskMetricsContainer.classList.add('ag-theme-alpine')
    const correlationMatrixContainer = document.createElement('div')
    correlationMatrixContainer.classList.add('ag-theme-alpine')

    mainFrame.innerHTML = ''

    // Get risk metrics data
    const riskMetrics = await getRiskMetrics()
    const riskMetricsGridOptions = await getRiskMetricsGridOptions(
        riskMetrics['annualized_volatility'],
        riskMetrics['sharpe_ratio'],
        riskMetrics['value_at_risk']
    )

    // new agGrid.Grid(riskMetricsContainer, riskMetricsGridOptions)
    riskMetricsContainer.innerHTML = riskMetrics['risk_metrics_html_table']
    

    // Get value at risk chart data and plot chart
    const valueAtRiskChartData = await getValueAtRiskChartData({
        "simulated_losses": riskMetrics['simulated_losses'],
        "values_at_risk": riskMetrics['values_at_risk'],
        "value_at_risk": riskMetrics['value_at_risk']
    })

    const params = {
        chart: { zoomType: 'x' },
        title: { text: 'Value At Risk 95%' },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0,
                groupPadding: 0,
                shadow: false,
                colorByPoint: false
            }
        },
        xAxis: {
            categories: valueAtRiskChartData['categories'],
            plotBands: {
                from: valueAtRiskChartData['var_position'],
                to: valueAtRiskChartData['end_position'],
                color: '#ff9999',
                label: {
                    text: `VaR 95%: ${riskMetrics["value_at_risk"]} EUR`,
                    align: 'left',
                    x: 30,
                    y: 50,
                    style: {
                        fontSize: 12,
                        fontWeight: 'bold'
                    }
                }
            }
        },
        yAxis: [{
            labels: {
                align: 'left'
            },
            resize: {
                enabled: true
            }
        }
        ],
        series: [
            {
                type: 'column',
                data: valueAtRiskChartData['data'],
                color: '#99c2ff'
            }
        ]
    }

    Highcharts.chart(valueAtRiskChartContainer, params)

    // Get correlation matrix data
    correlationMatrixContainer.innerHTML = riskMetrics['correlation_matrix_html_table']

    mainFrame.append(valueAtRiskChartContainer, riskMetricsContainer, correlationMatrixContainer)


}
