import mongoose from "mongoose";

const testSchama = mongoose.Schema(
  {
    test: {
      type: Array,
    },
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
export default mongoose.model("Test", testSchama);
