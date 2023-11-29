import React, { useState } from "react";
import AddTask from "./components/AddTaskComponent/AddTask";
import { Input } from "postcss";
import DisplayTasks from "./components/DisplayComponent/DisplayTasks";
import LoginForm from "./pages/LoginPage/LoginPage";
const App = () => {
  return (
    <div className="">
      <LoginForm />
      {/* <DisplayTasks /> */}
    </div>
  );
};

export default App;
