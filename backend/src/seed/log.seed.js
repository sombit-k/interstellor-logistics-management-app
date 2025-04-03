import { config } from "dotenv";
import Log from "../models/log.model.js";
import { connectDb } from "../lib/db.js";

config();

const generateRandomLog = () => {
  const randomTimestamp = new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  ).toISOString();

  const randomUserId = Math.random().toString(36).substring(2, 10);

  const randomActionType = ["placement", "retrieval", "rearrangement", "disposal"][
    Math.floor(Math.random() * 4)
  ];

  const randomItemId = Math.random().toString(36).substring(2, 10);

  const randomDetails = {
    fromContainer: `Container-${Math.floor(Math.random() * 10) + 1}`,
    toContainer: `Container-${Math.floor(Math.random() * 10) + 1}`,
    reason: ["Expired", "Out of Uses", "Reorganization","Used","Retrieval","Disposal"][
      Math.floor(Math.random() * 6)
    ],
  };

  return {
    timestamp: randomTimestamp,
    userId: randomUserId,
    actionType: randomActionType,
    itemId: randomItemId,
    details: randomDetails,
  };
};

const seedLogs = async (count) => {
  try {
    console.log("Seeding logs...");
    await connectDb();

    const logs = Array.from({ length: count }, generateRandomLog);
    await Log.insertMany(logs);

    console.log(`${count} logs have been seeded successfully.`);
  } catch (error) {
    console.error("Error seeding logs:", error);
  }
};

seedLogs(50);

// To seed more logs, change the number in the function call above
// To run this file, use the command:
// node src/seed/log.seed.js
