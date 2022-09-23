module.exports = app => {
    const players = require("../controllers/player.controller.js");
  
    var router = require("express").Router();
  
    // Create a new player
    router.post("/new", players.create);
  
    // Retrieve all Players
    router.post("/", players.getAll);

    // Retrieve all Banned Players
    router.post("/banned", players.getAllBanned);

    // // Retrieve a single player with Steam ID
    router.post("/:steam_id", players.getById);
  
    // // Update a Player with id
    router.put("/:steam_id", players.update);
  
    app.use('/api/player', router);
  };