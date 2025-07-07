let express = require('express');
let bodyParser = require('body-parser');
const dotenv = require("dotenv");
let app = express();
dotenv.config();

console.log("Hello World");

// app.use((req, res, next) => {
//     console.log(req.method + " " + req.path + " - " + req.ip);
//     next();
// })

app.use(bodyParser.urlencoded({extended: false}));

app.post('/name', (req, res) => {
  res.json({name: req.body.first + " " + req.body.last});
})

app.get('/:word/echo', (req,res) => {
    res.send(res.json({"echo": req.params.word}))
})

app.get('/name', (req, res) => {
    res.json({"name": req.query.first + " " + req.query.last})
})

app.get('/now',
  // 1. Middleware function to add the current time to the request
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  // 2. Final handler to send the JSON response
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/public',express.static(__dirname + '/public'));

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.send(res.json({"message": "HELLO JSON"}));
    } else {
        res.send(res.json({"message": "Hello json"}));
    }

    
})































 module.exports = app;
