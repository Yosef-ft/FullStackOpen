import FilteredCountries from './FilteredCountries'
import CountryDetail from './CountryDetail';

const Content = ({countries, setCountries}) => {
    if (countries.length ===0) return(
        <p>Please type a valid string in the text box to see result</p>
    )

    if (countries.length > 10) return(
        <p>Too many matches, spacifiy another filter</p>
    )
    else if (countries.length >= 2 || countries.length == 0) return(
        <FilteredCountries countries={countries} setCountries={setCountries} />
    )
    else return(
        <CountryDetail country={countries[0]} setCountries={setCountries} />
    )
}


export default Content;