module.exports = (sequelize, Sequelize) => {
  const variant = sequelize.define("varaints", {
    variant_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "products",
        key: "product_id",
      },
    },
    title: Sequelize.STRING,
    price: Sequelize.STRING,
    option: Sequelize.STRING,
  });
  return variant;
};
