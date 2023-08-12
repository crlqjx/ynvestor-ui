import { getScreenerResults } from './get_screener_results.js'

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

function handleConditionChange(conditionSelect) {
    let currentRow = conditionSelect.parentNode
    let criteriaValuesContainer = currentRow.querySelector('.criteria-values-container')
    criteriaValuesContainer.innerHTML = ''

    if (conditionSelect.value === 'between') {
        // create input box for min value and input box for max value
        const criteriaValueMin = createInputElement("number", "Min")
        criteriaValueMin.name = "criteria-value-min"
        criteriaValueMin.classList.add('criteria-value')
        criteriaValueMin.step = "0.01"
        const criteriaValueMax = createInputElement("number", "Max")
        criteriaValueMax.name = "criteria-value-max"
        criteriaValueMax.classList.add('criteria-value')
        criteriaValueMax.step = "0.01"

        criteriaValuesContainer.appendChild(criteriaValueMin)
        criteriaValuesContainer.appendChild(criteriaValueMax)

    }
}

function removeCriteria(criteriaButton) {
    let criteriaSection = criteriaButton.parentNode

    if (document.getElementById('criteria-container').childElementCount === 1) {
        alert('Must have at least one filtering criteria')
        return
    }

    criteriaSection.remove()
}

function getCriterias() {
    const criterias = document.querySelectorAll('.criteria')
    const period = document.querySelector('.period-select-element')
    let fieldsToFilter = []
    criterias.forEach((criteria) => {
        const criteriaName = criteria.querySelector('.criteria-type').value
        const criteriaValues = [
            parseFloat(criteria.querySelector('Input[name="criteria-value-min"]').value),
            parseFloat(criteria.querySelector('Input[name="criteria-value-max"]').value)
        ]
        fieldsToFilter.push({
            "field_name": criteriaName,
            "filter_range": criteriaValues
        })
    })

    return {
        "period": period.value,
        "fields_to_filter": fieldsToFilter
    }

}

export function loadScreenerPage(screenerContainer, resultContainer) {

    const mainFrame = document.querySelector('.main-frame')
    const periodContainer = document.createElement('div')
    const criteriasContainer = document.createElement('div')
    const criteriaRow = document.createElement('div')
    const resultGrid = document.createElement('div')
    periodContainer.id = 'period-container'
    criteriasContainer.id = 'criteria-container'
    criteriaRow.id = 'criteria-row'
    criteriaRow.classList.add('criteria')
    resultGrid.classList.add('ag-theme-alpine')

    mainFrame.innerHTML = ''

    // Period of statements (annual of interim)
    const periodSelectElement = createSelectElement([
        { "value": "annual", "label": "Annual" },
        { "value": "interim", "label": "Interim" }
    ], "--statements period--")
    periodSelectElement.classList.add('period-select-element')
    periodContainer.appendChild(periodSelectElement)


    // Criteria type (filter on price, volume, ...)
    const availableCriteria = [
        { "value": "eps", "label": "EPS" },
        { "value": "per", "label": "PER" },
        { "value": "roe", "label": "ROE" },
        { "value": "gearing", "label": "Gearing" },
        { "value": "operating_margin", "label": "Operating Margin" },
        // add more criteria here
    ]

    const criteriaSelectElement = createSelectElement(availableCriteria, "--criteria--")
    criteriaSelectElement.classList.add("criteria-type")

    // Condition (greater then, lower than, equals)
    const availableConditions = [
        { value: "between", label: "Between" }
    ]

    const conditionSelectElement = createSelectElement(availableConditions, "--condition--")
    const criteriaValuesContainer = document.createElement('div')
    criteriaValuesContainer.classList.add('criteria-values-container')
    conditionSelectElement.classList.add('condition-select-element')
    conditionSelectElement.onchange = function() {
        handleConditionChange(this)
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
        criteriaClone.querySelector('.criteria-values-container').innerHTML = ''
        criteriasContainer.appendChild(criteriaClone)
        // Set placeholder value to default for select option elements
        criteriaClone.querySelectorAll('select').forEach((selectOption) => {
            selectOption.querySelector('option').selected = true
        })
        // Reset behavior of criteria type selection on change
        criteriaClone.querySelector('.condition-select-element').onchange = function() {
            handleConditionChange(this)
        }
        // Reset behavior of remove button
        criteriaClone.querySelector('.remove-criteria-button').addEventListener('click', function() {
            removeCriteria(this)
        })
    }

    criteriaRow.appendChild(criteriaSelectElement)
    criteriaRow.appendChild(conditionSelectElement)
    criteriaRow.appendChild(criteriaValuesContainer)
    criteriaRow.appendChild(removeCriteriaButton)

    const screenerButton = document.createElement("button")
    screenerButton.type = "submit"
    screenerButton.textContent = "Start screening"
    screenerButton.addEventListener('click', async function() {
        const filters = getCriterias()

        // Clear past results
        resultGrid.innerHTML = ''

        // send request to API
        const results = await getScreenerResults(filters)

        // Format result with AgGrid
        const columnDefs = Object.keys(results[0]).map(key => ({field: key})) //TODO: reformat header name by using "headerName" key

        const screenerResultGridOptions = {
            columnDefs: columnDefs,
            rowData: results
        }

        mainFrame.appendChild(resultGrid)
        new agGrid.Grid(resultGrid, screenerResultGridOptions)

    })


    criteriasContainer.appendChild(criteriaRow)
    screenerContainer.appendChild(periodContainer)
    screenerContainer.appendChild(criteriasContainer)
    screenerContainer.appendChild(screenerButton)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add("button-container")
    buttonContainer.appendChild(addCriteriaButton)
    buttonContainer.appendChild(screenerButton)

    screenerContainer.appendChild(buttonContainer)

    mainFrame.appendChild(screenerContainer)

}
