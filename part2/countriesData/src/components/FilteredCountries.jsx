const FilteredCountries = ({countries, setCountries}) => {
    return(
        countries.map(countryData => <div key={countryData.name.common}>
                                  {countryData.name.common} <button onClick={() => setCountries([countryData])}>show</button>
                                </div>
                    )
    )
  }


export default FilteredCountries;