import React, { useState } from "react";
import axios from "axios";
import ShowList from "./ShowList";
import DeleteTask from "./DeleteTask";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7154/api/toDoList/Add",
        {
          taskName: taskName,
          Description: description,
          IsCompleted: false,
        }
      );

      console.log("Task added successfully:", response.data);
      // Cập nhật danh sách công việc ngay sau khi thêm công việc mới
      setTasks([...tasks, response.data]);
      // Sau khi thêm công việc, bạn có thể xóa trạng thái hiện tại hoặc làm bất kỳ điều gì khác.
      setTaskName("");
      setDescription("");

      // Nếu muốn làm điều gì đó khi công việc được thêm thành công, bạn có thể thêm mã ở đây.
    } catch (error) {
      alert("Error adding task", error);

      setTaskName("");
      setDescription("");
    }
  };
  console.log(taskName);

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

      <ShowList onAddTask={tasks} />
    </div>
  );
};

export default AddTask;
