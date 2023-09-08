

export async function getOptimizerData(optimizerParams) {
    const url = 'http://localhost:8000/optimized-portfolio'
    const requestParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(optimizerParams)
    }

    return fetch(url, requestParams)
        .then(response => response.json())
        .catch(error => {
            throw error
        })
}
