const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.resolve(__dirname, '../data/users.json');

router.post('/adduser', (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading user data');
      return;
    }
    const users = JSON.parse(data);

    users.push(req.body);

    fs.writeFile(dataPath, JSON.stringify(users, null, 2), err => {
      if (err) {
        res.status(500).send('Error saving user data');
      } else {
        res.send('User added successfully');
      }
    });
  });
});

module.exports = router;
