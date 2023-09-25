import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePermission,
  deletePermissions,
  updatePermissionStatusData,
} from "../../features/user/userApiSlice";
import { getAllPermissionData } from "../../features/user/userSlice";
import { timeAgo } from "../../helpers/timeAgo";

import DataTables from "react-data-table-component";

import {
  deleteAlert,
  messageToaster,
  selectionRowsDelete,
} from "../../utils/tools";
import CreatePermission from "../../components/Modals/PermissionModals/CreatePermission";

const Permission = () => {
  const cols = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
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
            onClick={() => handleDeletePermission(row._id)}
            className="btn btn-small btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { permission, error, message } = useSelector(getAllPermissionData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // delete permission data
  const handleDeletePermission = (id) => {
    deleteAlert(dispatch, deletePermission, id);
  };
  // validation
  useEffect(() => {
    messageToaster(dispatch, error, message);
  }, [error, message, dispatch]);

  /// status update
  const handleStatusUpdate = (id, status) => {
    dispatch(updatePermissionStatusData({ id, status }));
  };

  // handle rows select
  const handleRowSelect = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row));
  };

  // Delete all rows seleted
  const contextActions = useMemo(() => {
    const handleDelete = selectionRowsDelete(
      selectedRows,
      dispatch,
      deletePermissions,
      setSelectedRows,
      setToggleCleared,
      toggleCleared
    );

    return handleDelete;
  }, [dispatch, selectedRows, setToggleCleared, toggleCleared]);

  // Toaster Message
  useEffect(() => {
    messageToaster(dispatch, error, message);
  }, [error, message, dispatch]);

  // Permission Data search and Filtering code
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = permission?.filter(
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
      <PageHeader title="Permission" />

      <CreatePermission show="userModalPopup" />

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
          <DataTables
            fixedHeader
            pagination
            className="shadow-sm"
            title="All Categories Data"
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

export default Permission;
