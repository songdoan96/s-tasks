const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    flag: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { versionKey: false, timestamps: true }
);
module.exports = mongoose.model("List", listSchema);
