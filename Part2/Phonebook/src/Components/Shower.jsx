const Shower = ({ personsToShow, handleDelete }) => {
    return (
        <div>
        {
          personsToShow.map(person => {
            return (
              <div key={person.id}>
                <p>
                  {person.name} {person.number}
                </p>
                <button onClick={() => handleDelete(person.id)}>Delete</button>
              </div>
            )
          })
        }
      </div>
    )
}

export default Shower;