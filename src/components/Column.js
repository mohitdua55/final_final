import React from "react";

// Import the icons (adjust paths according to your project structure)
import noPriorityIcon from "../icons_req/icons_FEtask/No-priority.svg"; // Adjust the path according to your project structure
import lowPriorityIcon from "../icons_req/icons_FEtask/Img - Low Priority.svg"; // Adjust the path according to your project structure
import mediumPriorityIcon from "../icons_req/icons_FEtask/Img - Medium Priority.svg"; // Adjust the path according to your project structure
import highPriorityIcon from "../icons_req/icons_FEtask/Img - High Priority.svg"; // Adjust the path according to your project structure

import plusIcon from "E:/ReactJS/react-project/src/icons_req/icons_FEtask/add.svg";
import menuIcon from "E:/ReactJS/react-project/src/icons_req/icons_FEtask/3 dot menu.svg";

const Column = ({ title, tasks, onAddTask, onOpenMenu }) => {
  // Helper function to get the correct icon based on priority
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 1:
        return lowPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 3:
        return highPriorityIcon;
      case 4:
        return highPriorityIcon; // Assuming highPriorityIcon for priority 4 as well
      default:
        return noPriorityIcon; // Default or unknown priority
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>

        {/* Add task button */}
        <div className="column-actions">
          <button className="icon-button" onClick={onAddTask}>
            <img src={plusIcon} alt="Add Task" />
          </button>

          {/* Menu button */}
          <button className="icon-button" onClick={onOpenMenu}>
            <img src={menuIcon} alt="Open Menu" />
          </button>
        </div>
      </div>

      <ul>
        {tasks.length === 0 ? ( // Check if there are tasks
          <li>No tasks available</li> // Display a message if no tasks
        ) : (
          tasks.map((task) => (
            <li key={task.ticketId} className={`priority-${task.priority}`}>
              <div className="task-header">
                <h4>{task.ticketId}</h4> {/* Display Task ID */}
                {/* Avatar with initials */}
                <div className="avatar">{task.userInitials}</div>
                {/* Move avatar here */}
              </div>

              <p>{task.title}</p>

              {/* Priority Icon */}
              <div className="priority-icon">
                <img
                  src={getPriorityIcon(task.priority)}
                  alt={`Priority ${task.priority}`}
                />
              </div>
              <div className="tag">
                {task.tag} {/* Display the tag */}
              </div>

              {/* Removed the priority text line */}
              {/* <p>Priority: {task.priority}</p> */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Column;
