const sql = require("./db.js");

// constructor
const Player = function(player) {
  this.rpname = player.rpname;
  this.money = player.money;
  this.steamid = player.steamid;
  this.position = player.position;
  this.created_at = player.created_at;
  this.last_login = player.last_login;
  this.admin = player.admin;
};

Player.getAll = (rpname, result) => {
    let query = "SELECT * FROM playerdata";
  
    if (rpname) {
      query += ` WHERE rpname LIKE '%${rpname}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("players: ", res);
      result(null, res);
    });
};

Player.create = (newPlayer, result) => {
  sql.query("INSERT INTO playerdata SET ?", newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Player: ", { id: res.insertId, ...newPlayer });
    result(null, { id: res.insertId, ...newPlayer });
  });
};

Player.update = (data, result) => {
  const columns = Object.keys(data);
  const values = Object.values(data);

  sql.query(`UPDATE playerdata SET '${columns.join("' = ? ,'")}' = ?" WHERE steamid=${data.steamid}`, newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Player: ", { id: res.insertId, ...newPlayer });
    result(null, { id: res.insertId, ...newPlayer });
  });
};

Player.getById = (steamid, result) => {
  let query = `SELECT * FROM playerdata WHERE steamid='${steamid}' LIMIT 1`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};

// TODO: Fix this shit

Player.getAllBanned = (result) => {
  let query = `SELECT 
                bans.*,
                playerdata.*
              FROM
                bans
              JOIN
                playerdata as banned_player ON bans.steamid=banned_player.steamid
              JOIN 
                playerdata as admin ON bans.admin=admin.steamid`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};

module.exports = Player;