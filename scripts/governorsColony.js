import { getTransientState } from "./TransientState.js"



export const DisplayGovernorColony = async () => {
    const colRes = await fetch("http://localhost:8088/colonies")
    const colonies = await colRes.json()
    const colMinRes = await fetch("http://localhost:8088/colonyMinerals?_expand=mineral")
    const colonyMinerals = await colMinRes.json()


    const state = getTransientState()

    if (state.selectedColony > 0) {
        const selectedColony = colonies.find((colony) => colony.id === state.selectedColony)
        const filteredColonyMinerals = colonyMinerals.filter((colMin) => colMin.colonyId === selectedColony.id && colMin.amount > 0)

        let html = `<h2>${selectedColony.name}</h2>`

        html += filteredColonyMinerals.map((colMin) => 
            `<div>
                ${colMin.amount} tons of ${colMin.mineral.name}
            </div>`
        ).join("")
        
        return html
    } else {
        return `<h2>Colony Minerals</h2>`
    }
}