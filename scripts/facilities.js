import { getTransientState, setFacility } from './TransientState.js'


export const facilityDropdown = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const data = await response.json()

    document.addEventListener("change", handleFacilityChoice)

    const state = getTransientState()
    
    if (state.selectedColony > 0) {   
        const activeFacilities = data.filter((item) => item.active === true)

        return `
            <div>
                <select name="facility">
                    <option value="0">Please Choose a facility</option>
                        ${activeFacilities.map(facility =>
                            `<option value="${facility.id}">${facility.name}</option>`
                        ).join('')}
                </select>
            </div>
        `
    } else {
        return `
            <div>
                <select disabled="disabled" name="facility">
                    <option value="0">Please Choose a facility</option>
                </select>
            </div>
        `
    }
}

//needs setFacilityId... I put these in my transState module in the last project
export const handleFacilityChoice = (changeEvent) => {
    if (changeEvent.target.name === "facility") {
        const convertedToInteger = parseInt(changeEvent.target.value)
        setFacility(convertedToInteger)
    }
}
