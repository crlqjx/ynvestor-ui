

def get_portfolio():
    endpoint = 'stocks-portfolio'
    url = f"{backend_url}{endpoint}"
    result = requests.get(url)
    return st.table(result.json())


get_portfolio()
