const db = require("../db/index");
const Store = db.store;
const Product = db.product;
const Variant = db.variant;
const Order = db.order;

const buyOrder = async (req, res) => {
  try {
    const store_id = req.cookies["id"];
    const variant_id = req.params.id;

    const storeTable = await Store.findOne({ where: { store_id: store_id } });
    const variantTable = await Variant.findOne({
      where: { variant_id: variant_id },
    });

    const product_id = variantTable.product_id;
    const productTable = await Product.findOne({
      where: { product_id: product_id },
    });

    if (storeTable && variantTable && productTable) {
      const order = await Order.create({
        storeOwner: storeTable.storeOwner,
        product_name: productTable.productName,
        variant_name: variantTable.title,
        price: variantTable.price,
      });

      res.status(200).json(order);
    } else {
      res.status(400).json({ error: "Cannot able to import the data." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  buyOrder,
};
