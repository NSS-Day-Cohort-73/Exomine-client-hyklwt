import { governorDropdown } from './governors.js'
import { facilityDropdown } from './facilities.js'
//import { facilityMinerals } from './facilityMineral.js'
//import { spaceCart } from './spaceCart.js'


const container = document.querySelector("#container")

const render = async () => {
    const [
        GOVERNOR_PANEL_HTML,
        FACILITY_PANEL_HTML,
   //     FACILITY_MINERALS_HTML,
  //      SPACE_CART_HTML,
    ] = await Promise.all([
        governorDropdown(),
        facilityDropdown(),
   //     facilityMinerals(),
  //      spaceCart(),
    ])

    container.innerHTML = `
        <header>
            <h1>Solar System Mining Marketplace</h1>
        </header>
        <article id="governor-panel">
            <section class="governorsColony-panel">
            </section>
            ${GOVERNOR_PANEL_HTML}
        </article>
        <article id="facility-panel">
            ${FACILITY_PANEL_HTML}
        </article>
        <article id="cart-panel">
            <section id="facility-minerals">
  
            </section>
            <section id="space-cart">

            </section>
        </article>
    `
}

render()

//                 ${SPACE_CART_HTML}
//              ${FACILITY_MINERALS_HTML}