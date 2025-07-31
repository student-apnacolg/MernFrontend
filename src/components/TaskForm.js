import React, { useState } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'

const TaskForm = () => {

  const {dispatch} = useTasksContext()
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [error,setError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    const task = {title, description}

    try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const json = await response.json();
    if(!response.ok){
      setError(json.error || 'Submission Failed')
    } else {
        setError(null);
        setTitle('')
        setDescription('')
        console.log('New Task Added', json)}
        dispatch({type: 'CREATE_TASK', payload: json})
  } catch (err) {
      console.error('Network or Unexpected Error', err)
      setError('Could not submit task. Please try again.')
  }
}


  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Task Title:</label>
      <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)}/>

      <label>Task Description:</label>
      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
      
      <button>Add Task</button>

      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default TaskForm