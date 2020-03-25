const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({response: 'Home of socket chat using Node, Socket.IO, React, and Express'}).status(200);
});

module.exports = router;