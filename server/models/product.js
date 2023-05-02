module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "products",
    {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "stores",
          key: "store_id",
        },
      },
      productName: Sequelize.STRING,
      handle: Sequelize.STRING,
    },
    {
      timestamps: true,
    }
  );
  return product;
};
