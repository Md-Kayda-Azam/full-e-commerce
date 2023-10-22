import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect, useMemo, useState } from "react";
import {
  deleteBrand,
  deleteBrands,
  updatedBrandStatusData,
} from "../../features/product/productApiSlice";

import DataTables from "react-data-table-component";

import { timeAgo } from "../../helpers/timeAgo";

import {
  deleteAlert,
  messageToaster,
  selectionRowsDelete,
} from "../../utils/tools";
import { Link } from "react-router-dom";

const Product = () => {
  const cols = [
    {
      name: "Brand Logo",
      selector: (row) => (
        <img
          src={
            row.photo
              ? row.photo
              : "https://res.cloudinary.com/dhj6mwqcf/image/upload/v1695410090/ponkmyqynpbfhjzdl84u.png"
          }
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
      name: "Brand Name",
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
            data-target="#brandEditModalPopup"
            data-toggle="modal"
            // onClick={() => setIdEdit(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            onClick={() => handleBrandDelete(row._id)}
            className="btn btn-small btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { brand, error, message } = useSelector((state) => state.product);

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // handle brand status updated
  const handleStatusUpdate = (id, status) => {
    dispatch(updatedBrandStatusData({ id, status }));
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
      deleteBrands,
      setSelectedRows,
      setToggleCleared,
      toggleCleared
    );

    return handleDelete;
  }, [dispatch, selectedRows, setToggleCleared, toggleCleared]);

  // Brand data delete
  const handleBrandDelete = (id) => {
    deleteAlert(dispatch, deleteBrand, id);
  };

  // Toaster Message
  useEffect(() => {
    messageToaster(dispatch, error, message);
  }, [error, message, dispatch]);

  // Brand Data search and Filtering code
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = brand?.filter(
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
      <PageHeader title="Product" />

      <div className="row">
        <div className="col-md-12">
          <Link className="btnm btn-primary p-1" to="/product-create">
            Add new product
          </Link>
          <br />
          <br />
          <DataTables
            fixedHeader
            pagination
            className="shadow-sm"
            title="All Brands Data"
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

export default Product;
