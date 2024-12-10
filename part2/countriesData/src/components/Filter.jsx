const Filter = ({searchValue, handleChange}) => {
    return(
        <div>
            find countries: <input value={searchValue} onChange={handleChange}/>
        </div>
    )
} 

export default Filter;