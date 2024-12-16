const Total = ({ courses }) => {
    const total = courses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0
    );
    return (
      <p><b>Number of exercises {total}.</b></p>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <h1>
        {name}
      </h1>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Content = ({ content }) => {
    return (
      <div>
        {content.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course => {
          return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content content={course.parts}/>
            <Total courses={course.parts} />
          </div>
          )
        })}
      </div>
    )
  }

  export default Course;