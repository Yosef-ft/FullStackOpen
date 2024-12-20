const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return(
        <form onSubmit={addPerson}>
          <div>
            <div>
              name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
              number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
          </div>
          <div>
            <button type="submit" >
              add
            </button>
          </div>
        </form>
    )
  }



export default PersonForm;