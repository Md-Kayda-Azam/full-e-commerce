import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect, useMemo, useState } from "react";
import {
  deleteTag,
  deleteTags,
  updatedStatusTag,
} from "../../features/product/productApiSlice";

import DataTables from "react-data-table-component";

import { timeAgo } from "../../helpers/timeAgo";
import CreateTag from "../../components/Modals/TagModals/CreateTag";
import UpdateTag from "../../components/Modals/TagModals/UpdateTag";
import {
  deleteAlert,
  messageToaster,
  selectionRowsDelete,
} from "../../utils/tools";

const Tag = () => {
  const cols = [
    {
      name: "Tag Name",
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
            onClick={() => handleStatusUpdateTag(row._id, row.status)}
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
            data-target="#tagEditModalPopup"
            data-toggle="modal"
            onClick={() => setIdEdit(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            onClick={() => handleTagDelete(row._id)}
            className="btn btn-small btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { tag, error, message } = useSelector((state) => state.product);

  const [idEdit, setIdEdit] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // handle Tag status updated
  const handleStatusUpdateTag = (id, status) => {
    dispatch(updatedStatusTag({ id, status }));
  };

  // Selected Rows map
  const handleRowSelect = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row));
  };

  // Delete all rows seleted Tags
  const contextActions = useMemo(() => {
    const handleDelete = selectionRowsDelete(
      selectedRows,
      dispatch,
      deleteTags,
      setSelectedRows,
      setToggleCleared,
      toggleCleared
    );

    return handleDelete;
  }, [dispatch, selectedRows, setToggleCleared, toggleCleared]);

  // Tag data delete
  const handleTagDelete = (id) => {
    deleteAlert(dispatch, deleteTag, id);
  };

  // Toaster Message
  useEffect(() => {
    messageToaster(dispatch, error, message);
  }, [error, message, dispatch]);

  // Tag Data search and Filtering code
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = tag?.filter(
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
      <PageHeader title="Tag" />

      <CreateTag show="tagModalPopup" />
      <UpdateTag idEdit={idEdit} show="tagEditModalPopup" />

      <div className="row">
        <div className="col-md-12">
          <button
            className="btnm btn-primary"
            data-target="#tagModalPopup"
            data-toggle="modal"
          >
            Add new tag
          </button>
          <br />
          <br />
          <DataTables
            fixedHeader
            pagination
            className="shadow-sm"
            title="All Tags Data"
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

export default Tag;
