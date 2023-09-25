import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect, useMemo, useState } from "react";

import DataTables from "react-data-table-component";

import { timeAgo } from "../../helpers/timeAgo";
import {
  deleteAlert,
  messageToaster,
  selectionRowsDelete,
} from "../../utils/tools";
import CreateUser from "../../components/Modals/UserModals/CreateUser";
import UpdateUser from "../../components/Modals/UserModals/UpdateUser";
import {
  deleteUser,
  deleteUsers,
  updateUserStatusData,
} from "../../features/user/userApiSlice";

const User = () => {
  const cols = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role?.name,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "CreatedAt",
      selector: (row) => timeAgo(new Date(row.createdAt)),
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="status-toggle">
          <input
            type="checkbox"
            id="status_1"
            className="check"
            checked={row.status ? true : false}
          />
          <label
            onClick={() => handleStatusUpdate(row._id, row.status)}
            htmlFor="status_1"
            className="checktoggle"
          >
            checkbox
          </label>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-small btn-warning mr-1"
            data-target="#userUpdateModalPopup"
            data-toggle="modal"
            onClick={() => setIdEdit(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            onClick={() => handleUserDelete(row._id)}
            className="btn btn-small btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { user, error, message } = useSelector((state) => state.user);

  const [idEdit, setIdEdit] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // handle User status updated
  const handleStatusUpdate = (id, status) => {
    dispatch(updateUserStatusData({ id, status }));
  };

  // Selected Rows map
  const handleRowSelect = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row));
  };

  // Delete all rows seleted Brands
  const contextActions = useMemo(() => {
    const handleDelete = selectionRowsDelete(
      selectedRows,
      dispatch,
      deleteUsers,
      setSelectedRows,
      setToggleCleared,
      toggleCleared
    );

    return handleDelete;
  }, [dispatch, selectedRows, setToggleCleared, toggleCleared]);

  // User data delete
  const handleUserDelete = (id) => {
    deleteAlert(dispatch, deleteUser, id);
  };

  // Toaster Message
  useEffect(() => {
    messageToaster(dispatch, error, message);
  }, [error, message, dispatch]);

  // User Data search and Filtering code
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = user?.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };
  return (
    <>
      <PageHeader title="User" />

      <CreateUser show="userModalPopup" />
      <UpdateUser idEdit={idEdit} show="userUpdateModalPopup" />
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
          <DataTables
            fixedHeader
            pagination
            className="shadow-sm"
            title="All Users Data"
            columns={cols}
            data={filteredItems}
            onSelectedRowsChange={handleRowSelect}
            contextActions={contextActions}
            selectableRows
            highlightOnHover
            clearSelectedRows={toggleCleared}
            subHeader
            subHeaderComponent={
              <>
                <input
                  id="search"
                  type="text"
                  className="form-control"
                  placeholder="Search ..."
                  aria-label="Search Input"
                  style={{ width: "200px" }}
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={handleClear}
                >
                  <i className="fa fa-times"></i>
                </button>
              </>
            }
          />
        </div>
      </div>
    </>
  );
};

export default User;
