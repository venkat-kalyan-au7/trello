import {Schema,model} from "mongoose"



const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  members: [
    {
      _id: false,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
        required: true,
      },
    },
  ]
 
  
});

const Card = model('card', CardSchema);

module.exports = Card