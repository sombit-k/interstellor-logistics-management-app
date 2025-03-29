import { config } from "dotenv";
import Item from "../models/item.model.js";
import {connectDb} from "../lib/db.js"; 

config();

const generateRandomItem = () => {
  const randomId = Math.random().toString(36).substring(2, 10);
  const randomName = `Item-${randomId}`;
  const randomDimensions = {
    width: Math.floor(Math.random() * 100) + 1,
    depth: Math.floor(Math.random() * 100) + 1,
    height: Math.floor(Math.random() * 100) + 1,
  };
  const randomMass = Math.floor(Math.random() * 1000) + 1;
  const randomPriority = Math.floor(Math.random() * 100) + 1;
  const randomExpiryDate = new Date(
    Date.now() + Math.floor(Math.random() * 10000000000)
  ).toISOString();
  const randomUsageLimit = `${Math.floor(Math.random() * 100) + 1} uses`;
  const randomPreferredZone = `Zone-${Math.floor(Math.random() * 10) + 1}`;

  return {
    itemId: randomId,
    name: randomName,
    dimensions: randomDimensions,
    mass: randomMass,
    priority: randomPriority,
    expiryDate: randomExpiryDate,
    usageLimit: randomUsageLimit,
    preferredZone: randomPreferredZone,
    position: {
      startCoordinates: {
        width: 0,
        depth: 0,
        height: 0,
      },
      endCoordinates: {
        width: 0,
        depth: 0,
        height: 0,
      },
    },
  };
};

const seedItems = async (count) => {
  try {
    await connectDb(); 

    const items = Array.from({ length: count }, generateRandomItem);
    await Item.insertMany(items);

    console.log(`${count} items have been seeded successfully.`);
  } catch (error) {
    console.error("Error seeding items:", error);
  }
};

seedItems(20);


//to seed more items, change the number in the function call above
// To run this file, use the command:
//node src/seed/item.seed.js 
