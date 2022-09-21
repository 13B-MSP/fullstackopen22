const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}  
  </>

const Course = ( { course }) =>
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.map(part => part.exercises).reduce((prev, cur) => prev + cur)}
        />
    </>

export default Course