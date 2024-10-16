import { getTransientState, setGovernorColony } from "./TransientState.js"


export const governorDropdown = async () => {
    const res = await fetch("http://localhost:8088/governors")
    const governors = await res.json()

    document.addEventListener("change", handleGovernorChange)

    const state = getTransientState()

    const activeGovernors = governors.filter((item) => item.active === true)

    let html = '<select name="governor"><option value="0">Choose a governor...</option>'
    const governorStringArray = activeGovernors.map(
        (item) => {

            //displaying the governor dropdown with all information attatched

            return `
            <option ${
                state.selectedGovernor===item.id ? "selected" : ""
            }
            value="${item.id}" 
            data-colonyid="${item.colonyId}"
            active="${item.active}"
            >${item.name}</option>
            `

        }
    )

    html += governorStringArray.join("")
    html += '</select>'

    return html
}

const handleGovernorChange = (changeEvent) => {
    if (changeEvent.target.name === "governor") {
        const selectedOption = changeEvent.target.options[changeEvent.target.selectedIndex]
        const theGovernorId = parseInt(selectedOption.value)
        const theColonyId = parseInt(selectedOption.dataset.colonyid)
        setGovernorColony(theGovernorId, theColonyId)
    }
}