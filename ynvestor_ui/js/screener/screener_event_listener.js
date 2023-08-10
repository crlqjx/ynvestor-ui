
export function addScreenerEventListener() {
    const screenerURL = "/screener"
    const screenerLink = document.querySelector('.screener-link')
    const screenerContainer = document.createElement('div')
    const mainFrame = document.querySelector('.main-frame')

    window.location.pathname
    screenerContainer.classList.add('screener-container')

    function loadScreenerPage() {
        const criteriasContainer = document.createElement('div')
        const criteriaRow = document.createElement('div')
        criteriasContainer.id = 'criteria-container'
        criteriaRow.id = 'criteria-row'
        criteriaRow.classList.add('criteria')

        mainFrame.innerHTML = ''

        function createSelectElement(options, placeholder) {
            const selectElement = document.createElement('select')
            const placeholderOptionElement = document.createElement('option')
            placeholderOptionElement.value = ""
            placeholderOptionElement.textContent = placeholder
            placeholderOptionElement.disabled = true
            placeholderOptionElement.selected = true
            selectElement.appendChild(placeholderOptionElement)
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

        const criteriaSelectElement = createSelectElement(availableCriteria, "criteria")

        // Condition (greater then, lower than, equals)
        const availableConditions = [
            { value: "greater", label: "Greater than" },
            { value: "less", label: "Less than" },
            { value: "equal", label: "Equals" }
        ]
        const conditionSelectElement = createSelectElement(availableConditions, "condition")
        conditionSelectElement.onchange = function() {
            console.log('If "equals", only one input box')
        }

        const numericalFilterValueInput = createInputElement("number", "Value")
        numericalFilterValueInput.step = "0.01"

        function removeCriteria(criteriaButton) {
            let criteriaSection = criteriaButton.parentNode

            if (document.getElementById('criteria-container').childElementCount === 1) {
                alert('Must have at least one filtering criteria')
                return
            }

            criteriaSection.remove()
        }

        const removeCriteriaButton = document.createElement("button")
        removeCriteriaButton.type = "button"
        removeCriteriaButton.textContent = "Remove"
        removeCriteriaButton.classList.add('remove-criteria-button')
        removeCriteriaButton.addEventListener('click', function() {
            removeCriteria(this)
        })

        const addCriteriaButton = document.createElement('button')
        addCriteriaButton.type = 'button'
        addCriteriaButton.textContent = "Add"
        addCriteriaButton.onclick = function() {
            let criteriaClone = document.querySelector(".criteria").cloneNode(true)
            criteriasContainer.appendChild(criteriaClone)
            // Set placeholder value to default for select option elements
            criteriaClone.querySelectorAll('select').forEach((selectOption) => {
                selectOption.querySelector('option').selected = true
            })
            // Reset behavior of remove button
            criteriaClone.querySelector('.remove-criteria-button').addEventListener('click', function() {
                removeCriteria(this)
            })
        }

        criteriaRow.appendChild(criteriaSelectElement)
        criteriaRow.appendChild(conditionSelectElement)
        criteriaRow.appendChild(numericalFilterValueInput)
        criteriaRow.appendChild(removeCriteriaButton)

        const screenerButton = document.createElement("button")
        screenerButton.type = "submit"
        screenerButton.textContent = "Start screening"

        criteriasContainer.appendChild(criteriaRow)
        screenerContainer.appendChild(criteriasContainer)
        screenerContainer.appendChild(screenerButton)

        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add("button-container")
        buttonContainer.appendChild(addCriteriaButton)
        buttonContainer.appendChild(screenerButton)

        screenerContainer.appendChild(buttonContainer)

        mainFrame.appendChild(screenerContainer)

    }


    function handleNavigation() {

        if (window.location.pathname === screenerURL) {
            loadScreenerPage()
        }
    }

    window.addEventListener("popstate", handleNavigation)

    document.addEventListener('DOMContentLoaded', handleNavigation)

    screenerLink.addEventListener('click', function(event) {
        event.preventDefault()
        history.pushState(null, null, screenerURL)
        handleNavigation()
    })
    handleNavigation()
}
