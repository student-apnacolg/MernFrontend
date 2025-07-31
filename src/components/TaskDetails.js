import React from 'react'

const TaskDetails = ({task, onDelete, onToggle}) => {
  return (
    <div className='task-details'>
      <h3>{task.title}</h3>
      <p><strong>Description of Task: {task.description}</strong></p>
      <p>
        <strong>Status:</strong>{' '}
        {task.completed ? 'Completed' : 'Not Done'}
      </p>
      <p>
        <em>Created at: {new Date(task.createdAt).toLocaleString()}</em>
      </p>
      <button onClick={() => onToggle(task)}>
        {task.completed ? 'Mark Uncompleted' : 'Mark Completed'}
      </button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  )
}

export default TaskDetails