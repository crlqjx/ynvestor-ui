import streamlit as st


st.markdown("# Screener")

import streamlit as st


def param_slider(lower_bound: float, upper_bound: float, default_lower_bound, default_upper_bound):
    return st.slider('between', lower_bound, upper_bound, (default_lower_bound, default_upper_bound))


with st.form("my_form"):    

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
    if submitted:
        if has_per:
            st.write('PER range:', per_slider)

        if has_eps:
            st.write('EPS range:', eps_slider)

        if has_roe:
            st.write('ROE range:', roe_slider)

        if has_operating_margin:
            st.write('Operating margin range:', operating_margin_slider)

        if has_gearing:
            st.write('Gearing range:', gearing_slider)


