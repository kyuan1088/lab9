// use express js and MVC architecture
const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

// use environment varible or port 3000 if not set
// use ejs templating engine
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// add static route to the public folder
app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

// shows the request path in console
app.use(homeController.logRequestPaths);

// home controller for routing
// the respondWithHome function redirect to home page
// the respondWithName function redirect to image file in images folder based on the requested image name (1, 2, 3)
app.get("/home", homeController.respondWithHome);
app.get("/images/:imageNumber", homeController.respondWithName);

// This is to help debug post request, not in use for this lab
app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

// Error handling using the errorController.js
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running on http://localhost:${app.get("port")}`);
});
