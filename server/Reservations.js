const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const ReservationModel = mongoose.model("reservations", ReservationSchema);
module.exports = ReservationModel;
