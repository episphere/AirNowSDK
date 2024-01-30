
export let airnow = {
    apikey: localStorage.AIRNOW_API_KEY ,

    base:"https://www.airnowapi.org/aq/observation/",

    currentObservationByLatLong: async function(latitude,longitude,distance=25){
        let url = `${this.base}/latLong/current/?format=application/json&latitude=${latitude}&longitude=${longitude}&distance=${distance}&API_KEY=${this.apikey}`
        return await this.callGetAPI(url)
    },
    currentObservationByZipCode: async function(zipCode,distance=25){
        let url = `${this.base}zipCode/current/?format=application/json&zipCode=${zipCode}&distance=${distance}&API_KEY=${this.apikey}`
        return await this.callGetAPI(url)
    },
    historicObservationByLatLong: async function(latitude,longitude,date,distance=25){
        const dateRegex=/^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(date)) throw new Error("Please format the date as YYYY-MM-DD")
        let url = `${this.base}latLong/historical/?format=application/json&latitude=${latitude}&longitude=${longitude}&date=${date}T00-0000&distance=${distance}&API_KEY=${this.apikey}`
        return await this.callGetAPI(url)
    },
    historicObservationByZipCode: async function(zipCode,date,distance=25){
        const dateRegex=/^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(date)) throw new Error("Please format the date as YYYY-MM-DD")
        let url = `${this.base}zipCode/historical/?format=application/json&zipCode=${zipCode}&date=${date}T00-0000&distance=${distance}&API_KEY=${this.apikey}`
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