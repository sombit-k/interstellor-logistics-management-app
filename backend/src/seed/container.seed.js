import { config } from "dotenv";
import fs from "fs";
import csvParser from "csv-parser";
import Container from "../models/container.model.js";
import { connectDb } from "../lib/db.js";

config();

const seedContainersFromCSV = async (filePath) => {
  try {
    await connectDb();

    const containers = [];

    // Read and parse the CSV file
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        // Map the CSV row to the database schema
        const container = {
          zone: row.zone,
          containerId: row.container_id,
          width: parseFloat(row.width_cm),
          depth: parseFloat(row.depth_cm),
          height: parseFloat(row.height_cm),
        };
        containers.push(container); // Add the mapped container to the containers array
      })
      .on("end", async () => {
        // Insert parsed containers into the database
        try {
          await Container.insertMany(containers);
          console.log(`${containers.length} containers have been seeded successfully.`);
        } catch (dbError) {
          console.error("Error inserting containers into the database:", dbError);
        }
      });
  } catch (error) {
    console.error("Error seeding containers from CSV:", error);
  }
};

// Provide the path to your CSV file
const csvFilePath = "./src/seed/containers.csv"; // Update the path to match the location of containers.csv
seedContainersFromCSV(csvFilePath);
