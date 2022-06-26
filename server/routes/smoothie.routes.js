const smoothieController = require("../controllers/smoothie.controller");

module.exports = (app) => {
  // Starter test
  // root is working :)
  // app.get('/', (req, res) => {
  //     res.json({msg: "all set up"}); // From Postman:  "msg": "all set up"
  app.post("/api/smoothie", smoothieController.createNewSmoothie);
  app.get("/api/smoothie/_id:", smoothieController.updateSmoothie);
  app.get("/api/smoothies", smoothieController.getAllSmoothies);
  app.get("/api/smoothie/:id", smoothieController.getOneSmoothie);
};
