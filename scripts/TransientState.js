const transientState = {
    "selectedColony": 0,
    "selectedGovernor": 0,
    "selectedFacility": 0,
    "selectedMineral": 0,
}

export const getTransientState = () => {
    return transientState
}

export const setGovernorColony = (governorId, colonyId) => {
    transientState.selectedGovernor = governorId
    transientState.selectedColony = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacility = (facilityId) => {
    transientState.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineral = (mineralId) => {
    transientState.selectedMineral = mineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const resetMineral = () => {
    transientState.selectedMineral = 0
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const purchaseMineral = async () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */
    const colMinResponse = await fetch("http://localhost:8088/colonyMinerals")
    const colonyMinerals = await colMinResponse.json()

    const facMinRespose = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMinerals = await facMinRespose.json()
    
    const selectedColonyId = transientState.selectedColony
    const selectedMineralId = transientState.selectedMineral
    const selectedFacilityId = transientState.selectedFacility
    
    const selectedColMin = colonyMinerals.find(colMin => colMin.colonyId === selectedColonyId && colMin.mineralId === selectedMineralId)

    const selectedFacMin = facilityMinerals.find(facMin => facMin.facilityId === selectedFacilityId && facMin.mineralId === selectedMineralId)
    selectedFacMin.amount--

    // if governor's colony already owns some, make a PUT
    if (selectedColMin) {

        selectedColMin.amount++

        fetch(`http://localhost:8088/colonyMinerals/${selectedColMin.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(selectedColMin)
        })

        fetch(`http://localhost:8088/facilityMinerals/${selectedFacMin.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(selectedFacMin)
        })

    // if they don't, make a POST

    } else {
        const newColonyMineral = {
            "colonyId": selectedColonyId,
            "mineralId": selectedMineralId,
            "amount": 1,
        }

        fetch(`http://localhost:8088/colonyMinerals`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(newColonyMineral)
        })

        fetch(`http://localhost:8088/facilityMinerals/${selectedFacMin.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(selectedFacMin)
        })

    }
}
