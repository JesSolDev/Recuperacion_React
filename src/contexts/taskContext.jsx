import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const API_URL = "http://localhost:3001/tasks";
    const [error,setError] = useState("")
    const [loading,setLoading] = useState("true")

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error fetching tasks');
      } 
      const data = await response.json();
      setTasks(data);
    } catch (error) {
        setError(error)
      console.error('Error fetching tasks:', error);
    } finally{
        setLoading("false")
    }
  };

  const createTask = async (newTask) => {
    try {
      const taskExists = tasks.some(t => t.name.toLowerCase() === newTask.name.toLowerCase());
            if (taskExists) {
                setError('Ya hay una tarea con ese nombre creada');
                return;
            }
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      setError(error)  
      console.error('Error creating task:', error);
    }finally{
        setLoading("false")
    }
  };

  const removeTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
        setError(error)
      console.error('Error removing task:', error);
    } finally{
        setLoading("false")
    }
  };
  const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        const data = await response.json();
        setTasks(tasks.map(t => t.id === taskId ? data : t));
    } catch (error) {
        setError(error.message);
        console.error('Error updating task:', error);
    } finally {
        setLoading(false);
    }
  };

  const changeTaskStatus = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = { ...task, checked: !task.checked };
      
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      
      const data = await response.json();
      setTasks(tasks.map(t => t.id === taskId ? data : t));
    } catch (error) {
        setError(error)
      console.error('Error updating task status:', error);
    } finally{
        setLoading("false")
    }
  };

  const value = {
    tasks,
    getTasks,
    createTask,
    removeTask,
    changeTaskStatus,
    error,
    setError,
    loading,
    updateTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
const API_URL = '/db.json';

