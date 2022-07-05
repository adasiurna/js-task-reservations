const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ReservationModel = require("./Reservations");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://adasiurna:Metasite.9@cluster0.mpus1.mongodb.net/js-task-reservations?retryWrites=true&w=majority"
);

app.get("/getReservations", (req, res) => {
  ReservationModel.find({}, (err, result) => {
    if (err) {
      console.log("error: ", err);
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createReservation", async (req, res) => {
  const reservation = req.body;
  const newReservation = new ReservationModel(reservation);
  await newReservation.save();

  res.json(reservation);
});

app.listen(3001, () => {
  console.log("SERVER RUNS ON 3001");
});
