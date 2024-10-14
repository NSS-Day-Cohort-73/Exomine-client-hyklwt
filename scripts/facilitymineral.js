

export const facilityMinerals = async (facilityId) => {
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility")
    const data = await response.json()

    //filter through the api data for the facility that was clicked on
    const selectedFacility = data.filter(entry => entry.facilityId === facilityId)
   
    // create variable for the first facility name in the new array
    const facilityName = selectedFacility[0].facility.name

    // create html variable with the html made from the data in the new array
    const mineralOptionsHTML = selectedFacility.map(entry => `
        <label>
            <input type="radio" name="mineral_${facilityId}" value="${entry.amount}"/>
            ${entry.mineral.name} (${entry.amount} tons)
        </label>
        
        `).join('')

        return document.querySelector("#facility-minerals").innerHTML=`
        <div>
            <h3>${facilityName} Available Minerals</h3>
            ${mineralOptionsHTML}
        </div>
        `
}

