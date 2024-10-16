
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
=======
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
>>>>>>> b1c19640df77ec046fe8cdfaa1b73bf2d2929e16
