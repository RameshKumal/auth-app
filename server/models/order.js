module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define("order",
    {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      storeOwner:Sequelize.STRING,
      product_name: Sequelize.STRING,
      variant_name: Sequelize.STRING,
      price: Sequelize.STRING,
    },
    {
      timestamps: true,
    }
  );
  return order;
};
