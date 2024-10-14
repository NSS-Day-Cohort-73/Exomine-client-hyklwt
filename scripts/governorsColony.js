


export const DisplayGovernorColony = async (govId) => {
    const govRes = await fetch("http://localhost:8088/governors")
    const governors = await govRes.json()
    const colRes = await fetch("http://localhost:8088/colonies")
    const colonies = await colRes.json()


    governors.map(
        (item) => {
            if (item.id === govId) {
                const govColId = item.colonyId
                colonies.map(
                    (item) => {
                        if (item.id === govColId) {
                            return document.querySelector('.governorsColony-panel').innerHTML = `
                            <div>
                                <h2>${item.name} Minerals<h2>
                            </div>
                            `
                        }
                    }
                )
            }
        }
    )

}