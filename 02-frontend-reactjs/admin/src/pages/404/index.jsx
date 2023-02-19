import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
  return (
    <div style={{ padding: "50px" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => {
            navigate("/home");
          }}>Back Home</Button>}
      />
    </div>
  );
}

export default NotFoundPage;
