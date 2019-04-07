let path = require("path");
let fs = require("fs");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.send(require(path.join(__dirname, "../data/friends.json")));
  });

  app.post("/api/friends", function(req, res) {
    let val = req.body;
    let newFriend = {
      name: val.name,
      photo: val.photo,
      scores: [
        parseInt(val.q1),
        parseInt(val.q2),
        parseInt(val.q3),
        parseInt(val.q4),
        parseInt(val.q5),
        parseInt(val.q6),
        parseInt(val.q7),
        parseInt(val.q8),
        parseInt(val.q9),
        parseInt(val.q10)
      ]
    };
    fs.readFile(
      path.join(__dirname, "../data/friends.json"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let match = compare(newFriend, JSON.parse(data));
          updateFriends(newFriend);
          res.redirect(`/match?match=${match.name}`);
        }
      }
    );
  });

  function compare(newEntry, list) {
    let best = "";
    let difference = 51;
    list.friends.forEach(friend => {
      let sum = 0;
      for (let i = 0; i < friend.scores.length; i++) {
        sum += Math.abs(friend.scores[i] - newEntry.scores[i]);
      }
      if (sum < difference) {
        best = friend;
        difference = sum;
      }
    });
    return best;
  }

  function updateFriends(obj) {
    fs.readFile(
      path.join(__dirname, "../data/friends.json"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let stored = JSON.parse(data);
          stored.friends.push(obj);
          let newFriends = JSON.stringify(stored);
          fs.writeFile(
            path.join(__dirname, "../data/friends.json"),
            newFriends,
            "utf8",
            err => {
              if (err) console.log(err);
            }
          );
        }
      }
    );
  }
};
