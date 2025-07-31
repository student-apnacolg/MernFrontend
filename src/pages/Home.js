import React, { useEffect} from 'react'
import TaskDetails from '../components/TaskDetails.js'
import TaskForm from '../components/TaskForm.js'
import { useTasksContext } from '../hooks/useTasksContext.js'

const Home = () => {

  // useState
  // const [tasks, setTasks] = useState(null)

  const {tasks, dispatch} = useTasksContext()

  useEffect(()=> {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks')
      const json = await response.json()

      if (response.ok) {
        // useState
        // setTasks(json)
        dispatch({type: 'SET_TASKS', payload: json})
      }
    }
    fetchTasks()
  }, [dispatch])

  const handleDelete = async (id) => {
  const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  if (response.ok) {
    dispatch({ type: 'DELETE_TASK', payload: { _id: id } });
  }
};

const handleToggleComplete = async (task) => {
  const response = await fetch(`/api/tasks/${task._id}`, {
    method: 'PATCH',
  });
  const json = await response.json();
  if (response.ok) {
    dispatch({ type: 'UPDATE_TASK', payload: json });
  }
};

  return (
    <div className='home'>
      <div className='tasks'>
        {
          tasks && tasks.map((task)=> (
            <TaskDetails
              key={task._id} 
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggleComplete} />
          ))
        }
      </div>
      <div>
        <TaskForm />
      </div>
    </div>
  )
}

export default Home