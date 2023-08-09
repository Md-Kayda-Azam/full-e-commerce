import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTables from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";
import { generateRandomPassword } from "../../helpers/helpers";
import useFormFrilds from "../../hooks/inputFeildsForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  updateUserStatusData,
  updateUser,
} from "../../features/user/userApiSlice";
import { createToast } from "../../helpers/toast";
import { setMessageEmpty } from "../../features/user/userSlice";
import { timeAgo } from "../../helpers/timeAgo";
import swal from "sweetalert";

const Users = () => {
  const dispatch = useDispatch();
  const { user, role, error, message } = useSelector((state) => state.user);
  const [input, handleInputChange, resetForm, setInput] = useFormFrilds({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [userUpdateData, setUserUpdateData] = useState({});
  const [newPasswordUserUpdate, setNewPasswordUserUpdate] = useState("");

  // handle Random Password Generator
  const handleRandomPasswordGenerator = (e) => {
    e.preventDefault();
    const rd_password = generateRandomPassword();

    setInput((prev) => ({
      ...prev,
      password: rd_password,
    }));
    setNewPasswordUserUpdate(rd_password);
  };
  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
    resetForm();
  };

  // handle Delete User
  const handleDeleteUser = (id) => {
    swal({
      title: "Sure",
      text: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  /// status update user
  const handleStatusUpdateUser = (id, status) => {
    dispatch(updateUserStatusData({ id, status }));
  };
  // handle update role
  const handleUpdateChange = (e) => {
    setUserUpdateData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  /// user update
  const handleUpdateUser = (id) => {
    const data = user.find((data) => data._id == id);
    setUserUpdateData(data);
  };
  /// handle User Update Submit
  const handleUserUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: userUpdateData._id,
        name: userUpdateData.name,
        email: userUpdateData.email,
        password: newPasswordUserUpdate,
        role: userUpdateData.role,
      })
    );
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
  useEffect(() => {
    new DataTables(".datatable");
  });
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <PageHeader title="Users" />
      <ModalPopup target="userModalPopup" title="Add new User">
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
            <a
              className="badge badge-info text-light"
              onClick={handleRandomPasswordGenerator}
              style={{ cursor: "pointer" }}
            >
              Random password
            </a>
          </div>
          <div className="my-3">
            <label htmlFor="">Roles</label>
            <select
              name="role"
              id=""
              className="form-control"
              value={input.role}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {role?.map((data, index) => {
                return (
                  <option value={data._id} key={index}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary w-100">
              Create new User
            </button>
          </div>
        </form>
      </ModalPopup>
      <ModalPopup target="userEdit" title="Update user">
        <form onSubmit={handleUserUpdateSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userUpdateData.name}
              onChange={handleUpdateChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={userUpdateData.email}
              onChange={handleUpdateChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Add new password</label>
            <input
              type="text"
              className="form-control"
              value={newPasswordUserUpdate}
              onChange={(e) => setNewPasswordUserUpdate(e.target.value)}
            />
            <a
              className="badge badge-info text-light"
              onClick={handleRandomPasswordGenerator}
              style={{ cursor: "pointer" }}
            >
              Random password
            </a>
          </div>
          <div className="my-3">
            <label htmlFor="">Roles</label>
            <select
              name="role"
              id=""
              className="form-control"
              value={userUpdateData.role}
              onChange={handleUpdateChange}
            >
              <option value="">--Select--</option>
              {role?.map((data, index) => {
                return (
                  <option value={data._id} key={index}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary w-100">
              Create new User
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
            Add new user
          </button>
          <br />
          <br />
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {user && (
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th className="text-right">Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data?.role?.name}</td>
                            <td>{timeAgo(new Date(data.createdAt))}</td>
                            <td className="text-right">
                              <div
                                className="status-toggle"
                                style={{
                                  display: "flex",
                                  justifyContent: "right",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={data.status ? true : false}
                                />
                                <label
                                  onClick={() =>
                                    handleStatusUpdateUser(
                                      data._id,
                                      data.status
                                    )
                                  }
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              {" "}
                              <button
                                className="btn btn-small btn-danger mr-1"
                                data-target="#userEdit"
                                data-toggle="modal"
                                onClick={() => handleUpdateUser(data._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-small btn-warning"
                                onClick={() => handleDeleteUser(data._id)}
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

export default Users;
