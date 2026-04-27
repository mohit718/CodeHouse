import mongoose from "mongoose";
import { connectDB } from "./libs/db.js";
import Problem from "./models/Problem.js";
import PROBLEMS from "./data/problems.json" with { type: "json" };

connectDB().then(() => {
  console.log("Connected to DB, Seeding Data...");
  seedDB();
});

const seedDB = async () => {
  try {
    await Problem.deleteMany(); // clear old data
    await Problem.insertMany(PROBLEMS);

    console.log("Database Seeded Successfully");
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};