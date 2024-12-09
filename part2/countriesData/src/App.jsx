import { useState, useEffect } from "react";
import axios from 'axios'

const App = () =>{
  const [allContries, setAllCountries] = useState(null)
  const [search, setSearch] = useState('')
  const [detail, setDetail] = useState(null);

  useEffect(()=>{
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response =>{
        setAllCountries(response.data)
        


      })
  }, [])


  const showView  = (country) =>{
    const oneCountry = allContries.filter(countryData => countryData.name.common == country)
    const languages = Object.values(oneCountry[0].languages) 
    console.log(oneCountry)
    const detailContent = <div>
                <h2><strong>{country}</strong></h2> 
                <p>capital {oneCountry[0].capital}</p>
                <p>area {oneCountry[0].area}</p>
                <p><strong>languages:</strong></p>
                <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={oneCountry[0].flags.png} />
              </div>
  setDetail(detailContent)              
  }

  let message = ''

  if (allContries){
    const countriesName = allContries.map(country => country.name.common)
    const filtered = countriesName.filter(name => name.toLowerCase().includes(search.toLowerCase()))
    console.log(filtered)

    
    if (filtered.length > 10) {
      message = 'Too many matches, spacifiy another filter'
    }
    else if (filtered.length === 1){
      console.log('filteren length', filtered.length)
      const oneCountry = allContries.filter(country => country.name.common == filtered[0])
      const languages = Object.values(oneCountry[0].languages) 
      console.log(oneCountry)
      message = <div>
                  <h2><strong>{filtered[0]}</strong></h2> 
                  <p>capital {oneCountry[0].capital}</p>
                  <p>area {oneCountry[0].area}</p>
                  <p><strong>languages:</strong></p>
                  <ul>
                  {languages.map(lang => <li key={lang}>{lang}</li>)}
                  </ul>
                  <img src={oneCountry[0].flags.png} />
                </div>
    }
    else{
      message = filtered.map(country => <div>
                                          {country} <button onClick={() =>showView(country)}>show</button>
                                          
                                        </div>
                            );
    }
  }

  const handleChange = (event) =>{

    setSearch(event.target.value)
    setDetail(null)
  }


  if (search === '') {
    message = ''
  }

  return(
    <div>
      <label>Find Countires</label>
      <input onChange={handleChange} /><br />
      {message}
      {detail}
    </div>
  )

}


export default App;