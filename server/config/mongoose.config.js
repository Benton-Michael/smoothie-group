const mongoose = require("mongoose");
const dbName = "smoothiesDB"; // Change the DB name here + confirm mongodb is running

mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to the MongoDB ${dbName} database`);
  })
  .catch((err) => {
    console.log("DB Connection Error", err);
  });
