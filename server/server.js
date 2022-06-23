const express = require("express"); // Each line should remain in this order to ensure correct functionality
const cors = require("cors");

const app = express(); // Express is the framework for the Node server
const PORT = 5001; // Using this as my 'Port 8000' -- Some Mac's work on 5001 others on 8000

app.use(express.json()); // Allows us to read JSON objects sent through client request
app.use(express.urlencoded({ extended: true })); // DON'T FORGET! THE middleware - This lets us read JSON objects
// with strings and array's that are present in the client request

// app.use(cors()); // this would accept all origins - but we want to limit this to our localhost port

// Only the localhost port will be able to access the server
// With cors, different ports will be able to send requests to the api. So front-end in on 3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

require("./config/mongoose.config");
// Always place the routes after the middleware!!
// The app.use(express.json()) line must always be above the (app) call
require("./routes/smoothie.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
