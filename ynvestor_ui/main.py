import streamlit as st
import requests


backend_url = "http://192.168.1.55:8000/"
st.title('Portfolio')


def get_portfolio():
    endpoint = 'stocks-portfolio'
    url = f"{backend_url}{endpoint}"
    result = requests.get(url)
    return st.table(result.json())


get_portfolio()

