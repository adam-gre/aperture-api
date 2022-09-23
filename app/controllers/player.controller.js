const Player = require("../models/player.model.js");

// Create and Save a new Player
exports.create = (req, res) => {  
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    
    let playerData = req.body;

    // Create a Player
    const player = new Player({
        rpname: playerData.rpname,
        money: 2500,
        steamid: playerData.steamid,
        position: JSON.stringify({}),
        created_at: new Date(),
        last_login: new Date(),
        admin: 0
    });
  
    // Save Player in the database
    Player.create(player, (err, data) => {
      if (err)
        res.status(500).send({            
            error: true,
            message: err.message || "Some error occurred while creating the Player."
        });
      else res.send(data);
    });
};

// Retrieve all Players from the database (with condition).
exports.getAll = (req, res) => {  
    const rpname = req.query.rpname;

    Player.getAll(rpname, (err, data) => {
      if (err)
        res.status(500).send({
            error: true,
            message: err.message || "Some error occurred while creating the Player."
        });
      else res.send(data);
    });
};

// Find a single Player with a id
exports.getById = (req, res) => {  
    console.log(req.params.steam_id)
    Player.getById(req.params.steam_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Player found with id ${req.params.steam_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Player with id " + req.params.steam_id
        });
      }
    } else res.send(data);
  });
};

// Find all banned players
exports.getAllBanned = (req, res) => {
    Player.getAllBanned((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            error:true,
            message: `No banned Players found.`
        });
      } else {
        res.status(500).send({
            error:true,
            message: "Error retrieving banned Players"
        });
      }
    } else res.send(data);
  });
};

// Update a Player identified by the id in the request
exports.update = (req, res) => {   
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  let playerData = req.body;

  // Create a Player
  const player = new Player({
    steam_id: playerData.steamid,
    money: playerData.money,
    position: playerData.position,
    sessionLength: playerData.sessionLength,
    last_login: playerData.lastLogout
  }); 

  Player.create(player, (err, data) => {
    if (err)
      res.status(500).send({            
          error: true,
          message: err.message || "Some error occurred while creating the Player."
      });
    else res.send(data);
  });
};

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Players from the database.
exports.deleteAll = (req, res) => {
  
};