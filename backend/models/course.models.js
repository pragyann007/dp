import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  thumbnail_id: { type: String },

  price: { type: Number, required: true },

  tags: [{ type: String }], // e.g. ["class10", "SEE"]

  materials: [
    {
      title: { type: String, required: true },
      fileUrl: { type: String, required: true },
    }
  ],

  videos: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
    }
  ],

  meetLinks: [
    {
      title: { type: String, required: true },
      link: { type: String, required: true },
      day: { type: String, required: true },
    }
  ],

  // students enrolled
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  // optional: to track course duration
  startDate: { type: Date },
  endDate: { type: Date }

}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
