import { useState, useEffect } from "react";
import "./addProduct.css";

const AddProduct = (props) => {
  const [enteredProduct, setProduct] = useState(" ");
  const [enteredhandle, setHandle] = useState(" ");

  const productChangeHandler = (event) => {
    setProduct(event.target.value);
  };
  const handleChangeHandler = (event) => {
    setHandle(event.target.value);
  };


  const submitHandler = async(event) => {
    event.preventDefault();

    const productDetails = {
      productName: enteredProduct,
      handle: enteredhandle,
    };
    console.log(productDetails);
    const response = await fetch(
      `http://localhost:3001/auth/product/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(productDetails),
      }
    );
  };
  return (
    <>
      {/* <h3>Add Product</h3> */}
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Enter Product</label>
            <input
              type="text"
              value={enteredProduct}
              onChange={productChangeHandler}
            ></input>
          </div>
          <div className="new-expense__control">
            <label>Product Handle</label>
            <input
              type="text"
              value={enteredhandle}
              onChange={handleChangeHandler}
            ></input>
          </div>
          <div className="new-expense__actions">
            <button className="btn-new1" onClick={props.cancleAddProduct}>
              Cancel
            </button>
            {/*invoking function in AddProducts from child component */}
            <button className="btn-new2" type="submit">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
