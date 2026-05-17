const express = require("express");

const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

const fs = require("fs");
const path = require("path");



/* =========================
   STATIC FILES
========================= */


app.use(
  "/uploads",
  express.static(
    require("path").join(__dirname, "uploads")
  )
);

// Processed datasets access
app.use(
  "/processed",
  express.static(
    require("path").join(__dirname, "data/processed")
  )
);





/* =========================
   TEMP USERS STORAGE
========================= */

let users = [];

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Crime In India Backend Running");
});

/* =========================
   SIGNUP
========================= */

app.post("/signup", (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields required"
    });
  }

  const exists = users.find(
    (user) => user.email === email
  );

  if (exists) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  users.push({
    name,
    email,
    password
  });

  res.json({
    message: "Signup successful"
  });
});

/* =========================
   LOGIN
========================= */

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  res.json({
    message: "Login successful"
  });
});

/* =========================
   RESOURCES API
========================= */

app.get("/api/resources", (req, res) => {

  delete require.cache[
    require.resolve("./data/processed/resources.json")
  ];

  const resources = require(
    "./data/processed/resources.json"
  );

  res.json(resources);

});

/* =========================
   CRIME RECORDS API
========================= */

app.get("/api/crime-records", (req, res) => {

  const crimeData = require(
    "./data/processed/crime_records_processed.json"
  );

  res.json(crimeData);

});

/* =========================
   STATES API
========================= */

app.get("/api/states", (req, res) => {

  const statesData = require(
    "./data/processed/states_processed.json"
  );

  res.json(statesData);

});
/* =========================
   DOWNLOAD TRACKING APIs
========================= */

const downloadsFile = path.join(
  __dirname,
  "downloads.json"
);

app.post("/api/download", (req, res) => {

  const { fileName } = req.body;

  const downloads =
    JSON.parse(
      fs.readFileSync(downloadsFile)
    );

  downloads.push({
    fileName,
    time: new Date().toISOString()
  });

  fs.writeFileSync(
    downloadsFile,
    JSON.stringify(downloads, null, 2)
  );

  res.json({
    success: true
  });

});

app.get("/api/downloads", (req, res) => {

  const downloads =
    JSON.parse(
      fs.readFileSync(downloadsFile)
    );

  res.json(downloads);

});
app.get("/hello-test", (req, res) => {
  res.send("HELLO TEST WORKS");
});

const PORT = 5001;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});