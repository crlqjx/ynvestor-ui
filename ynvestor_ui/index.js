import { addPortfolioEventListener } from './js/portfolio/portfolio_event_listener.js'
import { addScreenerEventListener } from './js/screener/screener_event_listener.js'
import { addRiskEventListener } from './js/risk/risk_event_listener.js'
import { addOptimizerEventListener } from './js/optimizer/optimizer_event_listener.js'


// Add event listeners after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    addPortfolioEventListener();
    addScreenerEventListener();
    addRiskEventListener();
    addOptimizerEventListener();

});

