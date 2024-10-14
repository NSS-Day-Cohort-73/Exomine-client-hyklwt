import { setFacilityId } from './TransientState.js'

export const facilityDropdown = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const data = await response.json()

    document.addEventListener("change", handleFacilityChoice)

    return `
        <div>
            <select id="facility">
                <option value="0">Please Choose a facility</option>
                    ${data.map(facility =>
                        `<option value="${facility.id}">${facility.name}</option>`
                    ).join('')}
            </select>
        </div>
    `
}

//needs setFacilityId... I put these in my transState module in the last project
export const handleFacilityChoice = (changeEvent) => {
    if (changeEvent.target.id === "facility") {
        const convertedToInteger = (parseInt(changeEvent.target.value))
        setFacilityId(convertedToInteger)
    }
}
