const mongoose = require('mongoose');

// Capability Schema
const CapabilitySchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    partnumber: {
      type: String,
      required: true
    },
    model: String,
    description: {
      type: String,
      required: true
    },
    manufacturer: {
      type: String,
      required: true
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  {
    versionKey: false // esto es para evitar el campo __v q tanto problema dio en las busquedas
  }
);

/*The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database*/
const Capability = (module.exports = mongoose.model(
  'Capability',
  CapabilitySchema
));
