import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      text: {
        type: String,
        required: true,
      },

      notes: {
        type: [String],
        default: [],
      },
    },

    examples: {
      type: [exampleSchema],
      default: [],
    },

    constraints: {
      type: [String],
      default: [],
    },

    starterCode: {
      javascript: {
        type: String,
        default: "",
      },
      python: {
        type: String,
        default: "",
      },
      java: {
        type: String,
        default: "",
      },
    },

    expectedOutput: {
      javascript: {
        type: String,
        default: "",
      },
      python: {
        type: String,
        default: "",
      },
      java: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true },
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
