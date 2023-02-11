import React from "react";
import { Input } from "antd";
const { Search } = Input;

const onSearch = (value) => console.log(value);

const SearchBar = () => {
  return (
    <>
      <Search
        placeholder="Search..."
        maxLength={500}
        allowClear
        onSearch={onSearch}
        style={{
          width: 350,
        }}
        size="large"
      />
    </>
  );
};

export default SearchBar;
