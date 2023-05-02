const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/index");
require("dotenv").config();
const store = db.store;

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { store_id, storeOwner, password, active, inActive } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await store.create({
      store_id: store_id,
      storeOwner: storeOwner,
      password: hashPassword,
      active: active,
      inActive: inActive,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const {
      storeOwner, //store domain
      password,
    } = req.body;

    const owner = await store.findOne({ where : {storeOwner: storeOwner} });
    console.log(owner);
    if (!owner) return res.status(400).json({ msg: "Store does not exist." });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      console.log("Section Three");
      return res.status(400).json({ error: "Invalid store credentials" });
    }

    /*generating the token */
    const token = jwt.sign({ id: owner.store_id }, process.env.JWT_SECRET);
    console.log(token);
    res.cookie('id', owner.store_id)
    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 86000 * 24), //3 seconds
      httpOnly: false,
      secure: false,
    });
    //   .status(200)
    //   .json({ owner });
    res.status(200).json({ owner });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { login, register };
