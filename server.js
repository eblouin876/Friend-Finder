let express = require("express");

let app = express();

let PORT = process.env.PORT || 8080;

require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
