const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    list_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
