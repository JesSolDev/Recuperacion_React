import React from "react";
import TaskList from "../components/TaskList";
import { useTaskContext } from "../contexts/taskContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { tasks, error, loading } = useTaskContext();

  if (error) return <div>Error</div>;

  return (
    <div>
      <h1>Tareas</h1>
      <Link to="/new">Crear Tarea</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <h3>(Verde:completas 
           Amarillo:incompletas)</h3>
        {tasks?.map((task) => (  
          <TaskList key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;