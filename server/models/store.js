module.exports = (sequelize, Sequelize) => {
  const store = sequelize.define(
    "stores",
    {
      store_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
      },
      storeOwner: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: Sequelize.STRING,
      // active: Sequelize.BOOLEAN,
      // inActive: Sequelize.BOOLEAN,
    },
    { timestamps: true }
  );
  return store;
};
