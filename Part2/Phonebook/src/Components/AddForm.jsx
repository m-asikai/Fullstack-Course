const AddForm = ({ handleAdd, handleNewName, handleNewNumber}) => {
    return (
        <form onSubmit={handleAdd}>
        <div>
          Name: <input onChange={handleNewName} />
        </div>
        <div>
          Number: <input onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default AddForm;