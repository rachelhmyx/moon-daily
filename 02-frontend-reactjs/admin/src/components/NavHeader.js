import React from "react";
import { Input } from "antd";
const { Search } = Input;

function NavHeader() {
  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        onSearch={() => {}}
      />
    </div>
  );
}

export default NavHeader;
