const smoothieController = require("../controllers/smoothie.controller");

module.exports = (app) => {
  // Starter test
  // root is working :)
  // app.get('/', (req, res) => {
  //     res.json({msg: "all set up"}); // From Postman:  "msg": "all set up"
  app.post("/api/smoothie", smoothieController.createNewSmoothie);
  app.put("/api/smoothie/:id", smoothieController.updateSmoothie);
  app.get("/api/smoothies", smoothieController.getAllSmoothies);
  app.get("/api/smoothie/:id", smoothieController.getOneSmoothie);
  app.delete("/api/smoothie/:id", smoothieController.deleteSmoothie);
};
