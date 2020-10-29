import {Schema,model} from "mongoose"

const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'boards',
      },
    ],
  });
  
  const User = model('user', UserSchema);

  module.exports = User
