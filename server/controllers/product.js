const db = require("../db/index");
const Variant = db.variant;
const Product = db.product;
const Store = db.store;

const getListProducts = async (req, res) => {
  try {
    /* for list of product showing. */
    const product = await Product.findAll({
      include: Variant,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    /* for particular Dasnboard showing. */
    const id = req.cookies["id"];
    const product = await Product.findAll({ where: { store_id: id } });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createProducts = async (req, res) => {
  try {
    const { store_id, product_id, productName, handle } = req.body;
    const newProduct = await Product.create({
      store_id: store_id,
      product_id: product_id,
      productName: productName,
      handle: handle,
    });

    const product = await Product.findAll();
    res.status(201).json(product);
  } catch (err) {
    res.status(409).json({
      error: err.message,
    }); /*409 indicates that the request could not be processed because of conflict in the request */
  }
};

const addRemoveProducts = async (req, res) => {
  try {
    /*add products in to the particular store */
    const { store_id, product_id } = req.body;

    const store = await Store.findByPk(store_id);
    const product = await Product.findByPk(product_id);

    if (product.store_id.includes(store_id)) {
      product.store_id = product.store_id.filter((id) => id !== store_id);
    } else {
      product.store_id.push(store_id);
    }
    await product.save();

    const newProducts = product.map(
      ({ store_id, product_id, productName, handle }) => {
        return { store_id, product_id, productName, handle };
      }
    );
    //add store id to the product.
    await Product.create({
      store_id: store_id,
      product_id: product_id,
      productName: productName,
      handle: handle,
    });
    res.status(200).json(newProducts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteProducts = async (req, res) => {
  try {
    /*user will delete the product from the dashboard.*/
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateProducts = async (req, res) => {
  const { product_id } = req.params.product_id;
};

module.exports = {
  getProducts,
  getListProducts,
  createProducts,
  addRemoveProducts,
  deleteProducts,
  updateProducts,
};
