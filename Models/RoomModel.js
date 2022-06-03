const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomNumbers: {
      type: [
        {
          number: { type: Number },
          unavailableDates: { type: [Date] },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema);
