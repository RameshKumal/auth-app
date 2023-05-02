const db = require("../db/index");
const Variant = db.variant;
const Product = db.product;

const getVariantsList = async (req, res) => {
  try {
    /* for list of product variant showing. */
    const id = req.params.id;
    const variant = await Variant.findOne({ where: { product_id: id } });
    res.status(200).json(variant);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getVariants = async (req, res) => {
  try {
    /* for particular Dasnboard showing. */

    const variant = await Variant.findAll();
    res.status(200).json(variant);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createVariants = async (req, res) => {
  try {
    const { variant_id, product_id, title, price, option } = req.body;
    const newProduct = await Variant.create({
      variant_id: variant_id,
      product_id: product_id,
      title: title,
      price: price,
      option: option,
    });

    const variant = await Variant.findAll();
    res.status(201).json(variant);
  } catch (err) {
    res.status(409).json({
      error: err.message,
    }); /*409 indicates that the request could not be processed because of conflict in the request */
  }
};

// const addRemoveProducts = async (req, res) => {
//   try {
//     /*add products in to the particular store */
//     const { store_id, product_id } = req.body;

//     const store = await Store.findByPk(store_id);
//     const product = await Product.findByPk(product_id);

//     if (product.store_id.includes(store_id)) {
//       product.store_id = product.store_id.filter((id) => id !== store_id);
//     } else {
//       product.store_id.push(store_id);
//     }
//     await product.save();

//     const newProducts = product.map(
//       ({ store_id, product_id, productName, handle }) => {
//         return { store_id, product_id, productName, handle };
//       }
//     );
//     //add store id to the product.
//     await Product.create({
//       store_id: store_id,
//       product_id: product_id,
//       productName: productName,
//       handle: handle,
//     });
//     res.status(200).json(newProducts);
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// };

// const deleteProducts = async (req, res) => {
//   try {
//     /*user will delete the product from the dashboard.*/
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// };

// const updateProducts = async (req, res) => {
//   const { product_id } = req.params.product_id;
// };

module.exports = {
  getVariantsList,
  createVariants,
  getVariants,
};
