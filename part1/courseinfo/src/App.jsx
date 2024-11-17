function Header({course}) {
  return(
    <h1>{course}</h1>
  );
}

function Part({part, exercise}){
  return(
    <p>
      {part} {exercise}
    </p>    
  );
}

function Content({parts, exercises}){
  return(
    <div>
      <Part part={parts.part1} exercise={exercises.exercises1} />
      <Part part={parts.part2} exercise={exercises.exercises2} />
      <Part part={parts.part3} exercise={exercises.exercises3} />
    </div>
  );
}


function Total({exercises}){
  return(
    <p>Number of exercises {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>
  );
}


const App = () => {
  const course = 'Half Stack application development'

  const parts = {
    'part1' : 'Fundamentals of React',
    'part2' : 'Using props to pass data',
    'part3' : 'State of a component'
  }

  const exercises = {
    'exercises1' : 10,
    'exercises2' : 7,
    'exercises3' : 14,
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
      
    </div>
  )
}

export default App