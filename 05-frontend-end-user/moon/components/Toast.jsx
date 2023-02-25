import React from "react";

export default function Toast({ msg, handleShow, bgColor }) {
  return (
    <>
      <div
        className={`toast show position-fixed text-light ${bgColor}`}
        role="alert"
        autohide="true"
        data-bs-delay="2000"
        style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "280px" }}
      >
        <div
          className={`toast-header text-light d-flex justify-content-between ${bgColor}`}
          style={{
            fontSize: "20px",
            borderBottom: "1px solid rgb(233 221 221)",
          }}
        >
          <strong
            className="mr-auto text-light"
            style={{ textTransform: "uppercase" }}
          >
            {msg.title}
          </strong>
          <button
            type="button"
            className="btn-close ml-2 mb-1 text-light"
            data-bs-dismiss="toast"
            aria-label="Close"
            style={{ outline: "none" }}
            onClick={handleShow}
          ></button>
        </div>
        <div
          className="toast-body"
          style={{ fontSize: "18px", color: "#f3ee39" }}
        >
          {msg.msg}
        </div>
      </div>
    </>
  );
}
