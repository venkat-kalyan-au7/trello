import mongoose from "mongoose"

const linkValidation = (val) => (val ? true : false);

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
  },
  imgURL: {
    type: String,
  }
  
});

module.exports = mongoose.model("Profile", ProfileSchema);