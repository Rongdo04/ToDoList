import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import tasksApi from "../../api/tasksApi";

const UpdateName = ({ tasksID, taskName }) => {
  const [name, setName] = useState(taskName);
  const [nameOri, setNameOri] = useState(taskName);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const swapToInput = () => {
    setIsEditing(true);
  };
  const handleNameChange = async () => {
    try {
      // const response = await axios.put(
      //   "https://localhost:7154/api/toDoList/Edit",
      //   {
      //     TasksID: taskId,
      //     TaskName: name,
      //   }
      // );
      const params = {
        TasksID: tasksID,
        TaskName: name,
      };
      const response = await tasksApi.updateName(params);
      console.log(response.data);
      setIsEditing(false);
      setName((prev) => {
        return prev;
      });
    } catch (error) {
      alert("Error updating status:", error.response);
    }
  };
  return (
    <>
      <div className="flex items-center">
        {isEditing ? (
          // Nếu đang ở chế độ sửa, hiển thị thẻ input
          <>
            <input
              className="mr-2"
              type="text"
              placeholder="Enter text here"
              ref={inputRef}
              style={{ width: inputRef.current?.scrollWidth || "auto" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <SaveOutlined onClick={handleNameChange} className="text-red-200" />
          </>
        ) : (
          // Nếu không, hiển thị biểu tượng EditOutlined
          <div>
            {name}
            <EditOutlined
              onClick={swapToInput}
              className="text-red-200 cursor-pointer ml-2"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateName;
