import { config } from "dotenv";
import fs from "fs";
import csvParser from "csv-parser";
import Item from "../models/item.model.js";
import { connectDb } from "../lib/db.js";

config();

const seedItemsFromCSV = async (filePath) => {
  try {
    await connectDb();

    const items = [];

    // Read and parse the CSV file
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        // Map the CSV row to the database schema
        const item = {
          itemId: row.item_id,
          name: row.name,
          dimensions: {
            width: parseFloat(row.width_cm),
            depth: parseFloat(row.depth_cm),
            height: parseFloat(row.height_cm),
          },
          mass: parseFloat(row.mass_kg),
          priority: parseInt(row.priority, 10),
          expiryDate: row.expiry_date === "N/A" ? "N/A" : row.expiry_date,
          usageLimit: row.usage_limit,
          preferredZone: row.preferred_zone,
          containerId:"null",
          position: {
            startCoordinates: {
              width: null,
              depth: null,
              height: null,
            },
            endCoordinates: {
              width: null,
              depth: null,
              height: null,
            },
          },
        };
        items.push(item); // Add the mapped item to the items array
      })
      .on("end", async () => {
        // Insert parsed items into the database
        try {
          await Item.insertMany(items);
          console.log(`${items.length} items have been seeded successfully.`);
        } catch (dbError) {
          console.error("Error inserting items into the database:", dbError);
        }
      });
  } catch (error) {
    console.error("Error seeding items from CSV:", error);
  }
};

// Provide the path to your CSV file
const csvFilePath = "./src/seed/input_items.csv"; // Update the path to match the location of input_items.csv
seedItemsFromCSV(csvFilePath);

