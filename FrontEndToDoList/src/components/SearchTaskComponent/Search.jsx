import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
const Search = ({ setSearch, search }) => {
  const [input, setInput] = useState("");
  const ClickSearch = () => {
    setSearch(input);
    setInput("");
  };
  console.log(input);
  return (
    <form
    
      onSubmit={(e) => {
        e.preventDefault();
        ClickSearch();
      }}
      className="flex justify-center items-center gap-5 mb-3"
    >
      <input
        className="p-2"
        placeholder="Search Task Name"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <SearchOutlined onClick={ClickSearch} className="cursor-pointer" />
    </form>
  );
};

export default Search;
