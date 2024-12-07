import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
    const parts = course.parts.map(part => part.exercises)
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={total} />
    </div>    
    )
  
  }


export default Course;