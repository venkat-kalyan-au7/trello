import {Schema,model} from "mongoose"

const StatusSchema = new Schema({
    title: {
      type: String,
      required: true,
      enum:['TODO','PROGRESS','COMPLETED']
    

    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'cards',
      },
    ]
  });

const Status = model('list', StatusSchema);

module.exports= Status

