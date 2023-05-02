require("./db/index");
const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const routes = require("./routes/auth");
const productRoutes = require("./routes/product");
const variantRoutes = require("./routes/variant");
const cookieparser = require("cookie-parser");

/*middleware */
// allow the app to use cookieparser
app.use(cookieparser());
// app.use(morgan("common"));
app.use(cors({
  credentials:true,
  origin:'http://localhost:3000'
}));


/*to parse request body. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*Routes*/
app.use("/auth", routes);
app.use("/auth/product", productRoutes);
app.use("/auth/variant", variantRoutes);

app.listen(PORT, () => {
  console.log(`server listen at port : ${PORT}`);
});
