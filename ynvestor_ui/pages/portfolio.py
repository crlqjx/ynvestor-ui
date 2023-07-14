from ynvestor_ui import backend_url
import requests 
import streamlit as st


def get_portfolio():
    endpoint = 'stocks-portfolio'
    url = f"{backend_url}{endpoint}"
    result = requests.get(url)
    return st.table(result.json())

st.markdown("# Portfolio")
get_portfolio()
