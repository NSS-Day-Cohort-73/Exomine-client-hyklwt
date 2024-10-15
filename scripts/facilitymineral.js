import { getTransientState } from "./TransientState.js"

export const facilityMinerals = async () => {
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility")
    const data = await response.json()

    //getting the current transient state
    const state = getTransientState()


    if (state.selectedFacility > 0) {
        const selectedFacility = data.find(entry => entry.facilityId === state.selectedFacility)
        const facilityName = selectedFacility.facility.name
        const facilityMinerals = data.filter(entry => entry.facilityId === state.selectedFacility)
    
        // create html variable with the html made from the data in the new array
        const mineralOptionsHTML = facilityMinerals.map(entry => `
            <label>
                <input type="radio" name="mineral_${entry.id}" value="${entry.amount}"/>
                ${entry.mineral.name} (${entry.amount} tons)
            </label>
            
            `).join('')
    
            return `

                <h3>${facilityName} Available Minerals</h3>
                ${mineralOptionsHTML}
            </div>
            `
    } else {
        return `<h3>Available Minerals</h3>`
    }
}

