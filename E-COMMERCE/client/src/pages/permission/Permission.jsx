import { useEffect } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTables from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  updatePermissionStatusData,
} from "../../features/user/userApiSlice";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { createToast } from "../../helpers/toast";
import swal from "sweetalert";
import { timeAgo } from "../../helpers/timeAgo";
import useFormFrilds from "../../hooks/inputFeildsForm";

const Permission = () => {
  const dispatch = useDispatch();
  const { error, message, permission } = useSelector(getAllPermissionData);

  const [input, handleInputChange, resetForm] = useFormFrilds({
    name: "",
  });

  // hamdle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createPermission(input));

    resetForm({
      name: "",
    });
  };
  // delete permission data
  const handleDeletePermission = (id) => {
    swal({
      title: "Sure",
      text: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePermission(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  // validation
  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }

    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  /// status update
  const handleStatusUpdate = (id, status) => {
    dispatch(updatePermissionStatusData({ id, status }));
  };

  useEffect(() => {
    new DataTables(".datatable");
  });

  return (
    <>
      <PageHeader title="Permission" />

      <ModalPopup target="userModalPopup" title="Add new permission">
        <form onSubmit={handleFormSubmit}>
          <div className="my-3">
            <label htmlFor="">Permission Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              Add new permission
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btnm btn-primary"
            data-target="#userModalPopup"
            data-toggle="modal"
          >
            Add new permission
          </button>
          <br />
          <br />
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {permission && (
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...permission].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>{timeAgo(new Date(item.createdAt))}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item.status ? true : false}
                                />
                                <label
                                  onClick={() =>
                                    handleStatusUpdate(item._id, item.status)
                                  }
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>

                            <td
                              className="text-right"
                              style={{ display: "flex" }}
                            >
                              <button
                                className="btn btn-small btn-danger"
                                onClick={() => handleDeletePermission(item._id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Permission;
