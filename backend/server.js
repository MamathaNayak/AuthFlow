
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/authRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
