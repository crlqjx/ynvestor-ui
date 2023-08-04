

export async function getPortfolioGrid() {

    const url = "http://192.168.1.55:8000/stocks-portfolio"

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            throw error
        })
}
