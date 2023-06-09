require("dotenv").config();
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.dialect,
    logging: false,
    pool: {
      max: 4,
      min: 0,
      idle: 3000,
      acquire: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Established Successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.store = require("../models/store")(sequelize, Sequelize);
db.product = require("../models/product")(sequelize, Sequelize);
db.variant = require("../models/variant")(sequelize, Sequelize);
db.order = require("../models/order")(sequelize, Sequelize);
db.orderInfo = require("../models/orderInfo")(sequelize, Sequelize);

db.store.hasMany(db.product, { foreignKey: "store_id" });
db.product.belongsTo(db.store, { foreignKey: "store_id" });

db.store.hasMany(db.orderInfo, { foreignKey: "storeId" });
db.orderInfo.belongsTo(db.store, { foreignKey: "storeIid" });

db.product.hasMany(db.variant, { foreignKey: "product_id" });
db.variant.belongsTo(db.product, { foreignKey: "product_id" });

//without syncing the the database table wont create.
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

module.exports = db;
