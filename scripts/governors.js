import { setColonyId } from "./TransientState.js"


export const governorDropdown = async () => {
    const res = await fetch("http://localhost:8088/governors")
    const governors = await res.json()

    document.addEventListener("change", handleGovernorChange)

    let html = '<select name="governor"><option value="0">Choose a governor...</option>'
    const governorStringArray = governors.map(
        (item) => {

        //displaying the governor dropdown with all information attatched

            return `
            <option 
            value="${item.colonyId}" 
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
        const theColonyId = parseInt(changeEvent.target.value)
        setColonyId(theColonyId)
    }
}