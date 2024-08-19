const express = require("express");
const connectToDB = require("./configs/db");
const userRouter = require("./routes/userRoute");
const auth = require("./middlewares/auth");
const todoRouter = require("./routes/todoRoute");
const eventRouter = require("./routes/eventRoute");  // Import event routes
const limiter = require("./middlewares/rateLimit");
const cors = require('cors');

require("dotenv").config();
const app = express();
app.use(cors());

const port = process.env.PORT || 9090;
const db_url = process.env.DB_URL;

app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("this is a home route");
});

app.use(limiter);

app.use('/todos', auth, todoRouter);
app.use('/user', userRouter);
app.use('/events', auth, eventRouter);  // Add event routes with authentication

app.listen(port, async () => {
  try {
    await connectToDB(db_url);  // Add await to ensure DB connection is established before starting the server
    console.log('Successfully connected to the database');
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    console.log(err);
    console.log("Error while connecting to the database");
  }
});
