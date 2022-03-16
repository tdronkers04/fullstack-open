const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part}: {props.count}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.arr[0].name} count={props.arr[0].exercises} />
      <Part part={props.arr[1].name} count={props.arr[1].exercises} />
      <Part part={props.arr[2].name} count={props.arr[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  
  return (
    <p>Number of exercises: {props.arr.reduce((acc, cv) => acc + cv.exercises, 0)}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development!',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  };
  
  return (
    <div>
      <Header course={course.name}/>
      <Content arr={course.parts}/>
      <Total arr={course.parts}/>
    </div>
  )
}

export default App;