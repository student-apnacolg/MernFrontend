import { useContext } from "react";
import { TasksContext } from "../context/TaskContext";

export const useTasksContext = () => {
  const context = useContext(TasksContext)

  if (!context) {
    throw Error('UseTasksContext must be used inside a TasksContextProvider')
  }
  return context
}