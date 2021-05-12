const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const auth = require("./middleware/auth");

const app = express();

const db = require("./models");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

db.sequelize.sync();

app.use("/images", express.static(path.join(_dirname, "images")));
app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoutes);

module.exports = app;