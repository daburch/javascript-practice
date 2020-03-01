window.addEventListener("load", () => {
    const url = "https://api.darksky.net/forecast"

    const apikey = ''

    console.log(apikey)

    // this proxy is required for calling the darksky api from local host
    const proxy = "https://cors-anywhere.herokuapp.com"

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.longitude
            let long = position.coords.latitude
    
            const api = `${proxy}/${url}/${apikey}/${lat},${long}`
    
            fetch(api)
                .then(resp => { return resp.json() })
                .then(data => { updateDocument(data) })
        })
    }

    document.querySelector('.degrees-span').addEventListener('click', () => {
        swapDegreesType()
    })
})

function updateDocument(data) {
    const { temperature, summary, icon } = data.currently
    const timezone = data.timezone

    const locationTimezone = document.querySelector('.location-timezone')
    const locationIcon = document.getElementById("location-icon")
    const temperatureDegrees = document.querySelector('.temperature-degrees')
    const temperatureDescription = document.querySelector('.temperature-description')

    const skycons = new Skycons({"color": "honeydew"});
    const skycon = icon.replace(/-/g, "_").toUpperCase()

    skycons.add(locationIcon, Skycons[`${skycon}`])
    skycons.play()
 
    locationTimezone.textContent = timezone
    temperatureDegrees.textContent = temperature.toFixed(2)
    temperatureDescription.textContent = summary
}

function swapDegreesType() {
    const temperatureDegrees = document.querySelector('.temperature-degrees')
    const temperatureType = document.querySelector('.temperature-type')

    if (temperatureType.textContent === "F") {
        temperatureType.textContent = "C"
        temperatureDegrees.textContent = ((parseFloat(temperatureDegrees.textContent) - 32) * (5 / 9)).toFixed(2)
    } else {
        temperatureType.textContent = "F"
        temperatureDegrees.textContent = (parseFloat(temperatureDegrees.textContent) * (9/5) + 32).toFixed(2)
    }
}