const CartPage = (props) => {
  console.log(props.order);
  const productInfo = props.order[0]
  return (
    <div>
      <h3>Your Order</h3>
      <div>Order id: {productInfo.order_id}</div>
      <div>Buy from: {productInfo.storeOwner}</div>
      <div>Product name: {productInfo.product_name}</div>
      <div>Handle: {productInfo.variant_name}</div>
      <div>price: {productInfo.price}</div>
    </div>
  );
};
export default CartPage;
