import { getTransientState, resetMineral, purchaseMineral } from "./TransientState.js"


export const spaceCart = async () => {
    const facMinResponse = await fetch("http://localhost:8088/facilityMinerals?_expand=facility&_expand=mineral")
    const facilityMinerals = await facMinResponse.json()

    document.addEventListener("click", handleButtonPress)

    const state = getTransientState()
    const selectedMineralId = state.selectedMineral
    const selectedFacilityId = state.selectedFacility

    const selectedFacMin = facilityMinerals.find((facMin) => 
        facMin.facilityId === selectedFacilityId && facMin.mineralId === selectedMineralId
    )

    if (selectedMineralId === 0) {

    
        let html = `<h2>Space Cart</h2>`

        html += `<button name="cart" disabled="true">Purchase Mineral</button>`

        return html
    } else {
        
        let html = `<h2>Space Cart</h2>`

        html += `<div>1 ton of ${selectedFacMin.mineral.name} from ${selectedFacMin.facility.name}</div>
            <button name="cart">Purchase Minerals</button>
        `
        
        return html
    }
}

const handleButtonPress = async (clickEvent) => {
    if(clickEvent.target.name === "cart") {

        await purchaseMineral()
        resetMineral()
    }
}