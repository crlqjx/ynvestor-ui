

export async function getRiskMetrics() {
    const url = 'http://localhost:8000/risk-metrics'

    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error
        })
}
