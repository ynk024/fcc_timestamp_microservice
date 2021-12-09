// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// My Timestamp Microservice
const isNum = (s) => s * 1;

const myDateMiddleware = (req, res, next) => {
  const date = req.params.date;
  req.date = new Date(isNum(date) ? parseInt(date) : date);
  if(!req.date.getTime()) return res.json({ error: "Invalid Date" });
  next();
}

app.use("/api/:date", myDateMiddleware);

app.get("/api", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date().toUTCString()});
});

app.get("/api/:date", (req, res) => {
  res.json({ unix: Date.parse(req.date), utc: req.date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
