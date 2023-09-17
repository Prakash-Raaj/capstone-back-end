const express = require('express');
const cors = require('cors');
// const mongoose = require("mongoose");

const app = express();

var corsOptions = {
  // origin: 'http://localhost:8081',
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

var Sample = db.mongoose.model('Sample', {
  name: String,
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to capstone backend application.' });
});

app.post('/db', (req, res) => {
  var name = req.body.textValue;
  console.log('check the name', name);
  var sampleData = new Sample({ name });
  sampleData.save().then(function () {
    console.log('Data saved to database');
  });
  res.send('Data saved to database');
});

require('./app/routes/turorial.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
