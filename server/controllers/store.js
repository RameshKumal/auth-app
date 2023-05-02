const db = require("../db/index");
const Store = db.store;

const getStores = async (req, res) => {
  try {
    const { store_id } = req.body;

    const store = await Store.findOne({
      where: {
        store_id: store_id,
      },
    });

    if (store) {
      return res.status(200).json(store);
    }else{
      res.status(200).json({message:"success"});
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getStores,
};
