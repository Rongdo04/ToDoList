import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateStatus from "./UpdateStatus";
import DeleteTask from "./DeleteTask";
import UpdateName from "./UpdateName";

const ShowList = ({ onAddTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7154/api/toDoList/Show"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [onAddTask]);

  // const handleTaskUpdatedName = (taskId, name) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.tasksID === taskId ? { ...task, name } : task
  //     )
  //   );
  // };

  const handleTaskDeleted = (deletedTaskName) => {
    // Cập nhật danh sách công việc ngay sau khi xóa công việc
    setTasks(tasks.filter((task) => task.taskName !== deletedTaskName));
  };

  const handleTaskUpdated = (taskId, isCompleted) => {
    // Cập nhật trạng thái trong danh sách nhiệm vụ
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.tasksID === taskId ? { ...task, isCompleted } : task
      )
    );
  };

  return (
    <div className="bg-white w-screen flex flex-col justify-center items-center py-5 w-[700px] rounded-md bg-gray-50">
      <ul>
        {tasks.map((task) => (
          <li key={task.tasksID}>
            <strong className="border flex p-3 w-[579px] text-gray-500">
              <UpdateStatus
                initialChecked={task.isCompleted}
                taskId={task.tasksID}
                onTaskUpdated={handleTaskUpdated}
              />
              <UpdateName
                taskId={task.tasksID}
                // onTaskNameUpdated={handleTaskUpdatedName}
                taskName={task.taskName}
              />
              <div className="ml-auto flex gap-5 items-center">
                <DeleteTask
                  taskName={task.taskName}
                  onTaskDeleted={handleTaskDeleted}
                />
              </div>
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
