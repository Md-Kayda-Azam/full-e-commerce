import ModalPopup from "../../components/ModalPopup/ModalPopup";

import { useDispatch, useSelector } from "react-redux";

import useFormFrilds from "../../hooks/inputFeildsForm";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect, useMemo, useState } from "react";
import {
  createBrand,
  deleteBrand,
  deleteBrands,
  updatedBrandData,
  updatedBrandStatusData,
} from "../../features/product/productApiSlice";
import { createToast } from "../../helpers/toast";
import { setMessageEmpty } from "../../features/product/productSlice";

import DataTables from "react-data-table-component";

import { timeAgo } from "../../helpers/timeAgo";
import swal from "sweetalert";

const Brand = () => {
  const cols = [
    {
      name: "Brand Logo",
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
            className="btn btn-small btn-danger mr-1"
            data-target="#brandEditModalPopup"
            data-toggle="modal"
            onClick={() => handleBrandEdit(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            onClick={() => handleBrandDelete(row._id)}
            className="btn btn-small btn-warning"
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { brand, error, message, loader } = useSelector(
    (state) => state.product
  );

  const [logo, setLogo] = useState(null);
  const [logoPrev, setLogoPrev] = useState(null);

  const [updatedLogoPrev, setUpdatedLogoPrev] = useState(null);

  const [search, setSearch] = useState("");

  const [brandEditData, setBrandEditData] = useState({});

  const [input, handleInputChange, resetForm] = useFormFrilds({
    name: "",
  });

  // hanbdle logo change
  const handleonChangeLogo = (e) => {
    setLogo(e.target.files[0]);
    setLogoPrev(URL.createObjectURL(e.target.files[0]));
  };
  const handleSearch = (e) => {
    setSearch(e);
  };

  // handle brand data created
  const handleCreateBrand = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("brandPhoto", logo);

    dispatch(createBrand(form_data));

    resetForm();
    setLogoPrev(null);
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

  // Brand data delete
  const handleBrandDelete = (id) => {
    swal({
      title: "Danger",
      text: "Are you sure",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBrand(id));
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // handle brand status updated
  const handleStatusUpdate = (id, status) => {
    dispatch(updatedBrandStatusData({ id, status }));
  };

  // handle updated brand
  const handleBrandEdit = (id) => {
    const data = brand.find((data) => data._id == id);
    setBrandEditData(data);
    setUpdatedLogoPrev(null);
  };

  // handle updated brand onChange Logo
  const handleOnChangeBrandUpdated = (e) => {
    setBrandEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnChangeBrandUpdatedLogo = (e) => {
    setUpdatedLogoPrev(URL.createObjectURL(e.target.files[0]));
    setBrandEditData((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  // handle updated brand
  const handleUpdatedBrand = (e) => {
    e.preventDefault();
    const form_data = new FormData();

    form_data.append("name", brandEditData.name);
    form_data.append("brandPhoto", brandEditData.photo);
    dispatch(updatedBrandData({ data: form_data, id: brandEditData._id }));
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row));
  };
  const contextActions = useMemo(() => {
    const handleDelete = () => {
      selectedRows.map((rowId) => {
        dispatch(deleteBrands(rowId)); // Assuming deleteBrand action takes the brand ID as an argument
      });
      setSelectedRows([]); // Clear selected rows after deletion
    };

    return (
      <button onClick={handleDelete} className="btn btn-small btn-warning">
        <i className="fa fa-trash"></i>
      </button>
    );
  }, [dispatch, selectedRows]);
  return (
    <>
      <PageHeader title="Brand" />

      <ModalPopup target="brandModalPopup" title="Add new brand">
        <form onSubmit={handleCreateBrand}>
          <div className="my-3">
            <label htmlFor="">Brand Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <img src={logoPrev} className="w-100" alt="" />
          </div>
          <div className="my-3">
            <label htmlFor="">Brand logo</label>
            <input
              type="file"
              className="form-control"
              name="logo"
              onChange={(e) => handleonChangeLogo(e)}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              {loader ? "Brand data creating....." : "Add new Brand"}
            </button>
          </div>
        </form>
      </ModalPopup>
      <ModalPopup target="brandEditModalPopup" title="Updated brand">
        <form onSubmit={handleUpdatedBrand}>
          <div className="my-3">
            <label htmlFor="">Brand Name </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={brandEditData.name}
              onChange={handleOnChangeBrandUpdated}
            />
          </div>
          <div className="my-3">
            <img
              src={updatedLogoPrev ? updatedLogoPrev : brandEditData.photo}
              className="w-100"
              alt=""
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Brand logo</label>
            <input
              type="file"
              className="form-control"
              name="Photo"
              onChange={handleOnChangeBrandUpdatedLogo}
            />
          </div>

          <div className="my-3">
            <button className="btn btn-primary btn-block" type="submit">
              {loader ? "Brand data creating....." : "Add new Brand"}
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btnm btn-primary"
            data-target="#brandModalPopup"
            data-toggle="modal"
          >
            Add new brand
          </button>
          <br />
          <br />
          <DataTables
            fixedHeader
            pagination
            className="shadow-sm"
            title="All Brands Data"
            columns={cols}
            data={brand ? brand : []}
            onSelectedRowsChange={handleRowSelect}
            contextActions={contextActions}
            selectableRows
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                className="form-control"
                placeholder="Search ..."
                style={{ width: "200px" }}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default Brand;
