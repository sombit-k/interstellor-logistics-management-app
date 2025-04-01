import Container from "../models/container.model.js"
import Item from "../models/item.model.js"
import Log from "../models/log.model.js"

export const logUsage = async (req, res) => {
    const { timeStamp, userId, actionType, itemId, details } = req.body;
    try {
        const newLog = new Log({
            timeStamp,
            userId,
            actionType,
            itemId,
            details
        });

        await newLog.save();
        res.status(200).json({ message: "Log entry created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error while logging the usage" });
    }
}

export const showLogs = async (req, res) => {
    const { startDate, endDate, itemId, userId, actionType } = req.query;

    try {
        const query = {
            timestamp: { $gte: startDate, $lte: endDate },
            ...(itemId && { itemId }),
            ...(userId && { userId }),
            ...(actionType && { actionType }),
        };

        const logEntries = await Log.find(query);

        const formattedLogs = logEntries.map(log => ({
            timestamp: log.timestamp,
            userId: log.userId,
            actionType: log.actionType,
            itemId: log.itemId,
            details: log.details,
        }));


        return res.status(200).json({ logs: formattedLogs });
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching logs", error });
    }
};
