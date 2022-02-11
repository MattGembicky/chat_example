const db = require("./initDb");

module.exports.recreateConnection = () => {
  db.connect((err) => {
    if (err) {
      console.log("Connection with database was not established: ", err);
      setTimeout(recreateConnection, 7000);
      return;
    }
    console.log("Connection with database established");
  });

  db.on("error", (err) => {
    console.log("Database error", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      console.log("Connection with database was lost");
      recreateConnection();
    } else {
      throw err;
    }
  });
};

module.exports.storeMessage = (name, text, callback) => {
  const insertationQuery = "INSERT INTO messages(name, text) VALUES (?, ?)";

  db.query(insertationQuery, [name, text], (err, result) => {
    if(err){
      console.log(err);
      return;
    }
    return callback(result.insertId);
  });
}

module.exports.getStoredMessages = (limit, callback) => {
  const limitQuery = "SELECT * FROM (SELECT * FROM messages ORDER BY id DESC LIMIT ?) AS custom ORDER BY id ASC";
  db.query(limitQuery, limit, (err, result) => {
    if(err){
      console.log(err);
      return false;
    }
    return callback(result);
  });

}
