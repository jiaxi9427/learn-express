const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8000;

const readUsers = require('./readUsers');
const writeUsers = require('./writeUsers');

const addMsgToRequest = function (req, res, next) {
  const dataPath = path.resolve(__dirname, '../data/users.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      return res.status(500).json({
        error: { message: 'Error reading user data', status: 500 }
      });
    }
    try {
      req.users = JSON.parse(data);
      next();
    } catch (parseErr) {
      console.error('Error parsing user data:', parseErr);
      return res.status(500).json({
        error: { message: 'Error parsing user data', status: 500 }
      });
    }
  });
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/read', addMsgToRequest, readUsers);
app.use('/write', addMsgToRequest, writeUsers);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
