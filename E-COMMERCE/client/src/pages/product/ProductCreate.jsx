import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import useFormFrilds from "../../hooks/inputFeildsForm";

const ProductCreate = () => {
  const { category, brand, tag } = useSelector((state) => state.product);

  // product type state
  const [productType, setProductType] = useState("Simple Product");

  // tags state manage
  const [tags, setTags] = useState(null);

  // selected categories state manage
  const [catSelected, setCatSelected] = useState([]);
  // for form data state mange
  const [input, handleInputChange] = useFormFrilds({
    name: "",
    productType: "",
    sortDesc: "",
    longDesc: "",
    brand: "",
  });

  // Tag field
  let tagOptions = [];
  tag?.forEach((item) => {
    tagOptions.push({ value: item._id, label: item.name });
  });

  // handle categories manage function
  const handleCatChange = (e) => {
    const selectedCatList = [...catSelected];

    if (selectedCatList.includes(e.target.value)) {
      selectedCatList.splice(selectedCatList.indexOf(e.target.value), 1);
    } else {
      selectedCatList.push(e.target.value);
    }

    setCatSelected(selectedCatList);
  };

  return (
    <>
      <PageHeader title="Product / Product Create" />

      <div className="row">
        <div className="col-md-12">
          <Link className="btnm btn-primary p-1" to="/product">
            Back
          </Link>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Create new product</h4>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Product Type</label>
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={(e) => setProductType(e.target.value)}
                      >
                        <option value="Simple Product" key="">
                          Simple Product
                        </option>
                        <option value="Variable Product" key="">
                          Variable Product
                        </option>
                        <option value="Grouped Product" key="">
                          Grouped Product
                        </option>
                        <option value="External Product" key="">
                          External Product
                        </option>
                      </select>
                    </div>
                    {/* Product fields by type start */}
                    {productType === "Simple Product" && (
                      <div className="bg-info text-light p-5 mb-5">
                        <div className="form-group">
                          <label>Regular Price</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Sale Price</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Stock</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Product Photos</label>
                          <input
                            type="file"
                            className="form-control"
                            multiple
                          />
                        </div>
                      </div>
                    )}
                    {productType === "Variable Product" && (
                      <>
                        <h1>Variable Product</h1>
                      </>
                    )}
                    {productType === "Grouped Product" && (
                      <>
                        <h1>Grouped Product</h1>
                      </>
                    )}
                    {productType === "External Product" && (
                      <div className="bg-success text-light p-5 mb-5">
                        <div className="form-group">
                          <label>Regular Price</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Sale Price</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Stock</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Product Photos</label>
                          <input
                            type="file"
                            className="form-control"
                            multiple
                          />
                        </div>
                        <div className="form-group">
                          <label>Link</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    )}
                    {/* Product fields by type end */}
                    <div className="form-group">
                      <label>Sort Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="sortDesc"
                        value={input.sortDesc}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Long Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="longDesc"
                        value={input.longDesc}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <div className="text-right">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Product Data</h4>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="form-group">
                      <label>Product Categories</label>

                      {category?.map((item, index) => {
                        return (
                          <label className="d-block" key={index}>
                            <input
                              type="checkbox"
                              value={item._id}
                              onChange={handleCatChange}
                              checked={
                                catSelected?.includes(item._id) ? true : false
                              }
                            />{" "}
                            {item.name}
                          </label>
                        );
                      })}
                    </div>
                    <div className="form-group">
                      <label>Product Brands</label>

                      <select
                        id=""
                        className="form-control"
                        name="brand"
                        value={input.brand}
                        onChange={handleInputChange}
                      >
                        {brand?.map((item, index) => {
                          return (
                            <option value={item._id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Product Tags</label>
                      <Select
                        value={tags}
                        onChange={(tags) => setTags(tags)}
                        isMulti
                        options={tagOptions}
                      />
                    </div>

                    <div className="text-right">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
