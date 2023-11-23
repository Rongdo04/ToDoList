// DeleteTask.js
import React from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteTask = ({ taskName, onTaskDeleted }) => {
  const handleDeleteTask = async () => {
    if (
      confirm("Are you sure you want to delete this thing into the database?")
    ) {
      try {
        const params = new URLSearchParams();
        params.append("TaskName", taskName);

        // Gọi API để xóa công việc
        await axios.delete("https://localhost:7154/api/toDoList/Delete", {
          data: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        // Gọi hàm callback để cập nhật danh sách công việc trong AddTask
        onTaskDeleted(taskName);
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
