

export async function getValueAtRiskChartData(valueAtRiskParams) {
    const url = 'http://localhost:8000/value-at-risk-chart-data'
    const requestParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(valueAtRiskParams)
    }

    return fetch(url, requestParams)
        .then(response => response.json())
}
