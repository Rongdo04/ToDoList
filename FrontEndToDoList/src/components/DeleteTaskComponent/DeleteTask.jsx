// DeleteTask.js
import React from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import tasksApi from "../../api/tasksApi";

const DeleteTask = ({ tasksID, onDelete }) => {
  const [taskDelete, setTaskDelete] = React.useState(0);
  const [ID, setID] = React.useState(0);
  const handleDeleteTask = async () => {
    if (
      confirm("Are you sure you want to delete this thing into the database?")
    ) {
      try {
        // const response = await axios.delete(
        //   `https://localhost:7154/api/toDoList/Delete?tasksID=${tasksID}`
        // );
        const response = await tasksApi.delete(tasksID);
        console.log("Task deleted successfully:", response.data);
        onDelete(tasksID);
        setTaskDelete(response.data);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    } else {
      console.log("Thing was not deleted to the database.");
    }
  };

  return (
    <div>
      <DeleteOutlined
        className="ml-auto cursor-pointer text-red-200"
        onClick={handleDeleteTask}
      />
    </div>
  );
};

export default DeleteTask;
