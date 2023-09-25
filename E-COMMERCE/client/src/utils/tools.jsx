import swal from "sweetalert";
import { setMessageEmpty } from "../features/product/productSlice";
import { createToast } from "../helpers/toast";

/**
 * Message Toaster
 * @param {*} dispatch
 * @param {*} error
 * @param {*} message
 */
export const messageToaster = (dispatch, error, message) => {
  if (error) {
    createToast(error);
    dispatch(setMessageEmpty());
  }
  if (message) {
    createToast(message, "success");
    dispatch(setMessageEmpty());
  }
};

/**
 * Filter by id Data
 * @param {*} data
 * @param {*} idEdit
 * @param {*} setInput
 */
export const filterById = (dataP, idEdit, setInput, setSelected) => {
  if (dataP) {
    const data = dataP.filter((data) => data._id === idEdit);
    const dt = data[0];
    setInput(dt);
    if (setSelected) {
      setSelected(dt?.permissions);
    }
  }
};

export const photoChange = (setInput, e) => {
  setInput((prev) => ({
    ...prev,
    logo: e.target.files[0],
    photo: URL.createObjectURL(e.target.files[0]),
  }));
};
export const profilePhotoChange = (input, e) => {
  return {
    ...input,
    logo: e.target.files[0],
    photo: URL.createObjectURL(e.target.files[0]),
  };
};

/**
 * Delete Alert
 * @param {*} dispatch
 * @param {*} deleteApi
 * @param {*} id
 */
export const deleteAlert = (dispatch, deleteApi, id) => {
  swal({
    title: "Danger",
    text: "Are you sure",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      dispatch(deleteApi(id));
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
};

/**
 * Seleted Rows Data Delete
 * @param {*} selectedRows
 * @param {*} dispatch
 * @param {*} deletes
 * @param {*} setSelectedRows
 * @returns
 */
export const selectionRowsDelete = (
  selectedRows,
  dispatch,
  deleteSelectedRows,
  setSelectedRows,
  setToggleCleared,
  toggleCleared
) => {
  const handleDelete = () => {
    swal({
      title: "Danger",
      text: "Are you sure",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        selectedRows.map((rowId) => {
          dispatch(deleteSelectedRows(rowId));
        });
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
      }
    });
  };

  return (
    <>
      <button onClick={handleDelete} className="btn btn-small btn-warning">
        <i className="fa fa-trash"></i>
      </button>
    </>
  );
};
