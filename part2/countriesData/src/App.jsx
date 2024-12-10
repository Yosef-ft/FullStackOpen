import { useState, useEffect } from "react";
import axios from "axios";

import Filter from './components/Filter'
import Content from "./components/Content";

const App = () =>{
    const [allCountries, setAllCountries] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() =>{
        axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response =>{
          setAllCountries(response.data)
        })
        .catch(error => {
            console.log('Error', error)
        })
    }, [])


    const handleChange = (event) => {
        const value = event.target.value
        setSearchValue(value)

        if (value){
            const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
            setCountries(filteredCountries)
        }else{
            setCountries([])
        }
    }

    return(
        <div>
            <Filter searchValue={searchValue} handleChange={handleChange} />
            <Content countries={countries} setCountries={setCountries} />            
        </div>

    )
}


export default App;