module.exports = (sequelize, Sequelize) => {
  const orderInfo = sequelize.define(
    "order_info",
    {
      orderInfo_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "stores",
          key: "store_id",
        },
      },
      storeName: Sequelize.STRING,
      buy_from_store: Sequelize.STRING,
    },
    { timestamps: true }
  );
  return orderInfo;
};
