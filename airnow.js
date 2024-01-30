
export let airnow = {
    apikey: localStorage.AIRNOW_API_KEY ,

    currentBase:"https://www.airnowapi.org/aq/observation/zipCode/current/",

    currentObservationByLatLong: async function(lattitude,longitude){
        let url = `${this.currentBase}?format=application/json&latitude=${lattitude}&longitude=${longitude}`
        return await this.callGetAPI(url)
    },
    currentObservationByZipCode: async function(zipCode,distance=25){
        let url = `${this.currentBase}?format=application/json&zipCode=${zipCode}&distance=${distance}&API_KEY=${this.apikey}`
        return await this.callGetAPI(url)
    },
    callGetAPI: async function(url){
        if (!this.apikey) throw new Error("API_KEY not set, please use apikey=<your-api-key>")
        console.log(url)
        let results = await fetch(url)
        console.log(`have results... ok? ${results.ok} status code: ${results.status}`)
        if (results.ok){
            return await results.json()
        }
        console.error(results)
        throw new Error(`API Failed: ${results}`)
    }
}

window.airnow = airnow