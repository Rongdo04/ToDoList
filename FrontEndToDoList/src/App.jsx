import React, { useState } from "react";
import AddTask from "./components/AddTaskComponent/AddTask";
import { Input } from "postcss";
import DisplayTasks from "./components/DisplayComponent/DisplayTasks";
const App = () => {
  return (
    <div className="">
      <DisplayTasks />
    </div>
  );
};

export default App;
