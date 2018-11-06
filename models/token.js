const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token: { type: String, required: true }, // 43200 = 12hrs
    createdAt: { type: Date, required: true, default: Date.now }
  },
  {
    versionKey: false // esto es para evitar el campo __v q tanto problema dio en las busquedas
  }
);

tokenSchema.index({ createAt: 1 }, { expireAfterSeconds: 60 });

const Token = (module.exports = mongoose.model('Token', tokenSchema));
