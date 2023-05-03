import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = (props) => {
  const [product, setProduct] = useState(null);
  const [variants, setVariant] = useState([]);
  const location = useLocation();
  const token = location.state?.id;

  /*get store products */
  const onLoadPage = async () => {
    const response = await fetch("http://localhost:3001/auth/product/store", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    setProduct(data);
  };
  /*get products variants */
  // const productVariants = async () => {
  //   const response = await fetch("http://localhost:3001/auth/variant/get", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const data = await response.json();
  //   console.log(data);
  //   setVariant(data);
  // };
  useEffect(() => {
    onLoadPage();
  }, []);

  const onOptionChange = async (e) => {
    let id = e.target.value;
    const response = await fetch(
      `http://localhost:3001/auth/variant/getVariants/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json(); //getting object in response
    if (data) {
      setVariant([data]); //converting into array.
    } else {
      setVariant([]);
    }
  };
  return (
    <>
      <h3>Welcome Admin</h3>
      <select onChange={onOptionChange}>
        <option value="0">---select product---</option>
        {product?.map((value) => (
          <option key={value.product_id} value={value.product_id}>
            {value.productName}
          </option>
        ))}
      </select>
      <br></br>
      <div className="tableWrapper">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Variant Id</th>
            <th>Variant Name</th>
            <th>Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {variants.length > 0 ? (
            variants?.map((variant) => (
              <tr key={variant.variant_id}>
                <td>{variant.variant_id}</td>
                <td>{variant.title}</td>
                <td>{variant.price}</td>
                <td>{variant.option}</td>
              </tr>
            ))
          ) : (
            <div>No data found</div>
          )}
        </tbody>
      </table>
      </div>
      {/* <div>
        <button> Add Product</button>
      </div> */}
      {/* <UserDashboard userValue ={store}/>  */}
    </>
  );
};

export default Dashboard;
