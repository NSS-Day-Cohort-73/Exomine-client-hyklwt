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

export const purchaseMineral = () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */



//     document.dispatchEvent(new CustomEvent("stateChanged"))
}
