export function getPortfolioChart() {
    const url = "http://192.168.1.55:8000/portfolio-chart-data"

    fetch(url)
        .then(response => response.json())
        .then(chartData => {
            let params = {
                chart: { zoomType: 'x' },
                rangeSelector: { selected: 5 },
                navigator: { enabled: false },
                scrollbar: { enabled: false },
                title: { text: "Portfolio Performance" },
                series: chartData,
                yAxis: { offset: 30 }
            }
            Highcharts.stockChart("portfolio-chart", params)
        })

}
