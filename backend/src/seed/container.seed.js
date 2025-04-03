import { config } from "dotenv";
import Container from "../models/container.model.js";
import { connectDb } from "../lib/db.js";

config();

const generateRandomContainer = () => {
  const randomId = ["contA","contB","contC","ContD"][Math.floor(Math.random() * 4)];
  const randomZone = `Zone-${Math.floor(Math.random() * 10) + 1}`;
  const randomDimensions = {
    width: Math.floor(Math.random() * 100) + 1,
    depth: Math.floor(Math.random() * 100) + 1,
    height: Math.floor(Math.random() * 100) + 1,
  };

  return {
    containerId: randomId,
    zone: randomZone,
    ...randomDimensions,
  };
};

const seedContainers = async (count) => {
  try {
    console.log("Seeding containers...");
    await connectDb();

    const containers = Array.from({ length: count }, generateRandomContainer);
    await Container.insertMany(containers);

    console.log(`${count} containers have been seeded successfully.`);
  } catch (error) {
    console.error("Error seeding containers:", error);
  }
};

seedContainers(10);

// To seed more containers, change the number in the function call above
// To run this file, use the command:
// node src/seed/container.seed.js
