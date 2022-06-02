const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config({ path: "./config.env" });

const dbConnection = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;
const routes = require("./src/routes");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "research-project-management-tool API",
      description: "SLIIT",
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
  .connect(dbConnection, {
    dbName: "research-project-db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}...`));
