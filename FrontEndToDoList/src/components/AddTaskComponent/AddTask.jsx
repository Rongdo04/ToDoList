import React, { useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";
import tasksApi from "../../api/tasksApi";

const AddTask = ({ ListTasks, onTaskAdded }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [listTasks, setListTasks] = useState(ListTasks);
  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      const params = {
        taskName: taskName,
        Description: description,
        IsCompleted: false,
      };
      const response = await tasksApi.add(params);
      console.log("Task added successfully:", response.data);
      setTaskName("");
      setDescription("");
      onTaskAdded(response.data);
      // Nếu muốn làm điều gì đó khi công việc được thêm thành công, bạn có thể thêm mã ở đây.
    } catch (error) {
      alert("Error adding task", error);
      setTaskName("");
      setDescription("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-5">
      <div className="flex justify-center items-center w-screen p-5">
        <div className="flex justify-center items-center gap-5 bg-white p-5 px-20 rounded-md">
          <div className="flex flex-col gap-5 ">
            <div className="flex items-center gap-5">
              {" "}
              {/* Container cho Task Name */}
              <input
                className="border p-1 px-20"
                type="text"
                value={taskName}
                onChange={handleTaskNameChange}
                placeholder="Task Name"
              />
            </div>
            <div className="flex items-center gap-5">
              {" "}
              {/* Container cho Description */}
              <input
                className="border p-1 px-20"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Description"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <button
              className=" bg-red-200 p-1 text-white"
              onClick={handleAddTask}
            >
              Add{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
