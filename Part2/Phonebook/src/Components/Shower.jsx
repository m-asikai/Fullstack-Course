const Shower = ({ personsToShow }) => {
    return (
        <div>
        {
          personsToShow.map(person => {
            return (
              <p key={person.id}>
                {person.name} {person.number}
              </p>
            )
          })
        }
      </div>
    )
}

export default Shower;