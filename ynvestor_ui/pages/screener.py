import streamlit as st
import requests
import os
from main import backend_url


st.markdown("# Screener")

import streamlit as st


def param_slider(lower_bound: float, upper_bound: float, default_lower_bound, default_upper_bound):
    return st.slider('between', lower_bound, upper_bound, (default_lower_bound, default_upper_bound))


with st.form("my_form"):    

    period = st.select_slider('Period', ['Annual', 'Interim'])

    has_per = st.checkbox("Price Earnings Ratio")
    per_slider = param_slider(0, 100, 0, 15)

    has_eps = st.checkbox("Earnings Per Share")
    eps_slider = param_slider(0, 1000, 0, 100)

    has_roe = st.checkbox("Return On Equity")
    roe_slider = param_slider(0., 2., 0., 2.)

    has_operating_margin = st.checkbox("Operating Margin")
    operating_margin_slider = param_slider(0.0, 1.0, 0.0, 1.0)
    
    has_gearing = st.checkbox("Gearing")
    gearing_slider = st.slider("Gearing between", -5.0, 5.0, (0.0, 1.0))
    
    # Every form must have a submit button
    submitted = st.form_submit_button("Submit")
    fields_filters = []

    if submitted:
        if has_per:
            fields_filters.append({'field_name': 'per', 'filter_range': list(per_slider)})

        if has_eps:
            fields_filters.append({'field_name': 'eps', 'filter_range': list(eps_slider)})

        if has_roe:
            fields_filters.append({'field_name': 'roe', 'filter_range': list(roe_slider)})

        if has_operating_margin:
            fields_filters.append({'field_name': 'operating_margin', 'filter_range': list(operating_margin_slider)})

        if has_gearing:
            fields_filters.append({'field_name': 'gearing', 'filter_range': list(gearing_slider)})

        screening_params = {
                'period': period,
                'fields_to_filter': fields_filters
                }
        st.write(screening_params)
        
        url = f'{backend_url}stock-screener'
        res = requests.post(url, json=screening_params)

