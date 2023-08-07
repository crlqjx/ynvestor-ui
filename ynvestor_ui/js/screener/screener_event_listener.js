
export function addScreenerEventListener() {
    const screenerURL = "/screener"
    const screenerLink = document.querySelector('.screener-link')
    const screenerContainer = document.createElement('div')
    const mainFrame = document.querySelector('.main-frame')

    const path = window.location.pathname
    screenerContainer.classList.add('screener-container')

    // function loadScreenerPage() {

    //     history.pushState(null, null, screenerURL)


    //     mainFrame.innerHTML = ''

    //     screenerContainer.innerHTML = 'SCREENER PART'
    //     mainFrame.appendChild(screenerContainer)

    // }



    function loadScreenerPage() {
        const criteriaContainer = document.createElement('div')
        criteriaContainer.id = 'criteria-container'
        criteriaContainer.classList.add('criteria')

        history.pushState(null, null, screenerURL)
        mainFrame.innerHTML = ''

        function createSelectElement(options) {
            const selectElement = document.createElement('select')
            options.forEach((option) => {
                const optionElement = document.createElement("option")
                optionElement.value = option.value
                optionElement.text = option.label
                selectElement.appendChild(optionElement)
            })
            return selectElement
        }

        function createInputElement(type, placeholder) {
            const input = document.createElement("input")
            input.type = type
            input.placeholder = placeholder

            return input
        }
        
        // Criteria type (filter on price, volume, ...)
        const availableCriteria = [
            { "value": "price", "label": "Price" },
            { "value": "volume", "label": "Volume" }
            // add more criteria here
        ]

        const criteriaSelectElement = createSelectElement(availableCriteria)

        // Condition (greater then, lower than, equals)
        const availableConditions = [
            { value: "greater", label: "Greater than" },
            { value: "less", label: "Less than" },
            { value: "equal", label: "Equals" }
        ]
        const conditionSelectElement = createSelectElement(availableConditions)
        conditionSelectElement.onchange = function () {
            console.log('If "equals", only one input box')
        }

        const numericalFilterValueInput = createInputElement("number", "Value")
        numericalFilterValueInput.step = "0.01"

        const removeCriteriaButton = document.createElement("button")
        removeCriteriaButton.type = "button"
        removeCriteriaButton.textContent = "Remove"
        removeCriteriaButton.onclick = function () {
            console.log('Removing Criteria')
        }


        criteriaContainer.appendChild(criteriaSelectElement)
        criteriaContainer.appendChild(conditionSelectElement)
        criteriaContainer.appendChild(numericalFilterValueInput)
        criteriaContainer.appendChild(removeCriteriaButton)
        
        mainFrame.appendChild(criteriaContainer)

    }


    function handleNavigation() {
        if (path === screenerURL) {
            loadScreenerPage()
        }
    }

    window.addEventListener("popstate", handleNavigation)

    document.addEventListener('DOMContentLoaded', handleNavigation)

    screenerLink.addEventListener('click', function(event) {
        event.preventDefault()

        loadScreenerPage(mainFrame)

    })
}
