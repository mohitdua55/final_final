import React, { useState, useEffect } from "react";
import Column from "./Column";
import TaskModal from "./TaskModal"; // Import the modal component
import axios from "axios";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]); // To store tasks fetched from the API
  const [users, setUsers] = useState([]); // To store user data fetched from the API
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  // States for grouping and ordering
  const [groupBy, setGroupBy] = useState("status"); // Default grouping by status
  const [orderBy, setOrderBy] = useState("priority"); // Default ordering by priority
  const [showOptions, setShowOptions] = useState(false); // To show/hide the Display options
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [currentColumn, setCurrentColumn] = useState(""); // Track the current column for the new task
  // Function to handle adding a task (You can define actual logic later)
  const onAddTask = (columnName) => {
    setCurrentColumn(columnName); // Set the current column for the new task
    setIsModalOpen(true); // Open the modal
    const newTask = {
      id: `new-${Date.now()}`, // Unique ID for the new task
      title: "New Task", // Default title for the new task
      priority: 1, // Default priority (or any value you prefer)
      userId: null, // Default user ID (null or any specific user)
      status: columnName, // Assign the task to the specific column (status)
      tag: "new", // A default tag (optional)
    };
    console.log(`Add task to ${columnName}`);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // Add your logic here for adding a new task to the specific column
  };

  // Function to handle opening the menu
  const onOpenMenu = (columnName) => {
    console.log(`Open menu for ${columnName}`);
    // Add your logic here for opening the menu in the specific column
  };

  // Fetch tasks and users from API when the component mounts
  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );

        // Destructure data
        const { tickets, users } = response.data;

        // Set tasks and users state
        setTasks(tickets);
        setUsers(users);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch tasks and users");
        setLoading(false);
      }
    };

    fetchTasksAndUsers();
  }, []);

  // Function to save the new task
  const handleSaveTask = (newTask) => {
    const updatedTask = { ...newTask, status: currentColumn }; // Ensure the status is set
    setTasks((prevTasks) => [...prevTasks, updatedTask]); // Add the new task to the tasks array
    setIsModalOpen(false); // Close the modal after saving
  };

  // Helper function to get user name by ID (this will no longer be needed)
  // const getUserName = (userId) => {
  //   const user = users.find((u) => u.id === userId);
  //   return user ? user.name : "Unknown User";
  // };

  // Helper function to generate user initials
  const getUserInitials = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const initials = user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
      return initials;
    }
    return "NA"; // Default to 'NA' if the user isn't found
  };

  // Sorting tasks based on the selected ordering (priority or title)
  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      if (orderBy === "priority") {
        return a.priority - b.priority; // Sort by priority (low to high)
      } else if (orderBy === "title") {
        return a.title.localeCompare(b.title); // Sort by title alphabetically
      }
      return 0;
    });
  };

  // Grouping tasks based on the selected grouping option
  const groupTasks = (tasks) => {
    const grouped = {};
    tasks.forEach((task) => {
      const groupKey = task[groupBy]; // Grouping by the selected property
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(task);
    });
    return grouped;
  };

  // Loading state
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Handle Display button click
  const handleDisplayClick = () => {
    setShowOptions(!showOptions); // Toggle dropdown visibility
  };

  // Get grouped and sorted tasks
  const groupedTasks = groupTasks(sortTasks(tasks));

  const doneTasks = [];
  return (
    <div>
      {/* Display button */}
      <button onClick={handleDisplayClick}>Display</button>

      {/* Display options */}
      {showOptions && (
        <div style={{ marginTop: "10px" }}>
          <div>
            <label htmlFor="grouping">Group By: </label>
            <select
              id="grouping"
              onChange={(e) => setGroupBy(e.target.value)}
              value={groupBy}
            >
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label htmlFor="ordering">Order By: </label>
            <select
              id="ordering"
              onChange={(e) => setOrderBy(e.target.value)}
              value={orderBy}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}

      {/* Task Board columns based on grouping */}
      <div className="task-board">
        {Object.keys(groupedTasks).map((group) => (
          <Column
            key={group}
            title={group} // Group name as column title (status, user, priority)
            tasks={groupedTasks[group].map((task) => ({
              ...task,
              ticketId: task.id, // Use ticket 'id' instead of userName
              userInitials: getUserInitials(task.userId), // Attach initials for avatar
              userName:
                users.find((user) => user.id === task.userId)?.name ||
                "Unknown User", // Add this line
            }))}
            onAddTask={() => onAddTask(group)} // Pass handler for adding task
            onOpenMenu={() => onOpenMenu(group)} // Pass handler for opening menu
          />
        ))}

        {groupBy === "status" && (
          <Column
            key="done"
            title="Done"
            tasks={doneTasks} // Empty task array for "Done" column
          />
        )}
      </div>
      {/* Modal for adding new task */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(newTask) => {
          handleSaveTask({ ...newTask, status: currentColumn });
          setIsModalOpen(false); // Close the modal after saving
        }}
      />
    </div>
  );
};

export default TaskBoard;
