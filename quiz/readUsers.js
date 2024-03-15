const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.resolve(__dirname, '../data/users.json');

router.get('/usernames', (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading user data');
      return;
    }
    const users = JSON.parse(data);
    const usernames = users.map(user => ({ id: user.id, username: user.username }));
    res.json(usernames);
  });
});

router.get('/username/:name', (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading user data');
      return;
    }
    const users = JSON.parse(data);
    const user = users.find(user => user.username === req.params.name);
    if (user) {
      res.json({ email: user.email });
    } else {
      res.status(404).send('User not found');
    }
  });
});

module.exports = router;
