import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/taskContext';
import { Link } from 'react-router-dom';

const EditTaskPage = () => {
  const { tasks, changeTaskStatus, updateTask } = useTaskContext();
  const { _id } = useParams();
  const navigate = useNavigate();
  
  const task = tasks.find(t => t._id === _id);
  const [updatedTask, setUpdatedTask] = useState(task || { name: '', description: '', checked: false });

  useEffect(() => {
    if (!task) {
      navigate('/'); // Redirigir si la tarea no existe
    }
  }, [task, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedTask({
      ...updatedTask,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(_id, updatedTask);
    navigate('/');
  };

  const handleStatusChange = async () => {
    await changeTaskStatus(_id);
  };

  return (
    <div>
      <h2>Editar Tarea</h2>
      <Link to="/"> Volver a inicio</Link>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={updatedTask.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
      <button onClick={handleStatusChange}>Cambiar Estado</button>
    </div>
  );
};

export default EditTaskPage;