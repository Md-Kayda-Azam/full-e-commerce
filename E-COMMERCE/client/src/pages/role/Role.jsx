import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTables from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFrilds from "../../hooks/inputFeildsForm";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../helpers/toast";
import {
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatusData,
} from "../../features/user/userApiSlice";
import { timeAgo } from "../../helpers/timeAgo";
import swal from "sweetalert";

const Role = () => {
  const dispatch = useDispatch();

  const { permission, role, error, message } =
    useSelector(getAllPermissionData);

  const [input, handleInputChange, resetForm] = useFormFrilds({
    name: "",
  });

  const [selected, setSelected] = useState([]);

  const [roleEditData, setRoleditData] = useState({});

  const handleCheckBoxChange = (e) => {
    const val = e.target.value;
    const updat3eList = [...selected];
    if (selected.includes(val)) {
      updat3eList.splice(selected.indexOf(val), 1);
    } else {
      updat3eList.push(val);
    }
    setSelected(updat3eList);
  };

  // handle submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      createRole({
        name: input.name,
        permissions: [...selected],
      })
    );
    resetForm({
      name: "",
    });
    setSelected([]);
  };

  // delete role data
  const handleDeleteRole = (id) => {
    swal({
      title: "Sure",
      text: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRole(id));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  /// status update
  const handleStatusUpdate = (id, status) => {
    dispatch(updateRoleStatusData({ id, status }));
  };

  // handle edit role
  const handleEdit = (id) => {
    const data = role.find((data) => data._id == id);
    setRoleditData(data);
    setSelected(data.permissions);
  };
  // handle edit role
  const handleEditRoleChange = (e) => {
    setRoleditData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handleRoleUpdateSubmitForm
  const handleRoleUpdateSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      updateRole({
        id: roleEditData._id,
        name: roleEditData.name,
        permissions: selected,
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
  return (
    <>
      <PageHeader title="Roles" />

      <ModalPopup target="userModalPopup" title="Add new role">
        <form onSubmit={handleSubmitForm}>
          <div className="my-3">
            <label htmlFor="">Role Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Permissions</label>
            {permission?.map((item, index) => {
              return (
                <label className="d-block" key={index}>
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={selected.includes(item.name)}
                    onChange={handleCheckBoxChange}
                  />{" "}
                  {item.name}
                </label>
              );
            })}
          </div>
          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              Add new permission
            </button>
          </div>
        </form>
      </ModalPopup>
      <ModalPopup target="roleModalPopup" title="Update role">
        <form onSubmit={handleRoleUpdateSubmitForm}>
          <div className="my-3">
            <label htmlFor="">Role Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={roleEditData.name}
              onChange={handleEditRoleChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Permissions</label>
            {permission?.map((item, index) => {
              return (
                <label className="d-block" key={index}>
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={selected?.includes(item.name)}
                    onChange={handleCheckBoxChange}
                  />{" "}
                  {item.name}
                </label>
              );
            })}
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
            Add new role
          </button>
          <br />
          <br />
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {role && (
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Permission</th>
                        <th>CreatedAt</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>
                              <ul>
                                {item.permissions.map((per, index) => {
                                  return <li key={index}>{per}</li>;
                                })}
                              </ul>
                            </td>
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

                            <td className="text-right">
                              <button
                                className="btn btn-small btn-danger mr-1"
                                data-target="#roleModalPopup"
                                data-toggle="modal"
                                onClick={() => handleEdit(item._id)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-small btn-warning"
                                onClick={() => handleDeleteRole(item._id)}
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

export default Role;
