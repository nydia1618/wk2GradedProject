import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  // TODO: Define schema fields
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  tags:{
    type: [String],
    default: [],
    required: false
  },
  upvotes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
    required: false
  },
  downvotes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
    required: false
  },
  voteCount:{
    type: Number,
    required: false,
    default: 0
  },
  views:{
    type: Number,
    required: false,
    default: 0
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
createdAt:{
  type: Date,
  required: false,
  default: Date.now

}

});

const Question = mongoose.model("Question", questionSchema);
export default Question;