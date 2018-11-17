const express = require('express');
const router = express.Router();
const Capability = require('../models/capability');
const { authenticate } = require('../middleware/authenticate');

router.get('/:type', async (req, res, next) => {
  try {
    let capabilities = await Capability.find({ type: req.params.type }).sort({
      partnumber: 1
    });

    if (!capabilities) {
      return res.json({
        isEmpty: true,
        msg: 'There are no capabilities to display.'
      });
    }
    return res.json({ isEmpty: false, capabilities });
  } catch (err) {
    console.log(err);
    next();
  }
});

router.post('/add', authenticate, async (req, res, next) => {
  try {
    let part = await Capability.findOne({ partnumber: req.body.partnumber });

    if (part) {
      return res.json({
        success: false,
        msg: 'This partnumber is already added'
      });
    }

    let newCapability = new Capability({
      type: req.body.type,
      partnumber: req.body.partnumber,
      model: req.body.model,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      _creator: req.user._id
    });

    newCapability.save().then(() => {
      return res.json({
        success: true,
        msg: 'The capability was created successfuly'
      });
    });
  } catch (err) {
    console.log(err);
    next();
  }
});

router.put('/:id', authenticate, async (req, res, next) => {
  try {
    Capability.update({ _id: req.params.id }, req.body).then(() => {
      return res.json({
        success: true,
        msg: 'The capability was updated successfuly'
      });
    });
  } catch (err) {
    console.log(err);
    next();
  }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    let removed = await Capability.remove({ _id: req.params.id });

    if (!removed) {
      return res.json({
        success: false,
        msg: 'The capability could not be eliminated'
      });
    } else {
      return res.json({
        success: true,
        msg: 'The capability was eliminated successfuly'
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
});

module.exports = router;
