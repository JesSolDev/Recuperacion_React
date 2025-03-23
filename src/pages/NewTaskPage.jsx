import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../contexts/taskContext';
import ErrorComponent from '../components/ErrorComponent';

const NewTaskPage = () => {
  const { createTask, error, setError } = useTaskContext();
  const [task, setTask] = useState({ name: '', description: '', checked: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await createTask(task);
    setLoading(false);
  };

  return (
    <div>
      <h2>Crear Nueva Tarea</h2>
      <Link to="/">Volver a inicio</Link>
      <br></br>
      <br></br>
      {error && <ErrorComponent error={error} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="checked"
              checked={task.checked}
              onChange={handleChange}
            />
            Completada
          </label>
        </div>
        <button type="submit" disabled={loading}>Crear Tarea</button>
      </form>
    </div>
  );
};

export default NewTaskPage;
