import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { deleteItem } from "../store/Actions";

export default function Modal() {
  const { state, dispatch } = useContext(DataContext);
  const { modal } = state;

  //-----Tạo sự kiện khi bấm chuột vào để xóa sản phẩm------------
  const handleSubmit = () => {
    dispatch(deleteItem(modal.data, modal.id, modal.type));
    dispatch({ type: "ADD_MODAL", payload: {} });
  };
  //------End-------------------------------------------------------

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "green" }}
              >
                Do you want to delete this item?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
