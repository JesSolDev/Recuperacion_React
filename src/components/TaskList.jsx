import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../contexts/taskContext';


const TaskList = ({ task }) => {
  const {removeTask} = useTaskContext()
  return (
    
        <div 
          key={task.id} 
          className="task-item"
          style={{
            backgroundColor: task.checked ? '#4CAF50' : '#FFA500',
            padding: '15px',
            margin: '10px 0',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <div>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </div>
          <div className="task-actions">
            <Link 
              to={`/${task.id}`}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                textDecoration: 'none',
                marginRight: '10px'
              }}
            >
              Editar
            </Link>
            <button
              onClick={() => removeTask(task.id)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
  );
};

export default TaskList;
