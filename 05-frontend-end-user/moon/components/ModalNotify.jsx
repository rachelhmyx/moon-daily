// import { useContext, useEffect } from "react";
// import { DataContext } from "../store/GlobalState";

// export default function ModalNotify() {
//   const { state, dispatch } = useContext(DataContext);
//   const { notify } = state;

//   let isShow = typeof notify.error === "undefined" ? "fade" : "show";

//   useEffect(() => {
//     if (isShow === "show") {
//       setTimeout(() => {
//         dispatch({ type: "NOTIFY", payload: {} });
//         console.log("after", isShow);
//       }, 2500);
//     }
//   }, [isShow]);

//   return (
//     <>
//       <div
//         className={`modal fade ${isShow}`}
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//         style={{
//           display: isShow === "show" ? "block" : "none",
//           // marginTop: "50px",
//           // marginLeft: "1270px",
//         }}
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <i
//                 className="fa-solid fa-circle-check"
//                 style={{
//                   color: "green",
//                   paddingRight: "10px",
//                   fontSize: "30px",
//                 }}
//               ></i>
//               <h1
//                 className="modal-title fs-5"
//                 id="exampleModalLabel"
//                 style={{ color: "red", fontSize: "23px !important" }}
//               >
//                 {notify.error}
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Toast from "./Toast";

export default function ModalNotify() {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  return (
    <>
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}
      {notify.success && <Toast />}
    </>
  );
}
