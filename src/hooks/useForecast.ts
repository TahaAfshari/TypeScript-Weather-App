import { useState, useEffect, ChangeEvent } from "react"

import { optionType, forecastType } from "../types"


const useForecast = () => {
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const [term, setTerm] = useState<string>('')
const [city, setCity] = useState<optionType | null>(null)
const [options, setOptions] = useState<[]>([])
const [forecast, setForecast] = useState<forecastType | null>(null)

//everything after q= are query params
//the 5 in the url represents the limit of responses returned
const getSearchOptions = (value: string) => {
fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
    process.env.REACT_APP_API_KEY
  }`
)
.then((res) => res.json())
.then((data) => setOptions(data))
}

//trim() removes spaces from the ends of a word, so it is neccessary for two letter search params
const onInputChange = (e: 
  ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim()
  setTerm(value)
  
  if (value === "") return

  getSearchOptions(value)
}

const getForecast = (city: optionType) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&exclude={part}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  )
  .then((res) => res.json())
  .then((data)=> {
    const forecastData = {
        ...data.city,
        list: data.list.slice(0, 16)
    }
    setForecast(forecastData)
})
}

const onSubmit = () => {
  if (!city) return 

  getForecast(city)
}


//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const onOptionSelect = (option: optionType) => {
  setCity(option)
}

//this useEffect gets rid of other options after a city.name has been selected
useEffect(() => {
if (city) {
  setTerm(city.name)
  setOptions([])
}
}, [city])


return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
}
}

export default useForecast;