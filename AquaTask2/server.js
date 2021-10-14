const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();

var corsOptions = {
  origin: "http://localhost:5500"
};

app.use(cors());



// parse requests of content-type 
app.use(bodyParser.json());

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }));


const db =require("./models")
db.sequelize.sync();




// simple route
app.get("/", (req, res) => {
  res.json({ message: "test route" });
});

require("./routes/employees.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});