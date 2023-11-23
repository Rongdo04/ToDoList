import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateStatus = ({ taskId, onTaskUpdated, initialChecked }) => {
  const [isChecked, setChecked] = useState(initialChecked);
  const handleCheckboxChange = async () => {
    try {
      // Gọi API UpdateStatus sử dụng phương thức PUT và dữ liệu x-www-form-urlencoded
      const response = await axios.put(
        "https://localhost:7154/api/toDoList/update-status",
        new URLSearchParams({
          TasksID: taskId,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Cập nhật trạng thái checkbox dựa trên phản hồi từ API
      setChecked(response.data);
      // Gọi callback function để thông báo về component cha (ShowList) về sự thay đổi trạng thái
      if (onTaskUpdated) {
        onTaskUpdated(taskId, response.data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <label>
      <input
        className="mr-3 border-red-200"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </label>
  );
};

export default UpdateStatus;
