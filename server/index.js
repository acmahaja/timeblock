const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");



const {AuthRouter} = require('./routes/auth')
const {BoardRouter} = require('./routes/board')
const {ColumnRouter} = require('./routes/column')
const {TasksRouter} = require('./routes/tasks')
const {SubTaskRouter} = require('./routes/subtasks')

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


app.use('/api/subtasks', SubTaskRouter)
app.use('/api/tasks', TasksRouter)
app.use('/api/column', ColumnRouter)
app.use('/api/board', BoardRouter)
app.use('/auth', AuthRouter)


app.delete('/nuke', async (req,res)=> {
  mongoose
  .connect(
    process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    async function () {

      process.env.NODE_ENV === 'production' ? res.send(`Cant Drop Production Build`):  await mongoose.connection.db.dropDatabase()
        .then(()=>{
          res.send(`Dropped DB`)
        })

    }
  )
})

app.get("/api", (req, res) => {
  res.json({ message: "🖥️[server]: Hello from MernTemplate server!" });
});

app.get("/", (req, res) => {
  res.send("🖥️ Hello From MernTemplate");
});

app.listen(port, () => {
  console.log(`🖥️ [Server]: Listening on ${port}`);
});
