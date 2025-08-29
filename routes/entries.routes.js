const express = require('express');

const entriesController = require('../controllers/entries.controller');
const router = express.Router();

// GET
router.get('/{:email}', entriesController.getEntries);

// CREATE
router.post('/', entriesController.createEntry);

// UPDATE
router.put('/', entriesController.updateEntry);

// DELETE
router.delete('/', entriesController.deleteEntry);


module.exports = router;