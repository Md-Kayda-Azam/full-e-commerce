import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect, useMemo, useState } from "react";
import {
  deleteCategories,
  deleteProductCategory,
  updateStatusProductCategory,
} from "../../features/product/productApiSlice";

import DataTables from "react-data-table-component";

import { timeAgo } from "../../helpers/timeAgo";
import CategoryModal from "../../components/Modals/CategoryModals/CreateCategory";
import CategoryUpdateModal from "../../components/Modals/CategoryModals/UpdateCategory";
import {
  deleteAlert,
  messageToaster,
  selectionRowsDelete,
} from "../../utils/tools";

const Category = () => {
  const cols = [
    {
      name: "Category Logo",
      selector: (row) => (
        <img
          src={row.photo}
          style={{
            width: "50px",
            height: "50px",
            margin: "10px",
            objectFit: "cover",
          }}
          className="border rounded"
          alt="logo"
        />
      ),
    },
    {
      name: "Category Name",
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
            className="btn btn-small btn-warning mr-1"
            data-target="#categoryEditModalPopup"
            data-toggle="modal"
            onClick={() => setIdEdit(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            onClick={() => handleCategoryDelete(row._id)}
            className="btn btn-small btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { category, error, message } = useSelector((state) => state.product);

  const [idEdit, setIdEdit] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // Category data delete
  const handleCategoryDelete = (id) => {
    deleteAlert(dispatch, deleteProductCategory, id);
  };

  // handle Category status updated
  const handleStatusUpdate = (id, status) => {
    dispatch(updateStatusProductCategory({ id, status }));
  };

  // handle rows select
  const handleRowSelect = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row));
  };

  // seleted rows delete
  const contextActions = useMemo(() => {
    const handleDelete = selectionRowsDelete(
      selectedRows,
      dispatch,
      deleteCategories,
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

  // Category Data search and Filtering code
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = category?.filter(
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
      <PageHeader title="Category" />

      <CategoryModal modal="categoryModalPopup" />
      <CategoryUpdateModal idEdit={idEdit} modal="categoryEditModalPopup" />

      <div className="row">
        <div className="col-md-12">
          <button
            className="btnm btn-primary"
            data-target="#categoryModalPopup"
            data-toggle="modal"
          >
            Add new category
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

export default Category;
