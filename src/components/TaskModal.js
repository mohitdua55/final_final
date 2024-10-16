import React, { useState } from "react";

const TaskModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [userId, setUserId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: `new-${Date.now()}`,
      title,
      priority: parseInt(priority, 10),
      userId: userId || null,
      status: "", // This should be set to the current column status in TaskBoard
      tag: "new",
    };
    onSave(newTask); // Call onSave with the new task
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Priority:</label>
            <input
              type="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label>User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
