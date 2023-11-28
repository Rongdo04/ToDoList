import React, { useEffect, useState } from "react";
import axios from "axios";
import tasksApi from "../../api/tasksApi";

const UpdateStatus = ({ tasksID, onTaskUpdated, initialChecked }) => {
  const [isChecked, setChecked] = useState(initialChecked);
  const handleCheckboxChange = async () => {
    try {
      const response = await tasksApi.updateStatus(tasksID);
      setChecked(response.data);
      onTaskUpdated(isChecked);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <label>
      <input
        className="mr-3 border-red-200"
        type="checkbox"
        checked={initialChecked}
        onChange={handleCheckboxChange}
      />
    </label>
  );
};

export default UpdateStatus;
