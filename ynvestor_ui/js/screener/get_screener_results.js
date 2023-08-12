export async function getScreenerResults(filters) {
    const url = "http://192.168.1.55:8000/stock-screener"

    const requestParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(filters)
    }

    return fetch(url, requestParams)
        .then(response => response.json())
        .then(screenerResults => {
            return screenerResults
        })
        .catch(error => {
            throw error
        })

}
