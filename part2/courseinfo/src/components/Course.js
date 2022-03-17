import React from 'react'

const Header = ({ name }) => <h1>{name}</h1>
const Part = ({ part, count}) => <p>{part}: {count}</p>
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part.name} count={part.exercises} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, cv) => acc + cv.exercises, 0);
  return <strong>Number of exercises: {totalExercises}</strong>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    
  )
}

export default Course