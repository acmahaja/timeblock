const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");



const {AuthRouter} = require('./routes/auth')
const {BoardRouter} = require('./routes/board')

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());


mongoose
  .connect(
    process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log(`🌿[Database]: Connected to database`);
  })
  .catch((error) => {
    console.log(`🖥️[Server]: Failed to connect to database`);
  });

const port = process.env.PORT || 3001;


app.use('/api/board', BoardRouter)
app.use('/auth', AuthRouter)


app.get("/api", (req, res) => {
  res.json({ message: "🖥️[server]: Hello from MernTemplate server!" });
});

app.get("/", (req, res) => {
  res.send("🖥️ Hello From MernTemplate");
});

app.listen(port, () => {
  console.log(`🖥️ [Server]: Listening on ${port}`);
});
