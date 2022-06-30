const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);
  app.post("/logout", UserController.logout);
  app.get("/api/users", UserController.getLoggedInUser);
  app.put(
    "/api/users/favorite/smoothies",
    UserController.updateUsersWithFavorites
  );
  app.get('/api/user', UserController.getOneUserCart);
  app.put('/api/add/cart', UserController.addToCart);
  app.get("/api/users/favorites", UserController.getUserFavoritedSmoothies);
};
