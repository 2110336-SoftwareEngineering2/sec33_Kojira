'use strict';

const express = require('express');
const router = express.Router();

const nontOwners = require('./nontOwners');
const nontSitters = require('./nontSitters');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/nontOwners', nontOwners);
router.use('/nontSitters', nontSitters);

module.exports = router;
