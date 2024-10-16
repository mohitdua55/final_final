import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>
        {task.id}: {task.title}
      </h3>
      <p>Priority: {task.priority}</p>
    </div>
  );
};

export default TaskCard;
