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
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comments");

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

db.sequelize.sync();

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoutes);

app.use("/api/messages", auth, messageRoutes);
app.use("/api/comments", auth, commentRoutes);

module.exports = app;