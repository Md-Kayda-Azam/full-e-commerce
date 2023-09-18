import mongoose from "mongoose";

const reviewSchama = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: String,
      required: true,
    },
    // customer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Customer",
    // },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export default
export default mongoose.model("Review", reviewSchama);
