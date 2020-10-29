import {Schema,model} from "mongoose"

const BoardSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      lists: [
        {
          type: Schema.Types.ObjectId,
          ref: 'lists',
        },
      ],
      
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
          role: {
            type: String,
            default: 'admin',
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

const Board = model('board', BoardSchema);

module.exports = Board