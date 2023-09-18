import mongoose from "mongoose";

const productSchama = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    productType: {
      type: String,
      enum: ["simple", "variable", "group", "external"],
      default: "simple",
    },
    productSimple: {
      regularPrice: {
        type: Number,
        // required: true,
      },
      salePrice: {
        type: Number,
        default: 0,
      },
      productPhotos: {
        type: [String],
        // required: true,
      },
      stock: {
        type: Number,
        // required: true,
      },
    },
    productVariable: [
      {
        size: {
          type: String,
          default: null,
        },
        colors: {
          type: String,
          default: null,
        },
        regularPrice: {
          type: Number,
          // required: true,
        },
        salePrice: {
          type: Number,
          default: 0,
        },
        productPhotos: {
          type: [String],
          // required: true,
        },
        stock: {
          type: Number,
          // required: true,
        },
      },
    ],
    productGroup: [
      {
        name: {
          type: String,
          // required: true,
        },
        regularPrice: {
          type: Number,
          // required: true,
        },
        salePrice: {
          type: Number,
          default: 0,
        },
        productPhotos: {
          type: [String],
          // required: true,
        },
        stock: {
          type: Number,
          // required: true,
        },
      },
    ],
    productExternal: {
      regularPrice: {
        type: Number,
        // required: true,
      },
      salePrice: {
        type: Number,
        default: 0,
      },
      productPhotos: {
        type: [String],
        // required: true,
      },
      stock: {
        type: Number,
        // required: true,
      },
      link: {
        type: String,
        // required: true,
      },
    },
    shotDesc: {
      type: String,
      required: true,
    },
    longDesc: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      default: null,
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
      // required: true,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      // required: true,
    },
    brands: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Brand",
      // required: true,
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
export default mongoose.model("Product", productSchama);
