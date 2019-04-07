let path = require("path");
let fs = require("fs");

module.exports = function(app) {
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/match", function(req, res) {
    let name = req.query.match;
    let html = "";
    fs.readFile(
      path.join(__dirname, "../data/friends.json"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let match = JSON.parse(data).friends.filter(e => {
            if (e.name === name) {
              return e;
            }
          })[0];
          //   Build basic html to send
          html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
            />
            <title>Friend Finder</title>
          </head>
          <body>
            <div class="container">
              <div class="row"></div>
              <div class="row">
                <div class="col s10 offset-s1 grey lighten-1">
                  <h1>Your Match</h1>
                  <img src='${match.photo}' placeholder=${match.name}>
                  <h3>${match.name} </h3>
                  <div class="divider"></div>
                </div>
                <div class="col s10 offset-s1">
                  <a href="/api/friends">API Friends List</a> |
                  <a href="https://github.com/eblouin876/Friend-Finder">GitHub Repo</a>
                  | <a href="/">Home</a>
                </div>
              </div>
            </div>
          </body>
        
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </html>
`;
          console.log(html);
          res.send(html);
        }
      }
    );
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
