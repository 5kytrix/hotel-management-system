const express = require('express');
const router = express.Router();
const FloorsModel = require('../models/floors');

router.get('/', async function(req, res, next) {
    const allFloors = await FloorsModel.find({});
    res.json(allFloors);
});

router.post('/', async function(req, res, next) {
    const floor = new FloorsModel(req.body);
    await floor.save();
    res.json(floor);
})

module.exports = router;