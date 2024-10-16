import { governorDropdown } from './governors.js'
import { DisplayGovernorColony } from './governorsColony.js'
import { facilityDropdown } from './facilities.js'
import { facilityMinerals } from './facilitymineral.js'
import { spaceCart } from './spaceCart.js'


const container = document.querySelector("#container")

const render = async () => {
    const [
        GOVERNOR_DROPDOWN_HTML,
        COLONY_MINERALS_HTML,
        FACILITY_PANEL_HTML,
        FACILITY_MINERALS_HTML,
        SPACE_CART_HTML,
    ] = await Promise.all([
        governorDropdown(),
        DisplayGovernorColony(),
        facilityDropdown(),
        facilityMinerals(),
        spaceCart(),
    ])

    container.innerHTML = `
        <header>
            <h1>Solar System Mining Marketplace</h1>
        </header>
        <article id="governor-panel">
            <section class="governor-select">
                ${GOVERNOR_DROPDOWN_HTML}
            </section>
            <section class="governorsColony-panel">
                ${COLONY_MINERALS_HTML}
            </section>
        </article>
        <article id="facility-panel">
                ${FACILITY_PANEL_HTML}
        </article>
        <article id="cart-panel">
            <section id="facility-minerals">
                ${FACILITY_MINERALS_HTML}
            </section>
            <section id="space-cart">
                ${SPACE_CART_HTML}
            </section>
        </article>
    `
}

render()

document.addEventListener("stateChanged", event => {
    console.log("State of Data has changed. Regenerating HTML...")
    render()
})